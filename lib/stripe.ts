/**
 * Stripe Payment Integration Configuration
 * Initializes and exports configured Stripe client instance
 * 
 * Features:
 * - Environment validation for secret key
 * - Type-safe Stripe instance
 * - Fixed API version for stability
 * 
 * Required ENV:
 * STRIPE_SECRET_KEY=sk_test_...
 */

import Stripe from 'stripe';

// Validate required environment variable
if(!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is not set");

// Initialize Stripe client with typing
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia', // Fixed API version for stability
});

export default stripe;