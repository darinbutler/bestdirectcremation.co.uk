/**
 * Sanity Studio config — embedded inside the Next.js app at /studio.
 *
 * Editors log in at https://bestdirectcremation.co.uk/studio and write
 * directly into the same dataset the live site reads from.
 *
 * Project ID 80kiihr6 — confirmed by user.
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '80kiihr6';
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   || 'production';

export default defineConfig({
  name: 'bestdirectcremation',
  title: 'Best Direct Cremation',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('🗺️  Counties').child(S.documentTypeList('county').title('Counties')),
            S.listItem().title('🏘️  Towns & Cities').child(S.documentTypeList('town').title('Towns & Cities')),
            S.listItem().title('🕊️  Partner Funeral Directors').child(S.documentTypeList('partner').title('Partner FDs')),
            S.listItem().title('📚  Help & Guidance articles').child(S.documentTypeList('article').title('Articles')),
            S.listItem().title('🎯  Generic-term landers').child(S.documentTypeList('genericTerm').title('Generic terms')),
            S.divider(),
            S.listItem().title('⚙️  Site settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
