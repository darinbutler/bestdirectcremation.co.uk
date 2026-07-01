import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import PriceBlock from '@/components/PriceBlock';
import TrustSignals from '@/components/TrustSignals';
import WhyBdc from '@/components/WhyBdc';
import FAQ from '@/components/FAQ';
import CostCalculatorCTA from '@/components/CostCalculatorCTA';
import JsonLd from '@/components/JsonLd';
import { sanity } from '@/lib/sanity';
import { allCountiesForHubQuery } from '@/lib/queries';
import { breadcrumbSchema, faqPageSchema, jsonLdString, serviceSchema } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Direct Cremation Near Me — UK-Wide Coverage from £1,499 | Best Direct Cremation',
  description: `Find direct cremation near you. Best Direct Cremation covers every UK county through a network of vetted local independent funeral directors. £1,499 all-inclusive. Call ${SITE.phone} 24 hours a day.`,
  alternates: { canonical: `${SITE.url}/near-me/` },
  openGraph: {
    title: 'Direct Cremation Near Me — Every UK County Covered',
    description: 'Best Direct Cremation covers every UK county through local independent funeral directors. £1,499 all-inclusive.',
    url: `${SITE.url}/near-me/`,
    type: 'article',
  },
};

// Curated set of highest-population, highest-search cities and counties.
// Slugs must match Sanity county slugs.
const MAJOR_LOCATIONS = [
  { name: 'London', slug: 'london', region: 'Greater London' },
  { name: 'Manchester', slug: 'greater-manchester', region: 'North West England' },
  { name: 'Birmingham', slug: 'west-midlands', region: 'West Midlands' },
  { name: 'Liverpool', slug: 'merseyside', region: 'North West England' },
  { name: 'Leeds', slug: 'west-yorkshire', region: 'Yorkshire' },
  { name: 'Sheffield', slug: 'south-yorkshire', region: 'Yorkshire' },
  { name: 'Bristol', slug: 'bristol', region: 'South West England' },
  { name: 'Nottingham', slug: 'nottinghamshire', region: 'East Midlands' },
  { name: 'Newcastle', slug: 'tyne-and-wear', region: 'North East England' },
  { name: 'Cardiff', slug: 'cardiff', region: 'Wales' },
  { name: 'Southampton', slug: 'hampshire', region: 'South East England' },
  { name: 'Brighton', slug: 'east-sussex', region: 'South East England' },
];

const FAQS = [
  {
    question: 'Do you actually have a direct cremation service near me?',
    answer: `Yes — Best Direct Cremation covers every UK county through a network of vetted local independent funeral directors. Wherever your loved one is in England, Wales, Scotland or Northern Ireland, we can appoint a local funeral director who lives and works in your area. Call ${SITE.phone} to confirm coverage for your specific postcode.`,
  },
  {
    question: 'Does the price change depending on where I live?',
    answer:
      'No. Our price is £1,499 all-inclusive across the whole UK — London to the Highlands, Cornwall to Belfast. The only variable is the £250 Priority Care add-on (£1,749 maximum), needed when collection is from home, a care home or a hospice rather than a hospital mortuary.',
  },
  {
    question: 'Which crematorium will my loved one be cremated at?',
    answer:
      'The closest available local crematorium to where your loved one lived. We do not centralise — your loved one stays close to home throughout. If you have a specific crematorium preference (for family reasons or convenience for a later visit), tell us on the call and we will accommodate where possible.',
  },
  {
    question: 'How quickly can you arrange collection if someone has just died?',
    answer:
      'Typically within 24 hours, often within a few hours. Call us the moment you feel ready — a real person answers 24 hours a day. We then brief the local independent funeral director closest to where your loved one lived, and they attend within their standard response time (usually 2–6 hours).',
  },
  {
    question: 'What if you do not have a partner in my specific town?',
    answer:
      'Even where we do not yet have a named local partner, we can almost always connect you with a vetted independent funeral director who meets our standards of care. Our national coverage is continuous, not a patchwork — we hold ourselves accountable for every case regardless of location. Call us and we will confirm coverage for your postcode.',
  },
  {
    question: 'Are Scottish and Northern Irish direct cremations at the same price?',
    answer:
      'Yes — £1,499 all-inclusive (max £1,749 with Priority Care) applies UK-wide. In Scotland, note that you have 8 days to register a death rather than 5 in England, Wales and Northern Ireland. This can slightly extend the overall timeline but does not change the price.',
  },
  {
    question: 'Do I need to travel to arrange this?',
    answer:
      'No. Everything is arranged over the phone. We appoint the local funeral director, they attend the collection at the place of death, and they return the ashes to a UK address you specify. The only trip you need to make is to the register office to register the death — which must be done in person, in the district where the death occurred, within 5 days (8 days in Scotland).',
  },
];

