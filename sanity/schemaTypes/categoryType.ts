import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Category Schema Type Definition for Sanity CMS:
 * Defines the structure for product categories in the e-commerce platform
 */
export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "description",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
