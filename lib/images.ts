/**
 * Image registry — references the live WordPress media URLs.
 * The bestdirectcremation.co.uk hostname is allowlisted in next.config.mjs
 * so next/image can serve these with the optimisation pipeline.
 *
 * Phase 2: migrate into Sanity Studio for editor control + the Sanity CDN.
 * Until then, this single file is the source of truth for all imagery.
 */
const WP = 'https://bestdirectcremation.co.uk/wp-content/uploads';

export const IMG = {
  // FD partner imagery
  fdShop:        `${WP}/2026/01/BEST-FD-SHop.png`,             // shop window photo
  fdCircle:      `${WP}/2026/01/BEST-FD-Circle-Small-292x300.png`, // FD collage circle

  // Cornerstone lifestyle photography
  flowersUrn:    `${WP}/2025/01/Group-1-7.png`,                // white roses + urn on console
  hands:         `${WP}/2025/01/a43429e2cf6700c2a50bbd66231d55e5-1024x681.jpeg`,
  faqHero:       `${WP}/2025/10/FAQs-About-Direct-Cremation-1024x683.jpg`,
  sparklers:     `${WP}/2025/01/Group-1-1.png`,                // people with sparklers
  coffin:        `${WP}/2025/01/Group-1-2-e1771009349955.png`,
  attendedHero:  `${WP}/2025/01/the-good-funeral-guide-AQN0rO3OpSc-unsplash.png`,

  // 5-step process imagery — paired with each step
  step1Call:     `${WP}/2026/01/ChatGPT-Image-Jan-27-2026-11_48_36-AM.jpg`,
  step2Care:     `${WP}/2026/01/ChatGPT-Image-Jan-27-2026-12_34_02-PM.jpg`,
  step3Arrange:  `${WP}/2026/01/Process-3.jpg`,
  step4Cremate:  `${WP}/2026/01/ChatGPT-Image-Jan-27-2026-01_59_38-PM.jpg`,
  step5Ashes:    `${WP}/2026/01/Process-5.jpg`,

  // UK coverage map graphic
  ukCoverageMap: `${WP}/2026/02/DC-Coverage-Map.jpg`,

  // Hero background — the big funeral directors at crematorium photo
  heroBackground: `${WP}/2026/01/Header-background.jpg`,

  // Brand
  logo:          `${WP}/2026/01/cropped-BEST_Direct_Cremation_RGB.png`,
  logoWhite:     `${WP}/2024/12/BEST_Direct_Cremation_WHITE.png`,
} as const;
