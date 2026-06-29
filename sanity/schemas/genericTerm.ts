import { defineType, defineField } from 'sanity';

/**
 * Generic-term landing page — modifier × service-noun pages.
 * Examples: "cheap direct cremation", "unattended cremation UK",
 * "cremation provider UK", "funeral company UK", etc.
 * Lives at /services/[slug]/.
 */
export default defineType({
  name: 'genericTerm',
  title: 'Generic-term lander',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page title (H1)', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title', maxLength: 60 },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'modifier', title: 'Modifier (cheap, affordable, unattended, attended, …)', type: 'string' }),
    defineField({ name: 'serviceNoun', title: 'Service noun (direct cremation, cremation provider, funeral company, …)', type: 'string' }),

    defineField({
      name: 'intentMatch', title: 'Opening section — matches search intent in the first 150 words',
      type: 'array', of: [{ type: 'block' }],
    }),
    defineField({
      name: 'longForm', title: 'Long-form body (target 1,500-2,000 words)',
      type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'showPriceLadder', title: 'Show price ladder?', type: 'boolean', initialValue: false }),
    defineField({ name: 'showComparisonStrip', title: 'Show us-vs-national comparison?', type: 'boolean', initialValue: true }),
    defineField({
      name: 'faqs', title: 'FAQ (FAQPage schema)', type: 'array',
      of: [{ type: 'faqItem' }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoBlock' }),
  ],
  preview: { select: { title: 'title', subtitle: 'modifier' } },
});
