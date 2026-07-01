import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import ProcessSteps from '@/components/ProcessSteps';
import ComparisonStrip from '@/components/ComparisonStrip';
import PriceBlock from '@/components/PriceBlock';
import PhoneCTA from '@/components/PhoneCTA';
import TrustSignals from '@/components/TrustSignals';
import WhyBdc from '@/components/WhyBdc';
import FAQ from '@/components/FAQ';
import CostCalculatorCTA from '@/components/CostCalculatorCTA';
import PillarArticleLayout from '@/components/PillarArticleLayout';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqPageSchema, jsonLdString, serviceSchema } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'What is a Direct Cremation? UK Guide 2026 — From £1,499 All-Inclusive',
  description: 'The complete UK guide to direct cremation in 2026. What is included, what is not, how the process works, cost breakdown vs traditional funerals, and how to choose a provider. From £1,499 with Best Direct Cremation.',
  alternates: { canonical: `${SITE.url}/direct-cremation/` },
  openGraph: {
    title: 'What is a Direct Cremation? — The Complete UK Guide',
    description: 'Everything you need to know about direct cremation in the UK. Cost, process, what is included, how it differs from a traditional funeral.',
    url: `${SITE.url}/direct-cremation/`,
    type: 'article',
  },
};

const FAQS = [
  {
    question: 'What exactly is a direct cremation?',
    answer:
      'A direct cremation is a cremation carried out without a service at the crematorium and without mourners present. Your loved one is collected from the place of death, cared for in a local funeral director\'s mortuary, cremated at a local crematorium, and the ashes are returned to you. Families choose to hold a personal memorial later — at a venue and time that means something to them, rather than in a 25-minute crematorium slot.',
  },
  {
    question: 'How much does a direct cremation cost in the UK?',
    answer:
      'UK direct cremation prices range from around £1,400 to £2,200 in 2026. Best Direct Cremation is £1,499 all-inclusive, with a £250 Priority Care add-on for non-hospital collections (maximum £1,749). The average UK traditional funeral costs £4,510 in 2026, so direct cremation saves roughly £3,000.',
  },
  {
    question: 'Is direct cremation the same as an unattended funeral?',
    answer:
      'Yes — the terms are used interchangeably in the UK. "Direct cremation," "unattended cremation," "unattended funeral," and "simple cremation" all describe the same thing: cremation without a service or mourners at the crematorium itself.',
  },
  {
    question: 'Can family attend a direct cremation?',
    answer:
      'A pure direct cremation has no attendance at the crematorium. However, many providers now offer "attended direct cremation" — a small unhurried gathering of up to 20 people, no minister or celebrant unless you bring one, no music beyond what you play from your phone. Best Direct Cremation can arrange this through the local funeral director if you ask when you call.',
  },
  {
    question: 'What is included in the £1,499?',
    answer:
      'Collection from a hospital or coroner\'s mortuary, professional care in a local funeral director\'s mortuary, a simple coffin suitable for cremation, all legal paperwork (doctor\'s certificates and the Green Form from the register office), the cremation at a local crematorium, and the return of ashes to you. No hidden fees added at the point of need.',
  },
  {
    question: 'What is Priority Care and when is it needed?',
    answer:
      'Priority Care is our £250 add-on for collection from home, a care home, or a hospice — anywhere that is not a hospital or coroner\'s mortuary. Most UK deaths happen outside hospital, so Priority Care is needed for most cases. We disclose the cost before you commit — no surprises at the point of need. Maximum total cost £1,749.',
  },
  {
    question: 'Who chooses direct cremation?',
    answer:
      'Increasingly, everyone. Direct cremation now accounts for around 20% of UK funerals — up from 3% in 2019. The people who choose it: those who want the ceremony separated from the cremation itself (so they can plan a proper memorial later), families spread across the country who can\'t all get to a crematorium, people who dislike the format of a traditional funeral, and families who simply cannot afford £4,510 for a traditional funeral.',
  },
  {
    question: 'How long does a direct cremation take from death to ashes?',
    answer:
      'Typically 10–21 days. The variable is the register office (you have 5 days from death to register in England and Wales, 8 in Scotland) and the crematorium\'s available slot. We\'ll give you a specific timeline when you call, based on your area\'s crematorium waiting times.',
  },
  {
    question: 'What happens to the ashes after a direct cremation?',
    answer:
      'The crematorium releases the ashes to your appointed funeral director, who returns them to you — usually in a simple sealed urn. You can then scatter them at a meaningful location, keep them, divide them among family, inter them in a garden of remembrance, or wait until you\'ve arranged a personal memorial and scatter them there.',
  },
  {
    question: 'Is the coffin returned or reused?',
    answer:
      'No — the coffin is cremated with the deceased, as UK law requires. All UK cremations use a fresh coffin. What varies between providers is the quality of the coffin: Best Direct Cremation uses a simple but dignified coffin suitable for cremation. Lower-cost providers sometimes use cardboard.',
  },
  {
    question: 'Do you handle everything, or do we still need a funeral director?',
    answer:
      'We handle everything. Best Direct Cremation works with a network of vetted independent funeral directors across the UK — when you call us, we appoint the local funeral director closest to where your loved one lived, and they carry out the collection, care, paperwork and cremation. You get a single 24-hour number to call — us — and one price.',
  },
  {
    question: 'Can I arrange direct cremation in advance for myself?',
    answer:
      'Yes — through a funeral plan. Best Direct Cremation cannot yet sell funeral plans directly (we plan to be FCA-authorised in early 2027). In the meantime, our funeral-plans guide explains how UK funeral plans work, how to choose an FCA-regulated provider, and what to look out for. All UK funeral plans must be FCA-regulated by law since July 2022 — check any provider on the FCA Register at fca.org.uk/register.',
  },
];

