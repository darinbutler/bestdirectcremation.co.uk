import { defineType } from 'sanity';

/**
 * Long-form section — the 11-block pattern used on county + town pages.
 * Editors pick the section role (1-11) and write the body in Portable Text.
 * The React template renders sections in order based on `order` field.
 */
export default defineType({
  name: 'longFormSection',
  title: 'Long-form section',
  type: 'object',
  fields: [
    {
      name: 'sectionRole', title: 'Section role', type: 'string',
      options: { list: [
        { title: '1. Opening promise (~80w)', value: '01-opening' },
        { title: '2. What is direct cremation in [Area] (~250w)', value: '02-what-is' },
        { title: '3. Why families choose us over national providers (~350w)', value: '03-why-us' },
        { title: '4. The 5-step Best Direct process (~200w)', value: '04-process' },
        { title: '5. Local crematoria serving [Area] (~250w)', value: '05-crematoria' },
        { title: '6. Registering a death in [Area] (~250w)', value: '06-register' },
        { title: '7. Local funeral director — [Partner FD] (~250w)', value: '07-partner' },
        { title: '8. Pricing & what is included (~250w)', value: '08-pricing' },
        { title: '9. Memorials, ashes and what families do next (~250w)', value: '09-after' },
        { title: '11. Related links + final CTA (~150w)', value: '11-related' },
      ]},
      validation: (R) => R.required(),
    },
    { name: 'heading', type: 'string', title: 'Heading shown on page (with the locality substituted)' },
    { name: 'body', type: 'array', title: 'Body', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] },
  ],
  preview: {
    select: { title: 'sectionRole', subtitle: 'heading' },
  },
});
