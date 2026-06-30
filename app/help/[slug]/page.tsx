import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanity } from '@/lib/sanity';
import { allArticleSlugsQuery, articleBySlugQuery, relatedArticlesQuery } from '@/lib/queries';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import FAQ from '@/components/FAQ';
import RelatedArticles from '@/components/RelatedArticles';
import GlossaryReferences from '@/components/GlossaryReferences';
import PhoneCTA from '@/components/PhoneCTA';
import CostCalculatorCTA from '@/components/CostCalculatorCTA';
import JsonLd from '@/components/JsonLd';
import { PortableText } from '@portabletext/react';
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 60;

// Help articles that should surface the cost calculator prominently
const COST_INTENT_SLUGS = new Set([
  'cost-of-a-funeral',
  'cost-of-direct-cremation',
]);

// Help articles that warrant HowTo schema (process / step-by-step guides)
// Curated step lists for the most-searched process pillars.
const HOWTO_STEPS: Record<string, { name: string; description: string; totalTime?: string; steps: Array<{ name: string; text: string }> }> = {
  'what-to-do-when-someone-dies': {
    name: 'What to do when someone dies in the UK',
    description: 'Step-by-step guide to the practical things you need to do after a death in the UK.',
    totalTime: 'P14D',
    steps: [
      { name: 'Contact a doctor', text: 'If the death was expected at home, call the GP. If unexpected, call 999. The doctor verifies the death and issues the Medical Certificate of Cause of Death.' },
      { name: 'Register the death', text: 'Register at the local register office within 5 days (8 in Scotland). You receive the Death Certificate and the Green Form.' },
      { name: 'Use Tell Us Once', text: 'Free government service notifying most public bodies (HMRC, DWP, DVLA, Passport Office, local council) in one go. Reference number from the registrar.' },
      { name: 'Choose a funeral director', text: 'You have free choice. Look for NAFD or SAIF accreditation and transparent pricing on a Standardised Price List.' },
      { name: 'Arrange the funeral', text: 'Direct cremation, attended cremation, traditional funeral or burial. The funeral director handles paperwork, vehicles, and the cremation/burial itself.' },
      { name: 'After the funeral', text: 'Start the longer admin: probate (if needed), notify accounts, claim any state benefits or bereavement payments.' },
    ],
  },
  'how-direct-cremation-works': {
    name: 'How direct cremation works in the UK',
    description: 'Step-by-step UK direct cremation process from first call to ashes returned.',
    totalTime: 'P21D',
    steps: [
      { name: 'Call us', text: 'Call 0333 242 1405. A real person answers, 24 hours a day. We take essential details and dispatch a local funeral director.' },
      { name: 'Collection of the deceased', text: 'A local funeral director collects your loved one. Hospital collection during working hours (no fee); Priority Care from home/care home/hospice (£250 add-on).' },
      { name: 'Care in the mortuary', text: 'Your loved one is cared for in the local funeral director\'s mortuary while paperwork is completed.' },
      { name: 'Register the death', text: 'You register at the local register office within 5 days and receive the Death Certificate and Green Form.' },
      { name: 'Cremation paperwork', text: 'The funeral director obtains the Cremation Forms (4 and 5 from doctors, or 6 from the coroner) and the Medical Referee authorises.' },
      { name: 'The cremation', text: 'On the appointed day, the cremation takes place at a local crematorium. Dignified, private, no service.' },
      { name: 'Ashes returned', text: 'Within 5-14 days the ashes are returned to you in a simple urn or scatter tube.' },
    ],
  },
  'arranging-a-cremation': {
    name: 'Arranging a UK cremation',
    description: 'Step-by-step guide to arranging a cremation in the UK.',
    totalTime: 'P14D',
    steps: [
      { name: 'Choose a funeral director', text: 'Look for NAFD or SAIF accreditation and a published Standardised Price List.' },
      { name: 'Choose the type of cremation', text: 'Direct cremation (no service) or attended cremation (brief service with family).' },
      { name: 'Register the death', text: 'Within 5 days (8 in Scotland). You receive the Green Form needed for the cremation.' },
      { name: 'Cremation paperwork', text: 'Two doctor certificates (Forms Cremation 4 and 5), or Form Cremation 6 from the coroner if applicable.' },
      { name: 'Medical Referee approval', text: 'The crematorium\'s Medical Referee reviews all paperwork before authorising.' },
      { name: 'The cremation', text: 'At a local crematorium. Takes around 90 minutes. Ashes returned to the family afterwards.' },
    ],
  },
  'cremation-paperwork': {
    name: 'UK cremation paperwork explained',
    description: 'Step-by-step list of the UK paperwork required for a cremation.',
    steps: [
      { name: 'Medical Certificate of Cause of Death', text: 'Issued by the attending doctor or hospital. Needed to register the death.' },
      { name: 'Register the death', text: 'At the local register office within 5 days (8 in Scotland). Receive the Death Certificate and Green Form.' },
      { name: 'Form Cremation 4 (Medical Certificate)', text: 'Completed by the doctor who attended the deceased during their last illness. Fee £82.' },
      { name: 'Form Cremation 5 (Confirmatory)', text: 'Completed by an independent second doctor. Fee £82. Or replaced by Form Cremation 6 if coroner is involved.' },
      { name: 'Form Cremation 10 (Authority to Cremate)', text: 'Signed by the next of kin. Legal authority for the cremation to proceed.' },
      { name: 'Medical Referee approval', text: 'The crematorium\'s Medical Referee reviews all paperwork before authorising the cremation.' },
    ],
  },
};

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const list: Array<{ slug: string; section: string }> = await sanity.fetch(allArticleSlugsQuery);
  return list.filter(a => a.section === 'help').map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await sanity.fetch(articleBySlugQuery, { slug: params.slug, section: 'help' });
  if (!a) return {};
  const title = a.seo?.metaTitle || a.title;
  const desc  = a.seo?.metaDescription || a.excerpt || a.title;
  return {
    title, description: desc,
    alternates: { canonical: `${SITE.url}/help/${a.slug}/` },
    openGraph: { title, description: desc, url: `${SITE.url}/help/${a.slug}/`, type: 'article' },
  };
}

