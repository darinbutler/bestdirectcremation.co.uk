import { defineType, defineField } from 'sanity';

/**
 * Partner Funeral Director document.
 * Each partner gets a profile page at /providers/[slug]/.
 * Towns reference partners via the `partnerFd` field.
 */
export default defineType({
  name: 'partner',
  title: 'Partner Funeral Director',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'FD name (e.g. "A. W. Lymn — The Family Funeral Service")', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'name', maxLength: 60 },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'established', title: 'Year established', type: 'number' }),

    defineField({
      name: 'hqAddress', title: 'HQ address', type: 'object', fields: [
        { name: 'street',   type: 'string', title: 'Street address' },
        { name: 'town',     type: 'reference', to: [{ type: 'town' }], title: 'Town (Sanity link)' },
        { name: 'postcode', type: 'string', title: 'Postcode' },
        { name: 'latitude', type: 'number', title: 'Latitude' },
        { name: 'longitude', type: 'number', title: 'Longitude' },
      ],
    }),

    defineField({
      name: 'townsServed', title: 'Towns this FD serves', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'town' }] }],
    }),

    defineField({
      name: 'accreditation', title: 'Accreditation', type: 'array',
      of: [{ type: 'string', options: { list: ['NAFD', 'SAIF'] } }],
    }),
    defineField({
      name: 'facilities', title: 'Facilities & services', type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. "Own mortuary", "Climate-controlled chapel of rest", "Out-of-hours collection".',
    }),

    defineField({ name: 'bio', title: 'Bio / about this FD (~250 words)', type: 'array', of: [{ type: 'block' }] }),

    defineField({ name: 'reviewCount', title: 'Review count (if shown)', type: 'number' }),
    defineField({ name: 'reviewRating', title: 'Review rating (e.g. 4.9)', type: 'number' }),

    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'photos', title: 'Funeral home photos', type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    defineField({
      name: 'openingHours', title: 'Opening hours', type: 'array',
      of: [{ type: 'openingHoursDay' }],
    }),

    defineField({ name: 'seo', title: 'SEO', type: 'seoBlock' }),
  ],
  preview: {
    select: { title: 'name', media: 'logo', subtitle: 'hqAddress.postcode' },
  },
});