export default async function NearMePage() {
  const counties = await sanity.fetch<Array<{ name: string; slug: string; country: string; region?: string }>>(allCountiesForHubQuery);
  const byCountry: Record<string, typeof counties> = {};
  counties.forEach(c => { (byCountry[c.country] ||= []).push(c); });
  Object.values(byCountry).forEach(list => list!.sort((a, b) => a.name.localeCompare(b.name)));
  const countryOrder = ['England', 'Wales', 'Scotland', 'Northern Ireland'];

  return (
    <>
      <Hero
        eyebrow="UK-wide direct cremation"
        title={<>Direct cremation <span className="text-gold">near you</span>, wherever you are in the UK</>}
        subtitle={`£1,499 all-inclusive across every UK county — delivered locally by a vetted independent funeral director. Call ${SITE.phone}, 24 hours a day.`}
      />

      <TrustSignals />

      {/* Editorial */}
      <section className="bg-white">
        <Container className="py-12 md:py-16 max-w-prose-wide">
          <article
            className="prose prose-lg max-w-none
                       prose-headings:font-serif prose-headings:text-green
                       prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gold/30 prose-h2:relative prose-h2:pl-5
                       prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-1 prose-h2:before:bottom-3 prose-h2:before:w-1 prose-h2:before:bg-gold
                       prose-h3:text-xl prose-h3:text-green prose-h3:mt-8 prose-h3:mb-3
                       prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-5
                       prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-ink prose-strong:font-bold"
          >
            <p className="text-lg md:text-xl text-ink/85 leading-relaxed">
              Best Direct Cremation covers every UK county. Not through a network of national branches you
              never see, but through a network of <strong>vetted local independent funeral directors</strong>
              — professionals who live and work in the area your loved one lived in. Whether you are in
              central London, a Cornish village, the Scottish Highlands or Northern Ireland, we can arrange a
              direct cremation delivered locally, at £1,499 all-inclusive.
            </p>

            <h2>What &quot;direct cremation near me&quot; actually means</h2>
            <p>
              When people search for direct cremation near me, they are usually looking for two things: a
              price and a promise of local delivery. The price part is easy — ours is £1,499 all-inclusive
              across the entire UK, with a £250 Priority Care add-on if collection is from anywhere other than
              a hospital. Maximum total: £1,749.
            </p>
            <p>
              The local-delivery part is where providers differ. Some large operators (Pure Cremation being
              the largest) run centralised facilities — your loved one is collected locally, then transported
              to a single national mortuary and cremated at one of their own crematoria, often hundreds of
              miles from home. That works for some families. It is not what we do.
            </p>
            <p>
              Best Direct Cremation appoints a local independent funeral director based on where your loved
              one lived. That funeral director attends the collection, provides care in their own local
              mortuary, arranges the cremation at the closest local crematorium, and returns the ashes to you.
              Your loved one stays close to home throughout. The person handling the arrangements is a
              qualified funeral professional accountable to your local community — often someone the family
              could pop in and meet in person if they wanted to.
            </p>

            <h2>Every UK county — one price, one number</h2>
            <p>
              We do not have regional pricing. We do not have peak-times pricing. We do not have
              &quot;London supplements.&quot; £1,499 all-inclusive is the same price whether your loved one
              lived in Kensington, Kirkcaldy, Cardiff or Coleraine. The maximum, with Priority Care, is
              £1,749.
            </p>
            <p>
              The way we can hold to a single UK-wide price is by using local independent funeral directors
              rather than a nationally-operated branch network. Independent funeral directors are
              cost-efficient — they operate at community scale rather than national brand overhead — and we
              partner with them at scale to guarantee the same standard everywhere.
            </p>
            <p>
              Every partner funeral director in our network is <strong>NAFD or SAIF accredited</strong>
              (National Association of Funeral Directors and Society of Allied and Independent Funeral
              Directors — the two main UK professional bodies). We vet each one before they join the network
              and audit standards continuously.
            </p>

            <h2>What happens when you call from anywhere in the UK</h2>
            <p>
              The process is identical whether you call from central London or the Outer Hebrides.
            </p>
            <p>
              <strong>Within minutes of your call</strong>: we take the details (where your loved one is,
              the name of the next-of-kin, any specific requests). A real person, never a chatbot.
            </p>
            <p>
              <strong>Within an hour</strong>: we identify and brief the local independent funeral director
              closest to where your loved one lived. They contact you directly to confirm collection details.
            </p>
            <p>
              <strong>Within 24 hours (usually much sooner)</strong>: the local funeral director attends and
              takes your loved one into their professional care at their local mortuary. Not centralised. Not
              shipped. Local.
            </p>
            <p>
              <strong>From there</strong>: you register the death at the local register office (something only
              the next-of-kin can do in person), and the local funeral director handles the rest — paperwork
              with the crematorium, the cremation itself, and the return of the ashes to you. Our step-by-step{' '}
              <Link href="/help/how-direct-cremation-works/">how direct cremation works guide</Link> walks
              through each stage.
            </p>

            <h2>What if you cover my exact town?</h2>
            <p>
              We name-check every major UK city and county explicitly (see the browse-by-location grids
              below), and every UK county has a dedicated page on our site with local details — nearest
              crematorium, local register office and specific guidance. See our full{' '}
              <Link href="/coverage/">UK coverage page</Link> for the A–Z of every named area.
            </p>
            <p>
              But UK direct cremation coverage is not a patchwork of &quot;covered&quot; and
              &quot;uncovered&quot; areas — it is a continuous national network. Even where we do not yet
              have a named local partner, we can almost always source a vetted independent funeral director
              in your specific area. Our promise: <strong>if a UK family calls us, we will find them a local
              funeral director who meets our standards of care.</strong> If we cannot, we will tell you
              honestly and recommend where else to go — before charging you anything.
            </p>

            <h2>Scotland, Northern Ireland and remote areas</h2>
            <p>
              Coverage extends across all four nations. There are two things to know about arranging a direct
              cremation in Scotland and Northern Ireland:
            </p>
            <p>
              <strong>Scotland</strong> has 8 days (rather than 5) to register a death, which slightly relaxes
              the initial timeline. Scotland also has its own crematorium infrastructure — every mainland
              area has a functioning crematorium within reasonable distance. The Highlands and Islands can
              have longer travel times but our network handles this routinely.
            </p>
            <p>
              <strong>Northern Ireland</strong> uses the England &amp; Wales 5-day registration deadline.
              Crematorium provision is more limited (Roselawn in Belfast is the main crematorium; some
              families are cremated in NI, others in the Republic depending on location). Our local network
              handles all of this.
            </p>
            <p>
              Prices and standards are identical UK-wide. Call {SITE.phone} — a real person, 24 hours.
            </p>

            <h2>What about direct cremation abroad, or if a UK resident died overseas?</h2>
            <p>
              A significant number of UK families now face a death overseas — a parent who retired to Spain,
              a family member who died on holiday, or someone living abroad who wanted to be cremated back
              home. This is not a standard direct cremation service — it typically involves repatriation of
              the deceased, embassy paperwork, and often overseas cremation with the ashes returned to the
              UK. We do not currently handle overseas repatriation, but we can point you to the UK Government
              guidance and to reputable specialists. Call us and we will help you understand your options.
            </p>

          </article>
        </Container>
      </section>

      {/* Major cities grid */}
      <section className="bg-cream border-y border-stone">
        <Container className="py-14 md:py-20">
          <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Browse by major UK city</p>
          <h2 className="font-serif text-2xl md:text-3xl text-green mb-8">Direct cremation in your area</h2>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {MAJOR_LOCATIONS.map(loc => (
              <li key={loc.slug}>
                <Link
                  href={`/${loc.slug}/`}
                  className="block bg-white p-5 rounded-card shadow-card hover:shadow-lift hover:border-gold border border-transparent transition"
                >
                  <p className="font-serif text-green">Direct cremation {loc.name}</p>
                  <p className="text-xs text-ink/55 mt-1">{loc.region}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink/70 mt-8">
            Do not see your area? See the <Link href="/coverage/" className="text-gold hover:text-gold-dark">full UK coverage page</Link> for the A–Z of every named county and town.
          </p>
        </Container>
      </section>

      <CostCalculatorCTA variant="card" />

      <PriceBlock />

      {/* Full county browse */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">All UK coverage</p>
          <h2 className="font-serif text-2xl md:text-3xl text-green mb-8">Browse every UK county</h2>
          {countryOrder.filter(c => byCountry[c]).map(country => (
            <section key={country} className="mb-10 last:mb-0">
              <h3 className="font-serif text-xl text-green mb-3">{country} <span className="text-sm text-ink/50 font-sans font-normal">({byCountry[country]!.length} counties)</span></h3>
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {byCountry[country]!.map(c => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}/`} className="block text-sm text-ink/80 hover:text-gold hover:bg-cream px-2 py-1.5 rounded transition">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </Container>
      </section>

      <WhyBdc />

      <FAQ items={FAQS} title="Direct cremation near me — frequently asked questions" />

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">Wherever you are in the UK</p>
          <h2 className="font-serif text-section text-white mb-4">Speak to a real person, 24 hours a day.</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">
            £1,499 all-inclusive across every UK county — delivered locally by a vetted independent funeral
            director. Never a chatbot. Never a call centre overseas.
          </p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        serviceSchema({
          areaServed: 'United Kingdom',
          path: '/near-me/',
          description: 'Local direct cremation across every UK county — £1,499 all-inclusive, delivered by vetted independent funeral directors.',
        }),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Direct cremation near me', path: '/near-me/' },
        ]),
        faqPageSchema(FAQS.map(f => ({ q: f.question, a: f.answer }))),
      )} />
    </>
  );
}
