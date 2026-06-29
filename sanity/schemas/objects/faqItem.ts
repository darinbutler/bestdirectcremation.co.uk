import { defineType } from 'sanity';

export default defineType({
  name: 'faqItem',
  title: 'FAQ item',
  type: 'object',
  fields: [
    { name: 'question', type: 'string', title: 'Question', validation: (R) => R.required() },
    { name: 'answer',   type: 'array', title: 'Answer', of: [{ type: 'block' }], validation: (R) => R.required() },
  ],
  preview: {
    select: { title: 'question' },
  },
});