export default async function HelpArticle({ params }: Props) {
  const a = await sanity.fetch(articleBySlugQuery, { slug: params.slug, section: 'help' });
  if (!a) notFound();
  const path = `/help/${a.slug}/`;

  // Prefer editor-curated related articles, fall back to auto-fetched siblings
  let related = (a.relatedArticles || []).map((r: any) => ({ title: r.title, slug: r.slug, excerpt: r.excerpt }));
  if (related.length === 0) {
    related = await sanity.fetch<Array<{ title: string; slug: string; excerpt?: string }>>(
      relatedArticlesQuery,
      { section: 'help', excludeSlug: a.slug },
    );
  }

  return (
    <>
      <Hero
        eyebrow="Help &amp; guidance"
        title={a.title}
        subtitle={a.excerpt}
        showCTA={false}
      />

      {/* Cost calculator card on cost-themed pillar articles */}
      {COST_INTENT_SLUGS.has(params.slug) && <CostCalculatorCTA variant="card" />}

      <section className="bg-white">
        <Container className="py-12 md:py-16 max-w-prose-wide">
          <article className="prose prose-lg max-w-none
                              prose-headings:font-serif prose-headings:text-green
                              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gold/30 prose-h2:relative prose-h2:pl-5
                              prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-1 prose-h2:before:bottom-3 prose-h2:before:w-1 prose-h2:before:bg-gold
                              prose-h3:text-xl prose-h3:text-green prose-h3:mt-8 prose-h3:mb-3
                              prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-5
                              prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                              prose-strong:text-ink prose-strong:font-bold
                              prose-ul:my-5 prose-li:my-1.5 prose-li:text-ink/85
                              prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-cream/40 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-ink/85">
            {a.body && <PortableText value={a.body} />}
          </article>
        </Container>
      </section>

      {a.faqs && a.faqs.length > 0 && (
        <FAQ items={a.faqs.map((f: any) => ({ question: f.question, answer: f.answer }))} />
      )}

      <GlossaryReferences articleSlug={params.slug} />

      <RelatedArticles title="More help & guidance" basePath="/help" articles={related} />

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">Talk to a real person, 24 hours a day</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">
            Need to arrange a direct cremation right now? Or just have a question? Call us.
          </p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        articleSchema({
          title: a.title,
          description: a.excerpt || a.title,
          path,
          datePublished: a.lastReviewed,
          dateModified: a.lastReviewed,
          section: 'help',
        }),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Help & guidance', path: '/help/' },
          { name: a.title, path },
        ]),
        faqPageSchema((a.faqs || []).map((f: any) => ({
          q: f.question,
          a: Array.isArray(f.answer)
            ? f.answer.map((b: any) => b.children?.map((s: any) => s.text).join(' ')).join(' ')
            : String(f.answer || ''),
        }))),
        // HowTo schema for process-pillar articles only
        ...(HOWTO_STEPS[params.slug] ? [howToSchema({ ...HOWTO_STEPS[params.slug], path })] : []),
      )} />
    </>
  );
}
