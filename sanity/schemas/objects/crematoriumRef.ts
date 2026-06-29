import { defineType } from 'sanity';

export default defineType({
  name: 'crematoriumRef',
  title: 'Crematorium',
  type: 'object',
  fields: [
    { name: 'name', type: 'string', title: 'Name (e.g. "Mortlake Crematorium")', validation: (R) => R.required() },
    { name: 'addressLine', type: 'string', title: 'Address line' },
    { name: 'postcode', type: 'string', title: 'Postcode' },
    { name: 'distanceFromTown', type: 'string', title: 'Distance / direction', description: 'e.g. "4 miles south of the town centre"' },
    { name: 'website', type: 'url', title: 'Website (optional)' },
  ],
  preview: { select: { title: 'name', subtitle: 'postcode' } },
});
