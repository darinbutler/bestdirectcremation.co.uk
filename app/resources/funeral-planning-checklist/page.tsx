import type { Metadata } from 'next';
import PrintableChecklist from '@/components/PrintableChecklist';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Funeral Planning Checklist — Plan Ahead in 30 Minutes | Best Direct Cremation',
  description: 'Free printable UK checklist for planning your own funeral in advance. What to decide, write down and tell your family. Save as PDF.',
  alternates: { canonical: `${SITE.url}/resources/funeral-planning-checklist/` },
};

const Box = () => <span className="tick" />;

export default function FuneralPlanningChecklist() {
  return (
    <PrintableChecklist
      title="Funeral Planning Checklist"
      subtitle="Plan your own funeral in 30 minutes. Tick each item, then keep this sheet with your will. Free to print or save as PDF."
    >
      <h2>The basics</h2>
      <ul>
        <li><Box /> Decide: cremation or burial?</li>
        <li><Box /> If cremation: direct cremation (no service) or attended (brief service)?</li>
        <li><Box /> If burial: where? (existing family plot, new plot, churchyard, natural burial ground?)</li>
        <li><Box /> Write down your decision and the reason — your family won&apos;t have to guess.</li>
      </ul>

      <h2>The service</h2>
      <ul>
        <li><Box /> Religious, civil, humanist, or no service at all?</li>
        <li><Box /> Preferred celebrant, minister or speaker (name and contact if you have one)?</li>
        <li><Box /> Music — list 2–4 pieces you would like, with title and artist.</li>
        <li><Box /> Readings — list any poems, prose, religious passages.</li>
        <li><Box /> Who should be invited? (immediate family, wider family, work colleagues, community.)</li>
        <li><Box /> Who should NOT be invited if anyone? (better written down than guessed.)</li>
        <li><Box /> Flowers, donations, or both?</li>
        <li><Box /> If donations: nominate the charity (full name, registered charity number if possible).</li>
      </ul>

      <h2>Practical preferences</h2>
      <ul>
        <li><Box /> Coffin type (simple, traditional, biodegradable, willow/wicker, cardboard).</li>
        <li><Box /> Embalming yes / no (most direct cremations do not include embalming).</li>
        <li><Box /> Viewing of the body yes / no.</li>
        <li><Box /> Hearse and limousines yes / no.</li>
        <li><Box /> Order of service printed yes / no.</li>
        <li><Box /> Wake / reception / gathering — where, what catering, what tone (formal or relaxed).</li>
      </ul>

      <h2>After the cremation / burial</h2>
      <ul>
        <li><Box /> Cremation: where should the ashes go? (scattered at a meaningful place, kept at home, interred in memorial garden, divided between family, memorial jewellery, etc.)</li>
        <li><Box /> Burial: any specific headstone or memorial wording?</li>
        <li><Box /> Any specific anniversary wishes? (e.g. annual gathering, charity walk, planting a tree.)</li>
      </ul>

      <h2>Paying for it</h2>
      <ul>
        <li><Box /> How will the funeral be paid for? (prepaid funeral plan, life insurance, savings, estate.)</li>
        <li><Box /> If a prepaid plan: write down the provider name, plan number, and customer service phone. Always verify on the FCA Register at fca.org.uk/register.</li>
        <li><Box /> If savings: where is the money? Make sure family knows the account.</li>
        <li><Box /> Direct cremation costs £1,400–£1,700 in 2026 (Best Direct Cremation £1,499). Traditional funeral averages £4,510.</li>
      </ul>

      <h2>Documents and information for the family</h2>
      <ul>
        <li><Box /> Will — where is the original kept? (solicitor, bank safety deposit box, home file.)</li>
        <li><Box /> Executor(s) — name and phone.</li>
        <li><Box /> Solicitor — name and phone (if you have one).</li>
        <li><Box /> Funeral director preference — name and phone (if any).</li>
        <li><Box /> Bank(s) — name and account numbers.</li>
        <li><Box /> Pensions — provider names and policy numbers.</li>
        <li><Box /> Life insurance — provider and policy number.</li>
        <li><Box /> Mortgage / utility / subscription accounts — list.</li>
        <li><Box /> Digital accounts — list of services (email, social, streaming) and what to do with each.</li>
        <li><Box /> Passwords — consider a password manager or sealed envelope.</li>
      </ul>

      <h2>People to tell</h2>
      <ul>
        <li><Box /> List the people who should be informed first (next of kin, closest friends).</li>
        <li><Box /> List anyone overseas who may need extra time to travel.</li>
        <li><Box /> List employer / business partners / clients if relevant.</li>
        <li><Box /> List your GP, dentist, optician, vet (if you have pets).</li>
      </ul>

      <h2>Bonus: what you want people to know</h2>
      <ul>
        <li><Box /> A short message to leave for family — a few lines about what mattered most.</li>
        <li><Box /> Specific keepsakes or items you want to go to specific people (separate from the will).</li>
        <li><Box /> Any final wishes around pets, plants, possessions.</li>
      </ul>

      <p style={{ marginTop: '6mm', fontSize: '10pt', fontStyle: 'italic' }}>
        Once complete, keep this sheet with your will or in a clearly-marked envelope at home. Tell your executor
        and next of kin where it is.
      </p>
    </PrintableChecklist>
  );
}
