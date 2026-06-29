import { defineType, defineField } from 'sanity';

/**
 * County document — one record per UK county (~95 records).
 * Editors fill the 11 long-form sections via the longFormSection objects.
 */
export default defineType({
  name: 'county',
  title: 'County',
  type: 'document',
  fields: [
    defineField({
      name: 'name', title: 'County name', type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug', title: 'Slug (URL path /[slug]/)', type: 'slug',
      options: { source: 'name', maxLength: 60 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'country', title: 'Country', type: 'string',
      options: { list: ['England', 'Wales', 'Scotland', 'Northern Ireland'] },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'region', title: 'Region', type: 'string',
      options: { list: [
        'London', 'South East', 'South West', 'East', 'East Midlands', 'West Midlands',
        'North West', 'North East', 'Yorkshire and Humber',
        'Wales', 'Scotland', 'Northern Ireland',
      ]},
    }),
    defineField({ name: 'population', title: 'Approx population', type: 'number' }),
    defineField({
      name: 'postcodePrefixes', title: 'Postcode prefixes (comma-separated)', type: 'string',
      description: 'e.g. "BS" for Bristol, "M, OL" for Greater Manchester',
    }),

    // Coverage status — drives whether the page shows "live" or "coming-soon" treatment
    defineField({
      name: 'coverageStatus', title: 'Coverage status', type: 'string',
      options: { list: [
        { title: '✅ Live — FD partner ready', value: 'live' },
        { title: '⏳ Coming soon — capture call, offer alternative', value: 'coming-soon' },
      ]},
      initialValue: 'coming-soon',
      validation: (R) => R.required(),
    }),

    // Crematoria + register offices — locality fact-pack
    defineField({
      name: 'crematoria', title: 'Local crematoria', type: 'array',
      of: [{ type: 'crematoriumRef' }],
    }),
    defineField({
      name: 'registerOffices', title: 'Register offices in this county', type: 'array',
      of: [{ type: 'string' }],
    }),

    // Partner FD(s) covering this county
    defineField({
      name: 'partnerFds', title: 'Partner funeral directors covering this county', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'partner' }] }],
    }),

    // Linked towns
    defineField({
      name: 'cities', title: 'Towns & cities in this county', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'town' }] }],
    }),

    // The 11 long-form sections — see longFormSection schema
    defineField({
      name: 'longFormSections', title: 'Long-form sections', type: 'array',
      of: [{ type: 'longFormSection' }],
      description: 'Writers fill these in order — the section heading is the template slot, the body is locality-specific. Target ~2,500-3,000 words total.',
    }),

    // FAQ (Section 10 of the long-form pattern)
    defineField({
      name: 'faqs', title: 'FAQ — county-specific Q&A (target 8)', type: 'array',
      of: [{ type: 'faqItem' }],
    }),

    // SEO + housekeeping
    defineField({ name: 'seo', title: 'SEO', type: 'seoBlock' }),
    defineField({ name: 'lastReviewed', title: 'Last reviewed', type: 'date' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'country', coverage: 'coverageStatus' },
    prepare: ({ title, subtitle, coverage }) => ({
      title,
      subtitle: `${subtitle} · ${coverage === 'live' ? '✅ live' : '⏳ coming soon'}`,
    }),
  },
});
