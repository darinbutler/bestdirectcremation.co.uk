import { defineType, defineField } from 'sanity';

/**
 * Author — Person schema.org.
 *
 * Displayed as a byline on Help & Guidance / Funeral Plans / Comparison articles.
 * Serialised as {@type: 'Person'} inside the Article JSON-LD for EEAT signals to
 * Google (name, jobTitle, worksFor, sameAs → LinkedIn/professional profile).
 *
 * Typical seed:
 *   • Editorial Team (org-level fallback for auto-generated content)
 *   • Your named subject-matter experts once you have them
 */
export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name', title: 'Full name', type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug', title: 'Slug (used in URL if we ever add author pages)', type: 'slug',
      options: { source: 'name', maxLength: 80 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'jobTitle', title: 'Job title / role',
      description: 'e.g. "Head of Editorial", "Funeral Director (NAFD)", "Content Editor". Used as the byline subtitle and in schema.org jobTitle.',
      type: 'string',
    }),
    defineField({
      name: 'credentials', title: 'Credentials / accreditation',
      description: 'e.g. "NAFD Diploma in Funeral Directing, 12 years experience". Optional but recommended for EEAT.',
      type: 'text', rows: 2,
    }),
    defineField({
      name: 'bio', title: 'Short bio (150-300 words)',
      description: 'Displayed on article pages. Also serialised into schema.org description.',
      type: 'text', rows: 5,
    }),
    defineField({
      name: 'photo', title: 'Headshot',
      description: 'Square photo, ~400×400px minimum. Displayed with byline.',
      type: 'image', options: { hotspot: true },
    }),
    defineField({
      name: 'linkedin', title: 'LinkedIn URL',
      description: 'Professional profile URL — surfaced in schema.org sameAs for EEAT.',
      type: 'url',
      validation: (R) => R.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'website', title: 'Personal / professional website (optional)',
      type: 'url',
      validation: (R) => R.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'isEditorial', title: 'Editorial-team fallback author?',
      description: 'Tick if this is the anonymous "Best Direct Cremation Editorial Team" author. Used as default when a real author has not been assigned.',
      type: 'boolean', initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'jobTitle', media: 'photo' },
  },
});
