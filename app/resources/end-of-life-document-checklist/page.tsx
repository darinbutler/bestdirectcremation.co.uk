import type { Metadata } from 'next';
import PrintableChecklist from '@/components/PrintableChecklist';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'End-of-Life Document Checklist | Best Direct Cremation',
  description: 'Free printable UK checklist of every document your family will need when you die — where each one lives and what it does.',
  alternates: { canonical: `${SITE.url}/resources/end-of-life-document-checklist/` },
};

const Box = () => <span className="tick" />;

export default function DocumentChecklist() {
  return (
    <PrintableChecklist
      title="End-of-Life Document Checklist"
      subtitle="Every document your family will need when you die. List where each is kept so they don't have to hunt. Free to print or save as PDF."
    >
      <h2>Identity & vital records</h2>
      <ul>
        <li><Box /> Birth certificate — where kept:</li>
        <li><Box /> Marriage / civil partnership certificate (if applicable):</li>
        <li><Box /> Divorce decree absolute (if applicable):</li>
        <li><Box /> Passport — where kept:</li>
        <li><Box /> Driving licence — where kept:</li>
        <li><Box /> National Insurance number:</li>
        <li><Box /> NHS number:</li>
      </ul>

      <h2>Legal documents</h2>
      <ul>
        <li><Box /> Will — where the original is kept (solicitor / safety deposit box / home file):</li>
        <li><Box /> Executor name and phone:</li>
        <li><Box /> Lasting Power of Attorney for property and finance (if registered):</li>
        <li><Box /> Lasting Power of Attorney for health and welfare (if registered):</li>
        <li><Box /> Advance Decision (formerly &quot;living will&quot;) — where kept:</li>
        <li><Box /> Solicitor name and phone:</li>
      </ul>

      <h2>Financial</h2>
      <ul>
        <li><Box /> Bank accounts — institution and account numbers:</li>
        <li><Box /> Building society accounts:</li>
        <li><Box /> Credit cards (provider and account):</li>
        <li><Box /> Mortgages (provider, account, amount outstanding):</li>
        <li><Box /> Loans (provider, account, amount):</li>
        <li><Box /> Premium Bonds / ISAs / investments — provider and account:</li>
        <li><Box /> Accountant or financial adviser (name and phone):</li>
      </ul>

      <h2>Pensions</h2>
      <ul>
        <li><Box /> State Pension — claim reference (if receiving):</li>
        <li><Box /> Workplace pensions (current and previous employers):</li>
        <li><Box /> Personal / private pensions (provider, plan number, beneficiary nominated):</li>
        <li><Box /> Pension Tracing Service: 0800 731 0193 — for missing past pensions.</li>
      </ul>

      <h2>Insurance</h2>
      <ul>
        <li><Box /> Life insurance — provider, policy number, beneficiary:</li>
        <li><Box /> Critical illness cover (if any):</li>
        <li><Box /> Home insurance — provider and policy:</li>
        <li><Box /> Contents insurance — provider and policy:</li>
        <li><Box /> Vehicle insurance — provider and policy:</li>
        <li><Box /> Health insurance — provider and policy:</li>
        <li><Box /> Travel insurance (annual policy, if any):</li>
      </ul>

      <h2>Property</h2>
      <ul>
        <li><Box /> Title deeds — where kept (often with mortgage lender or solicitor):</li>
        <li><Box /> Land Registry title number (if known):</li>
        <li><Box /> Lease (if leasehold property) — where kept:</li>
        <li><Box /> Property valuation (recent if available):</li>
      </ul>

      <h2>Funeral preferences</h2>
      <ul>
        <li><Box /> Funeral plan provider and plan number (if you have one):</li>
        <li><Box /> Verify the provider on the FCA Register at fca.org.uk/register.</li>
        <li><Box /> Preferred funeral director (if any):</li>
        <li><Box /> Funeral preferences sheet — kept with this checklist (see our Funeral Planning Checklist).</li>
      </ul>

      <h2>Digital life</h2>
      <ul>
        <li><Box /> Email accounts and what should happen to them:</li>
        <li><Box /> Social media accounts (Facebook, Instagram, LinkedIn) and preferences (memorialise / delete):</li>
        <li><Box /> Subscriptions to cancel (Netflix, Spotify, Amazon, gym, magazines, etc):</li>
        <li><Box /> Password manager (master password location):</li>
        <li><Box /> Cryptocurrency / online financial accounts:</li>
      </ul>

      <h2>People to contact</h2>
      <ul>
        <li><Box /> GP — name and practice:</li>
        <li><Box /> Dentist — name and practice:</li>
        <li><Box /> Optician:</li>
        <li><Box /> Employer (if working) — main contact:</li>
        <li><Box /> Landlord (if renting):</li>
        <li><Box /> Carer or care provider (if any):</li>
      </ul>

      <h2>Pets &amp; dependants</h2>
      <ul>
        <li><Box /> Pets — what care arrangements are in place?</li>
        <li><Box /> Vet name and phone:</li>
        <li><Box /> Children/grandchildren — guardianship arrangements (formalised in the will):</li>
        <li><Box /> Anyone you support financially — what happens to that support?</li>
      </ul>

      <p style={{ marginTop: '6mm', fontSize: '10pt', fontStyle: 'italic' }}>
        Keep this checklist with your will. Tell your executor and next of kin where it is. Update annually.
      </p>
    </PrintableChecklist>
  );
}
