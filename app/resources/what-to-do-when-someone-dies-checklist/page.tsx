import type { Metadata } from 'next';
import PrintableChecklist from '@/components/PrintableChecklist';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'What to Do When Someone Dies — Printable Checklist | Best Direct Cremation',
  description: 'Free printable UK checklist of every practical thing you need to do when someone dies — first 24 hours, first week, first month. Save as PDF.',
  alternates: { canonical: `${SITE.url}/resources/what-to-do-when-someone-dies-checklist/` },
};

const Box = () => <span className="tick" />;

export default function WhatToDoChecklist() {
  return (
    <PrintableChecklist
      title="What to Do When Someone Dies"
      subtitle="A practical UK checklist for the first 24 hours, the first week, and the first month after a death. Tick the items as you complete them. Free to print or save as PDF."
    >
      <h2>First 24 hours</h2>

      <h3>If the death happened at home and was expected</h3>
      <ul>
        <li><Box /> Call the GP surgery or community nursing team — they will arrange a doctor to verify the death and issue the Medical Certificate of Cause of Death.</li>
        <li><Box /> Give yourself time. You don&apos;t need to call funeral directors immediately.</li>
        <li><Box /> Out-of-hours: call NHS 111 to reach the on-call GP or district nurse.</li>
      </ul>

      <h3>If the death was unexpected</h3>
      <ul>
        <li><Box /> Call 999. Paramedics will attend and verify the death. The police and coroner may be involved.</li>
        <li><Box /> Do not move the person or touch anything in the room until professionals arrive.</li>
      </ul>

      <h3>If the death happened in hospital or hospice</h3>
      <ul>
        <li><Box /> Staff handle immediate practicalities. You will be given the Medical Certificate of Cause of Death.</li>
        <li><Box /> Speak to the hospital bereavement office — they provide a checklist of next steps.</li>
        <li><Box /> Take your time. You don&apos;t have to make funeral arrangements within hours.</li>
      </ul>

      <h2>First week</h2>

      <h3>Register the death</h3>
      <ul>
        <li><Box /> Register within 5 days in England, Wales, Northern Ireland (8 days in Scotland).</li>
        <li><Box /> Book an appointment at the register office for the area where the person died.</li>
        <li><Box /> Bring: Medical Certificate of Cause of Death, full name (and any previous names), date and place of birth, last address, occupation, NHS number if known, details of any state pension or benefits.</li>
        <li><Box /> Order 6–10 certified copies of the Death Certificate (£11 each in 2026) — for banks, pensions, probate.</li>
        <li><Box /> Collect the &quot;Green Form&quot; (Certificate for Cremation or Burial) and pass it to the funeral director.</li>
      </ul>

      <h3>Use Tell Us Once</h3>
      <ul>
        <li><Box /> The registrar provides a unique reference for the free Tell Us Once service.</li>
        <li><Box /> Notifies HMRC, DWP, DVLA, Passport Office, local council and Electoral Register in one go.</li>
        <li><Box /> Use within 28 days of receiving the reference.</li>
      </ul>

      <h3>Choose a funeral director</h3>
      <ul>
        <li><Box /> Look for NAFD or SAIF accreditation.</li>
        <li><Box /> Check their CMA Standardised Price List on their website (legally required).</li>
        <li><Box /> Compare at least three local funeral directors plus one national operator.</li>
        <li><Box /> Confirm the all-in price including any Priority Care fee for non-hospital collections.</li>
        <li><Box /> Direct cremation £1,400–£1,700 typical · Attended cremation £2,500–£3,800 · Traditional £4,500+.</li>
      </ul>

      <h3>Tell family, friends and employer</h3>
      <ul>
        <li><Box /> Notify immediate family in person or by phone.</li>
        <li><Box /> Notify wider circle by phone, email or social media as appropriate.</li>
        <li><Box /> Notify employer (deceased&apos;s and your own if you need time off).</li>
        <li><Box /> Notify schools/childcare if children were close to the deceased.</li>
      </ul>

      <h2>Second week</h2>

      <h3>Arrange the funeral</h3>
      <ul>
        <li><Box /> Decide type of funeral (direct, attended, traditional, burial).</li>
        <li><Box /> Confirm date and venue with the funeral director.</li>
        <li><Box /> Choose music, readings, eulogy (if attended funeral).</li>
        <li><Box /> Decide on flowers vs charitable donations.</li>
        <li><Box /> Arrange transport for family.</li>
        <li><Box /> Plan the wake / reception / memorial.</li>
      </ul>

      <h3>Begin admin</h3>
      <ul>
        <li><Box /> Notify the deceased&apos;s bank (each bank has a bereavement team).</li>
        <li><Box /> Notify any private pension providers.</li>
        <li><Box /> Notify life insurance providers.</li>
        <li><Box /> Notify utilities, mortgage provider, mobile phone, broadband, streaming subscriptions.</li>
        <li><Box /> Notify the deceased&apos;s GP and any other medical contacts.</li>
        <li><Box /> Redirect post (Royal Mail offers a bereavement redirection service).</li>
      </ul>

      <h2>First month</h2>

      <ul>
        <li><Box /> The funeral takes place. Keep all receipts for the estate.</li>
        <li><Box /> Ashes returned (if cremation) — 5–14 days after the cremation.</li>
        <li><Box /> Start the probate process if the estate requires it (property in sole name, significant accounts).</li>
        <li><Box /> Begin executor duties: locate the will, identify assets, value the estate.</li>
        <li><Box /> Apply for any benefits you may be entitled to: Bereavement Support Payment, Funeral Expenses Payment.</li>
        <li><Box /> Continue closing accounts and updating records.</li>
        <li><Box /> Consider bereavement support: Cruse (0808 808 1677), Samaritans (116 123), your GP for counselling referral.</li>
      </ul>

      <h2>Beyond the first month</h2>

      <ul>
        <li><Box /> Probate typically takes 6–16 weeks for the grant; full estate administration 6–18 months.</li>
        <li><Box /> Inheritance tax (if applicable) must be paid before probate is granted.</li>
        <li><Box /> Continue notifying accounts and providers as you discover them.</li>
        <li><Box /> Consider a memorial gathering if the funeral was a direct cremation.</li>
        <li><Box /> Take care of yourself. Grief is not linear. Support is free and available.</li>
      </ul>
    </PrintableChecklist>
  );
}
