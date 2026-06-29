import { defineType, defineField } from 'sanity';

/**
 * Town / City document — one per UK town we publish a page for.
 * Lives at /[county-slug]/[town-slug]/.
 * Editors add new towns at any time; the page exists at next build.
 */
export default defineType({
  name: 'town',
  title: 'Town / City',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Town / city name', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'name', maxLength: 60 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'county', title: 'Parent county', type: 'reference', to: [{ type: 'county' }],
      validation: (R) => R.required(),
    }),
    defineField({ name: 'population', title: 'Approx population', type: 'number' }),
    defineField({ name: 'postcodePrefix', title: 'Local postcode prefix', type: 'string' }),
    defineField({
      name: 'coverageStatus', title: 'Coverage status', type: 'string',
      options: { list: [
        { title: '✅ Live — FD partner ready', value: 'live' },
        { title: '⏳ Coming soon — capture call, offer alternative', value: 'coming-soon' },
      ]},
      initialValue: 'coming-soon',
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'partnerFd', title: 'Primary partner FD serving this town', type: 'reference', to: [{ type: 'partner' }],
      description: 'Leave blank if status is "coming soon".',
    }),
    defineField({
      name: 'alternateFds', title: 'Backup / alternate partner FDs', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'partner' }] }],
    }),

    defineField({
      name: 'nearestCrematoria', title: 'Nearest crematoria (1–3)', type: 'array',
      of: [{ type: 'crematoriumRef' }],
    }),
    defineField({ name: 'registerOffice', title: 'Local register office', type: 'string' }),

    defineField({
      name: 'uniqueLocalAngle', title: 'Unique local angle',
      type: 'text', rows: 3,
      description: 'A short paragraph that exists ONLY on this town\'s page. Never reused. E.g. for Portsmouth: "HMNB Portsmouth and the Royal Navy community". Required for SEO uniqueness.',
      validation: (R) => R.min(100).warning('Aim for at least 100 characters — unique paragraphs help us outrank competitor template-clones.'),
    }),

    defineField({
      name: 'longFormSections', title: 'Long-form sections (target ~2,000-2,500 words)', type: 'array',
      of: [{ type: 'longFormSection' }],
    }),
    defineField({
      name: 'faqs', title: 'FAQ — town-specific (target 8)', type: 'array',
      of: [{ type: 'faqItem' }],
    }),

    defineField({ name: 'seo', title: 'SEO', type: 'seoBlock' }),
    defineField({ name: 'lastReviewed', title: 'Last reviewed', type: 'date' }),
  ],
  preview: {
    select: { title: 'name', county: 'county.name', coverage: 'coverageStatus' },
    prepare: ({ title, county, coverage }) => ({
      title,
      subtitle: `${county || 'no county'} · ${coverage === 'live' ? '✅ live' : '⏳ coming soon'}`,
    }),
  },
});
