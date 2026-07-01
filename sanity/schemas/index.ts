// Schema registry — everything Sanity Studio knows about.
import county from './county';
import town from './town';
import partner from './partner';
import article from './article';
import genericTerm from './genericTerm';
import siteSettings from './siteSettings';
import author from './author';

import faqItem from './objects/faqItem';
import crematoriumRef from './objects/crematoriumRef';
import seoBlock from './objects/seoBlock';
import openingHoursDay from './objects/openingHoursDay';
import longFormSection from './objects/longFormSection';

export const schemaTypes = [
  // Documents
  county, town, partner, article, genericTerm, siteSettings, author,
  // Reusable objects
  faqItem, crematoriumRef, seoBlock, openingHoursDay, longFormSection,
];
