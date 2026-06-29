/**
 * Sanity Studio embedded at /studio — editors log in here.
 * No additional hosting needed; runs as part of the Next.js app.
 */
'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export const dynamic = 'force-static';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
