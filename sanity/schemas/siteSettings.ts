import { defineType, defineField } from 'sanity';

/**
 * Singleton — one document for site-wide content the editorial team controls
 * (headline, hero subtitle, partner-network coverage stats, etc.).
 *
 * Phone, price, brand strings stay in lib/site.ts — too sensitive for editing.
 */
export default defineType({
  name: 'siteSettings',
  title: '⚙️ Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Homepage hero eyebrow', type: 'string', initialValue: 'Best Direct Cremation' }),
    defineField({ name: 'heroHeadline', title: 'Homepage hero headline', type: 'string', initialValue: 'Simple, dignified direct cremation — done properly' }),
    defineField({ name: 'heroSubtitle', title: 'Homepage hero subtitle', type: 'text', rows: 2, initialValue: 'Always delivered locally by our handpicked, independent BEST Funeral Directors.' }),
    defineField({ name: 'announcementBar', title: 'Announcement bar text (optional)', type: 'string' }),
    defineField({ name: 'announcementBarShow', title: 'Show announcement bar?', type: 'boolean', initialValue: false }),
  ],
});
