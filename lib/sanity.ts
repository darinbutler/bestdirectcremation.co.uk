import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '80kiihr6';
export const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   || 'production';
export const apiVersion = '2024-10-01';

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // ISR — pages refresh from Sanity every 60 seconds, no rebuild needed
  perspective: 'published',
});

const builder = imageUrlBuilder(sanity);
export const urlFor = (source: SanityImageSource) => builder.image(source);
