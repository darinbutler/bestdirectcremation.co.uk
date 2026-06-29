import { defineType } from 'sanity';

export default defineType({
  name: 'seoBlock',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle', type: 'string', title: 'Meta title (max 60 chars)',
      validation: (R) => R.max(60).warning('Over 60 chars — Google will truncate.'),
    },
    {
      name: 'metaDescription', type: 'text', rows: 3, title: 'Meta description (max 160 chars)',
      validation: (R) => R.max(160).warning('Over 160 chars — Google will truncate.'),
    },
    { name: 'ogImage', type: 'image', title: 'Open Graph image (1200×630 ideal)' },
    { name: 'noIndex', type: 'boolean', title: 'Hide from search engines (noindex)', initialValue: false },
  ],
});
