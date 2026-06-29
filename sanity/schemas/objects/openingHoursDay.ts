import { defineType } from 'sanity';

export default defineType({
  name: 'openingHoursDay',
  title: 'Opening hours (day)',
  type: 'object',
  fields: [
    { name: 'day', type: 'string', title: 'Day',
      options: { list: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] },
      validation: (R) => R.required(),
    },
    { name: 'opens',  type: 'string', title: 'Opens (HH:MM 24h)' },
    { name: 'closes', type: 'string', title: 'Closes (HH:MM 24h)' },
    { name: 'closed', type: 'boolean', title: 'Closed all day?', initialValue: false },
  ],
  preview: {
    select: { day: 'day', opens: 'opens', closes: 'closes', closed: 'closed' },
    prepare: ({ day, opens, closes, closed }) => ({
      title: day,
      subtitle: closed ? 'Closed' : `${opens || '?'} – ${closes || '?'}`,
    }),
  },
});
