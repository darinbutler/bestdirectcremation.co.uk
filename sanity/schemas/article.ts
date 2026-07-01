import { defineType, defineField } from 'sanity';

/**
 * Help & Guidance article.
 * Plus: funeral-plans cluster sub-pages are also `article` documents with
 * a section flag — keeps the editor experience consistent.
 */
export default defineType({
  name: 'article',
  title: 'Article (Help & Guidance / Funeral Plans cluster)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'section', title: 'Section (drives URL prefix)', type: 'string',
      options: { list: [
        { title: 'Help & Guidance — /help/[slug]/', value: 'help' },
        { title: 'Funeral Plans cluster — /funeral-plans/[slug]/', value: 'funeral-plans' },
        { title: 'Competitor comparison — /compare/[slug]/', value: 'compare' },
      ]},
      initialValue: 'help',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'intent', title: 'Search intent', type: 'string',
      options: { list: ['cost', 'process', 'legal', 'planning', 'trend', 'grief', 'review', 'comparison', 'plan-type'] },
    }),
    defineField({ name: 'excerpt', title: 'Excerpt (155 chars max — used as meta description fallback)', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', title: 'Hero image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({
      name: 'faqs', title: 'Inline FAQ (optional — adds FAQPage schema)', type: 'array',
      of: [{ type: 'faqItem' }],
    }),
    defineField({
      name: 'relatedArticles', title: 'Related articles', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
    }),
    defineField({
      name: 'author', title: 'Author / byline',
      description: 'Person credited on the page + serialised as schema.org Person for EEAT.',
      type: 'reference', to: [{ type: 'author' }],
    }),
    defineField({ name: 'lastReviewed', title: 'Last reviewed', type: 'date' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoBlock' }),
  ],
  preview: {
    select: { title: 'title', section: 'section', media: 'heroImage' },
    prepare: ({ title, section, media }) => ({
      title,
      subtitle: section === 'funeral-plans' ? '📋 Funeral Plans' : '📚 Help',
      media,
    }),
  },
});