export default function DirectCremationPage() {
  const path = '/direct-cremation/';

  return (
    <>
      <Hero
        eyebrow="The complete UK guide"
        title={<>What is a <span className="text-gold">direct cremation</span>?</>}
        subtitle="The Best Direct Cremation guide to direct cremation in the UK — what it is, what is included, how it differs from a traditional funeral, and how to arrange one. From £1,499 all-inclusive."
      />

      <TrustSignals />

      {/* Primary editorial */}
      <PillarArticleLayout>
          <article
            className="prose prose-lg max-w-none
                       prose-headings:font-serif prose-headings:text-green
                       prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gold/30 prose-h2:relative prose-h2:pl-5
                       prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-1 prose-h2:before:bottom-3 prose-h2:before:w-1 prose-h2:before:bg-gold
                       prose-h3:text-xl prose-h3:text-green prose-h3:mt-8 prose-h3:mb-3
                       prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-5
                       prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-ink prose-strong:font-bold
                       prose-ul:my-5 prose-li:my-1.5 prose-li:text-ink/85"
          >
            <p className="text-lg md:text-xl text-ink/85 leading-relaxed">
              Direct cremation is the fastest-growing type of funeral in the UK. In 2019, direct cremation
              accounted for around 3% of UK funerals. By 2026, that figure is closer to <strong>20%</strong>
              — roughly one in five UK families now choose direct cremation over a traditional funeral. This
              guide explains what a direct cremation actually is, what is included, what is not, how the
              process works, what it costs, and how to choose a provider you can trust.
            </p>

            <h2>What is a direct cremation?</h2>
            <p>
              A direct cremation is a cremation carried out <strong>without a service at the crematorium and
              without mourners present</strong>. The cremation itself is stripped back to its dignified
              essentials: collection of the deceased, professional care in a local mortuary, a simple coffin,
              all the legal paperwork, the cremation at a local crematorium, and the return of the ashes to
              the family.
            </p>
            <p>
              What is <em>removed</em> from a traditional funeral is everything ceremonial that happens at the
              crematorium: the 25-minute service, the mourners in the chapel, the celebrant or minister, the
              music, the order of service, the hearse cortège, the limousines, the large floral tributes, the
              wake organised by the funeral director. Everything that made the UK funeral average creep past
              £4,510 in 2026.
            </p>
            <p>
              Families choose direct cremation because they want to <strong>separate the cremation from the
              ceremony</strong>. The cremation happens quickly and quietly at a local crematorium. The memorial
              — if the family wants one — happens later, at a venue that means something, on the family&apos;s
              own timeline, without the 25-minute crematorium clock ticking down.
            </p>

            <h2>What is included in a direct cremation with Best Direct Cremation</h2>
            <p>
              Every credible UK direct cremation should include the same set of things. Ours does, at £1,499
              all-inclusive (maximum £1,749 with Priority Care). Specifically:
            </p>
            <ul>
              <li><strong>Collection of the deceased</strong> from a hospital or coroner&apos;s mortuary. If the collection is from home, a care home or a hospice, that is Priority Care (£250) — disclosed before you commit.</li>
              <li><strong>Professional care in a local funeral director&apos;s mortuary</strong>. Not shipped to a central facility hundreds of miles away.</li>
              <li><strong>A simple coffin</strong> suitable for cremation — a proper wooden coffin, not cardboard.</li>
              <li><strong>All legal paperwork</strong>: doctor&apos;s certificates arranged, and the Green Form (Certificate for Burial or Cremation) collected from the register office and processed with the crematorium.</li>
              <li><strong>The cremation itself</strong> at a local crematorium. We use the closest crematorium to where your loved one lived — not a distant regional one.</li>
              <li><strong>The return of the ashes</strong> to you, in a simple sealed urn, delivered by the local funeral director.</li>
              <li><strong>A 24-hour phone line</strong> to a real person — never a chatbot. One number, one contact, one price.</li>
            </ul>

            <h2>What is not included in a direct cremation</h2>
            <p>
              Being clear about this upfront prevents disappointment later. A direct cremation does not
              include:
            </p>
            <ul>
              <li>A service or ceremony at the crematorium</li>
              <li>Mourners or attendees at the crematorium (unless you choose <em>attended</em> direct cremation — see below)</li>
              <li>A hearse cortège or limousines</li>
              <li>A celebrant, minister or officiant</li>
              <li>Music, an order of service, or floral tributes at the crematorium</li>
              <li>Embalming (unnecessary for cremation and adds no value)</li>
              <li>An upgraded or ornate coffin</li>
              <li>A wake or reception organised by the funeral director</li>
              <li>Death registration itself — you (the next of kin) must attend the register office in person, as UK law requires</li>
            </ul>
            <p>
              Many families arrange their <em>own</em> memorial after the cremation — at a venue of their
              choice, at their own pace. See the <Link href="/help/how-to-plan-a-memorial-service/">memorial
              planning guide</Link> for how to structure that.
            </p>

            <h2>How direct cremation differs from a traditional funeral</h2>
            <p>
              A traditional cremation funeral in the UK typically costs £4,510 (SunLife Cost of Dying Report
              2026). A direct cremation at £1,499 saves roughly £3,000. The difference in price reflects a
              difference in structure:
            </p>
            <p>
              <strong>Traditional cremation</strong>: everyone gathers at the crematorium at a set time.
              A hearse arrives with mourners in limousines. A 25-minute service takes place in the chapel with
              a celebrant or minister, music, readings, and eulogies. The coffin is committed. Mourners leave
              for a wake. Total cost including venue hire, catering, celebrant, hearse, cars, celebrant, flowers,
              order of service, and funeral director fees typically sits between £4,000 and £6,000.
            </p>
            <p>
              <strong>Direct cremation</strong>: the cremation happens quietly at a local crematorium at
              whatever time the crematorium can slot it in. There is no service, no attendance, no cortège.
              The ashes are returned to the family. If the family wants a memorial, they hold it separately —
              in a pub function room, a community hall, a family garden, at a favourite outdoor location. The
              memorial can include any element a traditional funeral would have had (celebrant, music, readings,
              food) without being confined to a crematorium slot.
            </p>
            <p>
              For a like-for-like breakdown against every major UK provider, see the <Link href="/cost/">cost
              guide</Link> or the <Link href="/cost-calculator/">interactive cost calculator</Link>. For a
              deeper comparison of cremation vs burial as a category, see <Link href="/help/cremation-vs-burial/">cremation
              vs burial</Link>.
            </p>

            <h2>Who chooses direct cremation, and why</h2>
            <p>
              The audience for direct cremation is broader than commonly assumed. It is not just people who
              cannot afford a traditional funeral. It is a growing choice across every income bracket, driven
              by four main motivations:
            </p>
            <p>
              <strong>1. Cost.</strong> £1,499 versus £4,510 is a difference of £3,000 per funeral. For many
              families, that £3,000 is the difference between a manageable expense and a debt they cannot pay
              down. The <Link href="/help/cost-of-a-funeral/">cost of a funeral guide</Link> covers all UK
              funding routes including the DWP Funeral Expenses Payment.
            </p>
            <p>
              <strong>2. Time and flexibility.</strong> A traditional funeral typically happens within 7–14
              days of death, forcing family and friends to travel at short notice. Direct cremation separates
              the cremation from the ceremony — so the ceremony can happen weeks or months later, at a time
              everyone can actually attend, at a venue that genuinely matters.
            </p>
            <p>
              <strong>3. Personal preference.</strong> Some people find the format of a traditional funeral —
              the 25-minute crematorium service, the black cars, the formal solemnity — actively unhelpful.
              They would rather remember a loved one at their favourite pub, on a family walk, or over a
              cooked meal together than in a chapel with a celebrant they never met.
            </p>
            <p>
              <strong>4. Distance and dispersion.</strong> UK families are increasingly geographically
              scattered. Getting siblings from Australia, cousins from Canada and grandchildren from Scotland
              together within seven days is unrealistic. Direct cremation gives the family time to arrange a
              proper reunion memorial when everyone can actually be there.
            </p>

            <h2>The direct cremation process — step by step</h2>
            <p>
              Here is what actually happens between the phone call and the ashes being returned. Best Direct
              Cremation manages every step; you have one point of contact throughout.
            </p>
            <ol className="my-6 space-y-2.5 text-ink/85">
              <li><strong>You call us on {SITE.phone}.</strong> A real person answers, 24 hours a day. We take the essential details (where your loved one is, name, next-of-kin, any specific requests) and confirm the price. Typical call: 10–15 minutes.</li>
              <li><strong>We appoint your local funeral director.</strong> Within an hour, we brief the vetted independent funeral director closest to where your loved one lived. They will contact you directly to confirm collection.</li>
              <li><strong>Collection.</strong> The local funeral director attends the place of death — hospital, coroner&apos;s mortuary, home, care home or hospice — and takes your loved one into their professional care at the local mortuary. Typically within 24 hours.</li>
              <li><strong>You register the death.</strong> This part only <em>you</em> can do. You attend the register office (in the district where the death occurred) within 5 days in England and Wales, or 8 days in Scotland. They issue the Green Form (Certificate for Burial or Cremation) and death certificate copies. See our <Link href="/help/what-to-do-when-someone-dies/">what to do when someone dies guide</Link> for what to bring.</li>
              <li><strong>You give the Green Form to us or the local funeral director.</strong> Post it, drop it in, or hand it to the local funeral director on collection day. We take it from there.</li>
              <li><strong>The cremation is scheduled.</strong> The local funeral director books the closest available slot at the closest local crematorium. Typical wait: 5–10 working days, depending on the crematorium&apos;s workload in your area.</li>
              <li><strong>The cremation takes place.</strong> No service, no attendance. Your loved one is treated with the same professional dignity as every other cremation. You do not need to be present, and are not expected to travel to the crematorium.</li>
              <li><strong>The ashes are returned to you.</strong> Typically within 7–10 days of the cremation. Delivered by the local funeral director in a simple sealed urn, at a time you arrange.</li>
            </ol>
            <p>
              End-to-end this typically takes 10–21 days from the death to the return of ashes. See our
              step-by-step <Link href="/help/how-direct-cremation-works/">how direct cremation works guide</Link>
              for more detail on each stage.
            </p>

            <h2>Attended direct cremation — the halfway option</h2>
            <p>
              An <strong>attended direct cremation</strong> keeps the strip-back philosophy — no celebrant, no
              music licensing, no order of service, no formal chapel service — but allows a small number of
              family to be present at the crematorium (typically up to 20 people). It is not a service; it is
              a private witness of the coffin being taken into the crematorium.
            </p>
            <p>
              Families who choose this often say it gives them a private moment of goodbye without the pressure
              or expense of arranging a full funeral service. There is usually a modest additional cost from
              the crematorium (typically £200–£400) which we pass through at cost, not marked up. Ask when you
              call and we will arrange it with the local funeral director.
            </p>

            <h2>Direct cremation, unattended cremation, simple cremation — what is the difference?</h2>
            <p>
              These terms are used interchangeably in the UK to mean the same thing: a cremation without a
              service or mourners at the crematorium. Best Direct Cremation calls it <em>direct cremation</em>
              because it is the most searched term and the term the CMA (Competition and Markets Authority)
              uses in its standardised price disclosure rules. But you may see:
            </p>
            <ul>
              <li><strong>Direct cremation</strong> — the most common UK industry term</li>
              <li><strong>Unattended cremation</strong> — literal description; most common in Scotland</li>
              <li><strong>Simple cremation</strong> — marketing term used by some larger providers</li>
              <li><strong>Direct funeral</strong> — the term some newspapers use, though technically a direct cremation is a type of direct funeral</li>
              <li><strong>Basic cremation</strong> — informal shorthand</li>
            </ul>
            <p>
              All describe the same service. What you should compare between providers is <em>what is
              included</em>, <em>where the cremation happens</em> (local vs centralised), and the <em>real
              total cost including any Priority Care or out-of-hours fees</em> — not just the headline
              price.
            </p>

            <h2>How to choose a direct cremation provider</h2>
            <p>
              The direct cremation market has grown fast, and the quality gap between providers is now wider
              than the price gap. Six things to check before you commit:
            </p>
            <p>
              <strong>1. Is the cremation local, or centralised?</strong> Some providers (notably Pure
              Cremation) transport bodies to a single central mortuary — often hundreds of miles from where the
              family lives. Best Direct Cremation uses a network of local independent funeral directors: your
              loved one is cared for in a local mortuary, cremated at a local crematorium, and treated by
              people who live in your area.
            </p>
            <p>
              <strong>2. What is the <em>total</em> cost, including Priority Care?</strong> Some £950 headline
              prices become £1,450 once Priority Care is added at the point of need. Our maximum is £1,749
              (£1,499 base + £250 Priority Care) — fully disclosed upfront.
            </p>
            <p>
              <strong>3. Is the coffin proper or cardboard?</strong> The cheapest providers sometimes use
              cardboard. Ours is a simple but proper wooden coffin.
            </p>
            <p>
              <strong>4. Are they NAFD or SAIF accredited?</strong> Every one of our partner independent
              funeral directors is a member of the National Association of Funeral Directors (NAFD) or the
              Society of Allied and Independent Funeral Directors (SAIF), or both. Independent oversight, real
              standards.
            </p>
            <p>
              <strong>5. Who answers the phone at 3am?</strong> A real person, or a chatbot / call centre in
              another country? We answer the phone ourselves, 24 hours a day. One number, one team.
            </p>
            <p>
              <strong>6. Is the price transparent, or hedged?</strong> Providers must publish a CMA
              Standardised Price List by law. Read ours <a href="https://bestdirectcremation.co.uk/wp-content/uploads/2026/05/Standardised-Price-List-2.pdf" target="_blank" rel="noopener noreferrer">here</a>, and compare against every other provider you are considering.
            </p>
            <p>
              For a like-for-like comparison of the six largest UK direct cremation providers, see the{' '}
              <Link href="/compare/">comparison hub</Link>.
            </p>

            <h2>What happens after the cremation — ashes, memorial, scattering</h2>
            <p>
              Once the ashes are returned to you, what happens next is entirely your family&apos;s decision.
              There is no legal deadline. Common paths:
            </p>
            <ul>
              <li><strong>Keep the ashes at home.</strong> Many families do this for months or years while they decide what feels right.</li>
              <li><strong>Scatter at a meaningful location.</strong> A favourite walk, a beach, a garden, a hilltop. Public land generally does not require permission for a small scattering; private land requires the landowner&apos;s consent. See our <Link href="/help/scattering-ashes-uk-rules/">scattering ashes guide</Link> for UK rules.</li>
              <li><strong>Inter the ashes.</strong> Most crematoriums have a garden of remembrance where ashes can be scattered or interred with a memorial plaque.</li>
              <li><strong>Divide the ashes.</strong> If family is dispersed, ashes can be divided into small keepsake urns for different family members. Ask us or the local funeral director to arrange multiple urns at the point of return.</li>
              <li><strong>Hold a memorial and scatter there.</strong> Many families arrange a memorial event weeks or months after the cremation and scatter the ashes there — turning the scattering into the centrepiece of the memorial.</li>
            </ul>

            <h2>Common concerns and misconceptions</h2>
            <p>
              A few things families worry about that we hear regularly:
            </p>
            <p>
              <strong>&quot;Isn&apos;t direct cremation cold or undignified?&quot;</strong> No. Your loved one
              is treated with the same professional care as any other cremation — collected respectfully, cared
              for in a proper mortuary, cremated in a proper coffin at a proper crematorium. The only thing
              missing is the crematorium chapel service. Many families hold a more meaningful memorial later.
            </p>
            <p>
              <strong>&quot;Will other family think we cut corners?&quot;</strong> Not once you explain the
              motivation. Direct cremation is a legitimate, mainstream UK choice — around one in five families
              now choose it. Framing it as &quot;we wanted to spend the funeral budget on a proper memorial we
              can all attend&quot; usually resonates.
            </p>
            <p>
              <strong>&quot;What about religious requirements?&quot;</strong> Direct cremation is compatible
              with most Christian, secular and humanist traditions. It is not compatible with traditional
              Orthodox Jewish or Muslim burial requirements — both require burial rather than cremation. If
              you have specific religious requirements, tell us on the call and we will advise.
            </p>
            <p>
              <strong>&quot;Can I still see my loved one before the cremation?&quot;</strong> Yes, at the
              local funeral director&apos;s mortuary — this is a chapel-of-rest viewing, arranged privately.
              We can facilitate this. It is not part of the standard direct cremation package but is available.
            </p>

          </article>
      </PillarArticleLayout>

      <CostCalculatorCTA variant="card" />

      <ProcessSteps />

      <ComparisonStrip />

      <PriceBlock />

      <WhyBdc />

      <FAQ items={FAQS} title="Direct cremation — frequently asked questions" />

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">Ready to arrange a direct cremation?</p>
          <h2 className="font-serif text-section text-white mb-4">Direct cremations, done properly.</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">
            £1,499 all-inclusive, delivered locally by a vetted independent funeral director. Speak to a real
            person, 24 hours a day. Never a chatbot.
          </p>
          <div className="inline-block">
            <PhoneCTA size="lg" variant="invert" showSubtext pulse />
          </div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        serviceSchema({
          areaServed: 'United Kingdom',
          path,
          description: 'Direct cremation in the UK from £1,499 all-inclusive. Complete guide to what is included, how the process works, and how to choose a provider.',
        }),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Direct cremation', path },
        ]),
        faqPageSchema(FAQS.map(f => ({ q: f.question, a: f.answer }))),
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'What is a Direct Cremation? — The Complete UK Guide 2026',
          description: 'Everything you need to know about direct cremation in the UK: what is included, cost, process, and how to choose a provider.',
          author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
          publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url, logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.png` } },
          mainEntityOfPage: `${SITE.url}${path}`,
          datePublished: '2026-01-15',
          dateModified: new Date().toISOString().slice(0, 10),
        },
      )} />
    </>
  );
}
