import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Stripe Webhook Handler
 * 
 * Processes Stripe checkout session completed events and creates orders in Sanity.
 * 
 * Flow:
 * 1. Receive webhook from Stripe
 * 2. Verify webhook signature
 * 3. Process checkout.session.completed event
 * 4. Create order in Sanity
 * 
 * Security:
 * - Validates Stripe signature
 * - Uses environment variables for secrets
 * - Handles only specific event types
 * 
 * Data Processing:
 * - Extracts session data from Stripe
 * - Formats product data for Sanity
 * - Converts currency amounts (cents to dollars)
 * - Generates unique order numbers
 * 
 * @param {Request} request - Incoming webhook request
 * @returns {Response} Success/Error response
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature)
    return NextResponse.json({ error: "No signature" }, { status: 400 });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.log("Stripe webhook secret is not set");
    return NextResponse.json(
      { error: "Stripe webhook secret is not set" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Error verifying webhook signature: ", error);
    return NextResponse.json(
      { error: `Error verifying webhook signature: ${error}` },
      { status: 400 }
    );
  }

  // Handle Stripe webhook event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const order = await createOrderInSanity(session);
      console.log("Order created in Sanity: ", order);
    } catch (error) {
      console.error("Error creating order in Sanity: ", error);
      return NextResponse.json(
        { error: `Error creating order: ${error}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

/**
 * Creates an order document in Sanity from Stripe checkout session data
 * 
 * @param session - Completed Stripe checkout session
 * @returns Created order document from Sanity
 */
async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  const { orderNumber, customerName, customerEmail, clerkUserId } =
    metadata as Metadata;

  // Fetch line items with expanded product data
  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    {
      expand: ["data.price.product"],
    }
  );

  // Transform line items into Sanity references
  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0,
  }));

   // Create order document in Sanity
  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customer,
    clerkUserId,
    customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100 // Convert cents to dollars
      : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0, // Convert cents to dollars
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
}
