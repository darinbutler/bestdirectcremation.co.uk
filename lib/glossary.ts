/**
 * Funeral terms glossary — 120+ UK-focused funeral, cremation,
 * bereavement and legal terms. Each term becomes an indexable page.
 *
 * Sourced from NAFD/SAIF terminology, CMA Funerals Market Investigation
 * Order 2021, and standard UK funeral practice.
 */

export type GlossaryTerm = {
  slug: string;
  term: string;
  category: GlossaryCategory;
  shortDef: string;       // 1-sentence answer for FAQ schema + cards
  longDef: string;        // 2-4 paragraph definition for the page
  related?: string[];     // slugs of related glossary terms
  helpArticle?: string;   // optional slug of a related help article
};

export type GlossaryCategory =
  | 'Cremation'
  | 'Funeral types'
  | 'Funeral professionals'
  | 'Legal & paperwork'
  | 'Funeral plans & finance'
  | 'Burial'
  | 'Body care'
  | 'Ceremonial elements'
  | 'Memorial & aftercare'
  | 'Religious traditions'
  | 'Industry bodies'
  | 'Bereavement support';

export const CATEGORY_ORDER: GlossaryCategory[] = [
  'Cremation',
  'Funeral types',
  'Funeral professionals',
  'Legal & paperwork',
  'Funeral plans & finance',
  'Burial',
  'Body care',
  'Ceremonial elements',
  'Memorial & aftercare',
  'Religious traditions',
  'Industry bodies',
  'Bereavement support',
];

export const GLOSSARY: GlossaryTerm[] = [

  // ============================================================
  // CREMATION
  // ============================================================
  {
    slug: 'direct-cremation', term: 'Direct cremation', category: 'Cremation',
    shortDef: 'A simple cremation without a service or ceremony at the crematorium; ashes returned to the family.',
    longDef: 'A direct cremation is a dignified cremation without a formal service at the crematorium. The deceased is collected, cared for, and cremated, and the ashes are returned to the family. There is no chapel service, no celebrant, no music, no procession, and no family attendance at the crematorium itself. Direct cremation is the cheapest UK funeral option, typically £1,400-£1,700 all-inclusive in 2026, and now accounts for around one in five UK funerals. Many families hold a personal memorial separately, later, in a meaningful venue.',
    related: ['attended-cremation', 'unattended-cremation', 'simple-cremation', 'cremation-only', 'cremator', 'crematorium'],
    helpArticle: 'what-is-direct-cremation',
  },
  {
    slug: 'attended-cremation', term: 'Attended cremation', category: 'Cremation',
    shortDef: 'A cremation with family and friends present at a brief crematorium service, typically 20-30 minutes.',
    longDef: 'An attended cremation is a cremation that family and friends attend at the crematorium chapel. The service typically lasts 20-30 minutes and includes a celebrant or minister, music, readings, and a brief committal. Attended cremation sits between a direct cremation and a fully traditional funeral in both cost (£2,500-£3,800 in 2026) and ceremony. It is the right choice for families who want a brief, dignified moment of farewell at the crematorium without the full ceremonial procession.',
    related: ['direct-cremation', 'simple-cremation', 'crematorium-chapel', 'celebrant', 'committal'],
  },
  {
    slug: 'unattended-cremation', term: 'Unattended cremation', category: 'Cremation',
    shortDef: 'Same as direct cremation — a cremation without family present and no ceremony at the crematorium.',
    longDef: 'Unattended cremation is another term for direct cremation: a cremation where no family or friends are present at the crematorium and no formal service takes place. The terms are used interchangeably across the UK funeral industry. The cremation itself is still dignified and conducted to the same professional standards as any other UK cremation. Ashes are returned to the family within 5-14 days of the cremation.',
    related: ['direct-cremation', 'simple-cremation', 'cremation-only'],
  },
  {
    slug: 'simple-cremation', term: 'Simple cremation', category: 'Cremation',
    shortDef: 'A term used both for direct cremation and for an entry-level attended cremation; meaning depends on the provider.',
    longDef: 'The term "simple cremation" is used in two ways in the UK funeral industry. Some providers use it to mean direct cremation (no service at the crematorium). Others — notably Co-op Funeralcare and Dignity — use it for their entry-level attended cremation tier, which typically costs £2,500-£3,500 and includes a brief crematorium service. Always confirm with the provider exactly what is included before signing.',
    related: ['direct-cremation', 'attended-cremation'],
  },
  {
    slug: 'cremation-only', term: 'Cremation only', category: 'Cremation',
    shortDef: 'Another name for direct cremation, emphasising what is included (just the cremation) vs excluded (any ceremony).',
    longDef: 'Cremation only is another name for direct cremation. The phrase emphasises what the service includes (collection, care, cremation, return of ashes) and what it excludes (any ceremony or attendance at the crematorium). It is sometimes preferred by families who want to be explicit that nothing ceremonial is involved.',
    related: ['direct-cremation', 'unattended-cremation'],
  },
  {
    slug: 'cremator', term: 'Cremator', category: 'Cremation',
    shortDef: 'The furnace or chamber where the cremation takes place, typically operating at 800-1000°C.',
    longDef: 'A cremator is the industrial furnace in which a cremation takes place. UK cremators operate at temperatures of 800-1000°C and typically take 90 minutes to complete a cremation. Each cremation is conducted individually — only one body is in the cremator at a time, with strict identification controls throughout. Modern UK cremators include filters that capture mercury vapour from dental amalgam.',
    related: ['cremulator', 'crematorium'],
  },
  {
    slug: 'cremulator', term: 'Cremulator', category: 'Cremation',
    shortDef: 'The machine that processes bone fragments after cremation into the fine ash returned to the family.',
    longDef: 'After cremation, what remains is bone fragments rather than ash. The cremulator is the machine that processes these fragments into the fine grey powder that is returned to the family. The processing takes a few minutes and produces around 3-4 kg of ashes for an average adult. The ashes are then placed in a labelled urn or scatter tube for return to the family.',
    related: ['cremator', 'cremation', 'ashes'],
  },
  {
    slug: 'crematorium', term: 'Crematorium', category: 'Cremation',
    shortDef: 'A facility containing one or more cremators where UK cremations take place.',
    longDef: 'A crematorium is the building in which cremations take place. UK crematoria typically include one or more cremators, a chapel for funeral services, a Garden of Remembrance, and administrative facilities. Some are owned by local authorities, others by private companies (Dignity owns approximately 45 UK crematoria). The crematorium fee — typically £500-£900 — is paid to the crematorium operator and is included in your funeral director\'s all-in price.',
    related: ['cremator', 'crematorium-chapel', 'medical-referee', 'garden-of-remembrance'],
  },
  {
    slug: 'crematorium-chapel', term: 'Crematorium chapel', category: 'Cremation',
    shortDef: 'The room within a crematorium where attended cremation services take place.',
    longDef: 'The crematorium chapel is the room within the crematorium where attended cremation services are held. Despite the name, modern crematorium chapels are typically non-denominational and used for religious, non-religious, civil and humanist services alike. Bookings are typically for 30-45 minutes including time for the family to leave; the cremation itself happens later, after the family has departed.',
    related: ['crematorium', 'committal', 'celebrant'],
  },
  {
    slug: 'cremation-fee', term: 'Cremation fee', category: 'Cremation',
    shortDef: 'The fee paid to the crematorium for performing the cremation, typically £500-£900 in 2026.',
    longDef: 'The cremation fee is paid to the crematorium operator for performing the cremation. UK fees in 2026 typically range from £500 to £900, with London and large city crematoria at the upper end. The fee is set by the crematorium operator and is included as a disbursement in your funeral director\'s all-in price — you don\'t pay it separately.',
    related: ['crematorium', 'disbursement'],
  },
  {
    slug: 'medical-referee', term: 'Medical referee', category: 'Cremation',
    shortDef: 'A senior doctor at the crematorium who reviews all cremation paperwork before authorising the cremation.',
    longDef: 'Every UK crematorium has a Medical Referee — a senior doctor responsible for reviewing all cremation paperwork (Forms Cremation 4 and 5 from doctors, or Form Cremation 6 from the coroner) before authorising the cremation. The Medical Referee is the final check that all legal requirements have been met. Without their authorisation, the cremation cannot proceed.',
    related: ['form-cremation-4', 'form-cremation-5', 'form-cremation-6', 'crematorium'],
  },
  {
    slug: 'form-cremation-4', term: 'Form Cremation 4', category: 'Cremation',
    shortDef: 'The Medical Certificate completed by the doctor who attended the deceased during their final illness.',
    longDef: 'Form Cremation 4 (sometimes called Cremation Form 4 or Form Cremation A historically) is the Medical Certificate completed by the doctor who attended the deceased during their last illness. It confirms the cause of death and that the doctor sees no reason to prevent cremation. The doctor charges a fee of £82 in 2026, included in your funeral director\'s disbursements. Form Cremation 4 is not needed if the case is referred to the coroner.',
    related: ['form-cremation-5', 'form-cremation-6', 'medical-referee', 'death-certificate'],
  },
  {
    slug: 'form-cremation-5', term: 'Form Cremation 5', category: 'Cremation',
    shortDef: 'The Confirmatory Medical Certificate completed by an independent second doctor.',
    longDef: 'Form Cremation 5 (Cremation Form 5 or Form Cremation B historically) is the Confirmatory Medical Certificate completed by an independent second doctor who has examined the body separately. The second doctor must not be from the same practice as the first. Their independent examination provides a second professional check before cremation can proceed. Fee in 2026 is also £82. Together with Form Cremation 4, the total doctor\'s fees come to £164 — paid by the funeral director as disbursements.',
    related: ['form-cremation-4', 'form-cremation-6', 'medical-referee'],
  },
  {
    slug: 'form-cremation-6', term: 'Form Cremation 6', category: 'Cremation',
    shortDef: 'The Coroner\'s Certificate, issued when the death has been reported to the coroner.',
    longDef: 'Form Cremation 6 is issued by the coroner instead of Forms Cremation 4 and 5 when the death has been reported to the coroner — which happens in around 40% of UK deaths. It confirms that the coroner sees no reason to prevent cremation. There is no fee for Form Cremation 6. If the coroner is involved, Forms Cremation 4 and 5 are not needed.',
    related: ['form-cremation-4', 'form-cremation-5', 'coroner', 'medical-referee'],
  },
  {
    slug: 'form-cremation-10', term: 'Form Cremation 10', category: 'Cremation',
    shortDef: 'The Authority to Cremate, signed by the family confirming they want the cremation to proceed.',
    longDef: 'Form Cremation 10 is signed by the next of kin or whoever is arranging the funeral. It confirms that they want the cremation to go ahead and confirms the details (name, date, crematorium). This is the legal authority for the cremation to proceed and is one of the few cremation forms that the family signs personally. The funeral director presents it to you for signature once everything else is in place.',
    related: ['form-cremation-4', 'medical-referee'],
  },
  {
    slug: 'ashes', term: 'Ashes', category: 'Cremation',
    shortDef: 'The fine grey powder of processed bone fragments returned to the family after cremation.',
    longDef: 'Cremation ashes (also called cremated remains or cremains) are bone fragments that have been processed in a cremulator into a fine pale grey powder. An average adult produces about 3-4 kg (6-9 lbs) of ashes. They are clean, dry, safe to handle, and can be scattered, kept at home, interred, or turned into memorial jewellery. There is no legal restriction on keeping ashes indefinitely.',
    related: ['cremulator', 'urn', 'scatter-tube', 'garden-of-remembrance'],
  },
  {
    slug: 'priority-care', term: 'Priority Care', category: 'Cremation',
    shortDef: 'A fee for collecting the deceased from somewhere other than a hospital or coroner\'s mortuary.',
    longDef: 'Priority Care is the term most direct cremation providers use for collection from somewhere other than a hospital mortuary — typically home, a care home, or a hospice. Most UK deaths happen in these non-hospital settings, so Priority Care is needed for the majority of cases. Best Direct Cremation\'s Priority Care fee is a transparent £250, taking the maximum total to £1,749. Some providers charge £400-£500 for the same service — always check before signing.',
    related: ['direct-cremation', 'collection'],
  },

  // ============================================================
  // FUNERAL TYPES
  // ============================================================
  {
    slug: 'traditional-funeral', term: 'Traditional funeral', category: 'Funeral types',
    shortDef: 'A full ceremonial UK funeral with hearse, limousine, formal service and family attendance.',
    longDef: 'A traditional UK funeral involves a full ceremonial service: a hearse arriving at the family home or funeral director\'s premises; the cortège proceeding to the crematorium or burial site; a 30-45 minute service with a celebrant or minister; family and friends present; music, readings, hymns; a committal; and typically a wake afterwards. Average UK cost in 2026 is £4,510 (SunLife Cost of Dying Report 2026).',
    related: ['direct-cremation', 'attended-cremation', 'hearse', 'wake', 'committal'],
  },
  {
    slug: 'green-funeral', term: 'Green funeral', category: 'Funeral types',
    shortDef: 'A funeral with reduced environmental impact — typically natural burial or low-impact cremation.',
    longDef: 'A green funeral has reduced environmental footprint compared to a traditional UK funeral. Options include natural or woodland burial (no embalming, biodegradable coffin, tree marker), direct cremation without embalming or floral tributes, or new alkaline hydrolysis ("water cremation") which produces a fraction of standard cremation\'s carbon. Around 270 UK natural burial grounds exist (Association of Natural Burial Grounds).',
    related: ['natural-burial', 'woodland-burial', 'eco-funeral', 'direct-cremation'],
  },
  {
    slug: 'natural-burial', term: 'Natural burial', category: 'Funeral types',
    shortDef: 'A burial without embalming, in a biodegradable coffin, typically in a managed natural setting.',
    longDef: 'Natural burial (also called woodland burial or green burial) takes place in a managed natural setting — typically a meadow or woodland — without embalming, in a biodegradable coffin or shroud, with a tree or wildflower marker rather than a headstone. The ground gradually returns to a natural state. Around 270 UK natural burial grounds exist. Plot costs typically £900-£3,000.',
    related: ['woodland-burial', 'green-funeral', 'biodegradable-coffin'],
  },
  {
    slug: 'woodland-burial', term: 'Woodland burial', category: 'Funeral types',
    shortDef: 'A natural burial specifically in a managed woodland setting.',
    longDef: 'Woodland burial is a specific form of natural burial in a managed woodland. Plots are typically marked with a tree or wildflower planting rather than a headstone. The woodland is maintained as a permanent natural memorial, and bodies are buried without embalming, in biodegradable coffins or shrouds. Costs are typically £900-£3,000 for the plot.',
    related: ['natural-burial', 'green-funeral'],
  },
  {
    slug: 'eco-funeral', term: 'Eco funeral', category: 'Funeral types',
    shortDef: 'A broad term for any funeral with reduced environmental impact — burial or cremation.',
    longDef: 'Eco funeral is a broad term covering any funeral with reduced environmental impact. This includes natural burial, biodegradable coffins (cardboard, willow, bamboo, banana leaf), direct cremation without embalming or floral tributes, locally-sourced materials, and emerging technologies like alkaline hydrolysis. There is no formal certification — "eco" is used informally.',
    related: ['green-funeral', 'natural-burial', 'biodegradable-coffin'],
  },
  {
    slug: 'memorial-service', term: 'Memorial service', category: 'Funeral types',
    shortDef: 'A gathering to remember the deceased, held separately from the funeral itself.',
    longDef: 'A memorial service is a gathering to remember the deceased held separately from the funeral (and from the cremation or burial). It can take place at any time — days, weeks or months later — in any venue: a pub, community hall, family home, outdoor location, place of worship. Memorial services have grown alongside direct cremation: many families now choose direct cremation followed by a personal memorial later in a venue that genuinely matters.',
    related: ['direct-cremation', 'celebration-of-life', 'wake'],
    helpArticle: 'organising-a-memorial',
  },
  {
    slug: 'celebration-of-life', term: 'Celebration of life', category: 'Funeral types',
    shortDef: 'A less formal alternative to a memorial service, focused on celebrating the life lived.',
    longDef: 'A celebration of life is a less formal alternative to a memorial service, deliberately focused on celebrating the life lived rather than mourning the death. Often non-religious, often held in a personal venue (a pub, a cricket club, a family home), often including the deceased\'s favourite music, food and drink. The tone is uplifting rather than solemn. Increasingly common alongside direct cremation.',
    related: ['memorial-service', 'wake', 'direct-cremation'],
  },

  // ============================================================
  // FUNERAL PROFESSIONALS
  // ============================================================
  {
    slug: 'funeral-director', term: 'Funeral director', category: 'Funeral professionals',
    shortDef: 'The professional who arranges and conducts funerals, also called an undertaker or mortician.',
    longDef: 'A funeral director (also called undertaker, mortician, or funeral arranger) is the professional who arranges and conducts funerals. They collect the deceased, care for them, handle the legal paperwork, book the crematorium or cemetery, arrange the service, provide transport, and support the family throughout. In the UK, look for NAFD or SAIF accreditation as a baseline professional standard.',
    related: ['nafd', 'saif', 'undertaker', 'mortician', 'embalmer'],
    helpArticle: 'choosing-a-funeral-director',
  },
  {
    slug: 'undertaker', term: 'Undertaker', category: 'Funeral professionals',
    shortDef: 'Traditional UK term for a funeral director.',
    longDef: 'Undertaker is the traditional UK term for a funeral director. The word originated in the 17th century, when funeral directors literally "undertook" the practical arrangements of a funeral on behalf of the family. The term is still widely used colloquially, though "funeral director" is now the more common professional title.',
    related: ['funeral-director', 'mortician'],
  },
  {
    slug: 'mortician', term: 'Mortician', category: 'Funeral professionals',
    shortDef: 'American term for a funeral director or undertaker; rarely used in the UK.',
    longDef: 'Mortician is the standard American term for a funeral director. The word is rarely used in the UK, where "funeral director" or "undertaker" are preferred. The American sense often emphasises the embalming and body-preparation side of the profession, which in the UK is typically a specialist role within the funeral director\'s team.',
    related: ['funeral-director', 'undertaker', 'embalmer'],
  },
  {
    slug: 'embalmer', term: 'Embalmer', category: 'Funeral professionals',
    shortDef: 'A trained specialist who preserves and prepares the deceased for viewing or extended display.',
    longDef: 'An embalmer is trained in the chemical preservation and presentation of the deceased. Embalming uses formaldehyde-based preservatives to slow decomposition, allowing viewing or extended display. UK direct cremation typically does NOT involve embalming because it is unnecessary for an unattended cremation. Embalming is more common in traditional funerals where viewing or open-casket display is wanted.',
    related: ['funeral-director', 'embalming', 'viewing'],
  },
  {
    slug: 'celebrant', term: 'Celebrant', category: 'Funeral professionals',
    shortDef: 'A non-religious or partly-religious professional who leads funeral services.',
    longDef: 'A celebrant leads funeral services tailored to the deceased, typically non-religious or partly religious. They spend time with the family beforehand to understand the deceased — their character, key stories, favourite music, what mattered — and create a personalised service. Civil celebrants charge £200-£350; humanist celebrants (registered with Humanists UK) charge £250-£450. Best for families who want a personal service that doesn\'t follow a religious tradition.',
    related: ['humanist-celebrant', 'civil-celebrant', 'minister'],
  },
  {
    slug: 'humanist-celebrant', term: 'Humanist celebrant', category: 'Funeral professionals',
    shortDef: 'A celebrant accredited by Humanists UK who leads explicitly non-religious funeral services.',
    longDef: 'A humanist celebrant is accredited by Humanists UK to lead funeral services within the humanist tradition — explicitly non-religious, focused on celebrating the life lived rather than spiritual continuation. Humanist celebrants typically charge £250-£450. Suitable for families who specifically want a non-religious service with a philosophical framework.',
    related: ['celebrant', 'civil-celebrant', 'humanist-funeral'],
  },
  {
    slug: 'civil-celebrant', term: 'Civil celebrant', category: 'Funeral professionals',
    shortDef: 'A non-religious celebrant who can incorporate religious elements at the family\'s request.',
    longDef: 'A civil celebrant leads funeral services that can be non-religious or include religious elements at the family\'s specific request — perhaps a hymn, a prayer, or a moment of reflection. More flexible than a humanist celebrant for families who want mostly non-religious but with some traditional elements. Typical fee £200-£350.',
    related: ['celebrant', 'humanist-celebrant'],
  },
  {
    slug: 'minister', term: 'Minister', category: 'Funeral professionals',
    shortDef: 'A religious leader who conducts funeral services within their faith tradition.',
    longDef: 'A minister conducts funeral services within their religious tradition — typically an Anglican vicar or curate, a Catholic priest, a Methodist minister, etc. The service follows the established liturgy of the faith with prayers, readings, hymns and blessings. Ministers don\'t typically charge a fee but a contribution to the church is expected, usually £200-£400.',
    related: ['celebrant', 'priest', 'religious-funeral'],
  },
  {
    slug: 'coroner', term: 'Coroner', category: 'Funeral professionals',
    shortDef: 'A judicial officer who investigates deaths that are sudden, unexpected or unexplained.',
    longDef: 'The coroner is a judicial officer who investigates deaths reported to them — typically those that are sudden, unexpected, or where the cause is unclear. Around 40% of UK deaths are reported to the coroner. The coroner may order a post-mortem, hold an inquest, and issues Form Cremation 6 if cremation is to proceed. In Scotland, the equivalent role is the Procurator Fiscal.',
    related: ['form-cremation-6', 'inquest', 'death-certificate'],
  },
  {
    slug: 'registrar', term: 'Registrar', category: 'Funeral professionals',
    shortDef: 'The local government officer who records births, marriages, and deaths.',
    longDef: 'The registrar is the local government officer responsible for recording births, marriages and deaths. When someone dies, you register the death at the register office for the area where the person died. The registrar issues the Death Certificate (you typically want several certified copies, £11 each) and the Green Form (Certificate for Cremation or Burial).',
    related: ['death-certificate', 'green-form', 'tell-us-once'],
  },
  {
    slug: 'pallbearer', term: 'Pallbearer', category: 'Funeral professionals',
    shortDef: 'A person who carries the coffin to and from the funeral service.',
    longDef: 'Pallbearers carry the coffin during the funeral. Traditionally six people carry the coffin (three on each side), though four can carry a smaller coffin. Family members often serve as pallbearers; alternatively, the funeral director provides professional pallbearers (typically four staff at additional cost). Direct cremation does not involve pallbearers because there is no procession or family-attended service.',
    related: ['traditional-funeral', 'attended-cremation'],
  },
  {
    slug: 'end-of-life-doula', term: 'End-of-life doula', category: 'Funeral professionals',
    shortDef: 'A trained companion who supports the dying person and their family through the dying process.',
    longDef: 'An end-of-life doula (also called death doula) provides non-medical companionship and practical support to the dying person and their family through the dying process and immediately after. The role grew from the birth-doula tradition. End-of-life doulas don\'t replace medical care or hospice support — they complement it with continuous presence, planning help, and emotional support. The UK doula community is small but growing.',
    related: ['palliative-care', 'hospice'],
  },

  // ============================================================
  // LEGAL & PAPERWORK
  // ============================================================
  {
    slug: 'death-certificate', term: 'Death Certificate', category: 'Legal & paperwork',
    shortDef: 'The official record of the death, issued by the registrar; certified copies cost £11 each in 2026.',
    longDef: 'The Death Certificate is the official record of the death, issued by the registrar when you register the death. Most families need several certified copies because banks, pensions, insurance companies and the probate service all require originals. Each certified copy costs £11 (England and Wales; slightly different in Scotland and Northern Ireland). You can order more later for the same fee.',
    related: ['registrar', 'medical-certificate-of-cause-of-death', 'green-form'],
  },
  {
    slug: 'medical-certificate-of-cause-of-death', term: 'Medical Certificate of Cause of Death (MCCD)', category: 'Legal & paperwork',
    shortDef: 'The certificate from the attending doctor stating the cause of death; required for registration.',
    longDef: 'The Medical Certificate of Cause of Death (MCCD) is issued by the doctor who attended the deceased during their last illness, or by the doctor who verified the death. It states the cause of death and is required to register the death. Without it, you cannot register and the funeral cannot proceed. The hospital or GP surgery issues it within 1-2 days of the death.',
    related: ['death-certificate', 'registrar', 'coroner'],
  },
  {
    slug: 'green-form', term: 'Green Form', category: 'Legal & paperwork',
    shortDef: 'The Certificate for Cremation or Burial issued by the registrar; given to the funeral director.',
    longDef: 'The "Green Form" is the colloquial name for the Certificate for Cremation or Burial, issued by the registrar when you register the death. It is the legal authority for the funeral director to proceed with the cremation or burial. You give it to the funeral director (or have the registrar send it directly). Without it, the funeral cannot legally take place.',
    related: ['registrar', 'death-certificate'],
  },
  {
    slug: 'tell-us-once', term: 'Tell Us Once', category: 'Legal & paperwork',
    shortDef: 'A free UK government service that notifies most public bodies of a death in one go.',
    longDef: 'Tell Us Once is a free UK government service that notifies most public bodies of a death in a single transaction — HMRC, DWP, Passport Office, DVLA, the local council, the Electoral Register, and more. Without Tell Us Once you would have to write to each department separately. The registrar gives you a unique reference number when you register the death. You must use it within 28 days. Highly recommended — it saves enormous amounts of admin.',
    related: ['registrar', 'death-certificate'],
  },
  {
    slug: 'probate', term: 'Probate', category: 'Legal & paperwork',
    shortDef: 'The legal authority to deal with the deceased\'s estate (property, money, possessions).',
    longDef: 'Probate is the legal authority to deal with someone\'s estate after they die. If there\'s a will, the named executor applies for a Grant of Probate. If there\'s no will (intestacy), the next of kin applies for Letters of Administration. Both give the same legal authority to deal with property, bank accounts, pensions and possessions. Apply online via GOV.UK or by post. Application fee £300 for estates over £5,000 in 2026.',
    related: ['executor', 'intestacy', 'inheritance-tax'],
    helpArticle: 'probate-and-estate',
  },
  {
    slug: 'executor', term: 'Executor', category: 'Legal & paperwork',
    shortDef: 'The person named in a will to deal with the estate after the testator\'s death.',
    longDef: 'An executor is the person named in a will to deal with the estate after the testator\'s death. They apply for probate, identify and value assets, pay debts and taxes, and distribute the estate according to the will. Executors can be family members, professionals (solicitors), or both. Most wills name 1-2 executors. Executors have legal duties — including potentially personal liability if they get it wrong.',
    related: ['probate', 'will', 'intestacy'],
  },
  {
    slug: 'intestacy', term: 'Intestacy', category: 'Legal & paperwork',
    shortDef: 'Dying without a valid will; the estate is distributed under fixed statutory rules.',
    longDef: 'Intestacy is dying without a valid will. The estate is then distributed under fixed statutory rules, which often don\'t match what the deceased would have wanted. Unmarried partners receive nothing under intestacy rules. Stepchildren receive nothing. The rules favour spouses and direct descendants in a strict order. The next of kin applies for Letters of Administration rather than a Grant of Probate.',
    related: ['probate', 'will', 'executor'],
  },
  {
    slug: 'inheritance-tax', term: 'Inheritance Tax', category: 'Legal & paperwork',
    shortDef: 'UK tax payable on estates worth more than £325,000 (the nil-rate band) in 2026.',
    longDef: 'Inheritance Tax is UK tax payable on estates worth more than £325,000 (the nil-rate band) in 2026. The rate is 40% on the value above the threshold. Additional allowances exist: an extra £175,000 if a main residence passes to direct descendants; any unused allowance from a deceased spouse transfers to the survivor. Most UK estates do not pay inheritance tax — only around 4% exceed the threshold. Tax must be paid before probate is granted.',
    related: ['probate', 'estate', 'nil-rate-band'],
  },
  {
    slug: 'estate', term: 'Estate', category: 'Legal & paperwork',
    shortDef: 'Everything the deceased owned at the time of death — property, money, possessions, debts.',
    longDef: 'The estate is everything the deceased owned at the time of death: property, bank accounts, investments, pensions, life insurance payouts (sometimes), vehicles, possessions. The estate also includes their debts. The net estate (assets minus debts) is what passes to beneficiaries after inheritance tax (if applicable). Probate is the legal process of administering the estate.',
    related: ['probate', 'executor', 'inheritance-tax'],
  },
  {
    slug: 'will', term: 'Will', category: 'Legal & paperwork',
    shortDef: 'A legal document stating how the testator wants their estate distributed after their death.',
    longDef: 'A will is a legal document stating how the testator wants their estate distributed after death. A valid UK will must be in writing, signed by the testator in the presence of two witnesses, who must also sign. Wills should name executors and beneficiaries, may name guardians for children under 18, and can include funeral wishes (though these are not legally binding). Only around 40% of UK adults have a valid will.',
    related: ['executor', 'intestacy', 'probate'],
    helpArticle: 'writing-a-will',
  },
  {
    slug: 'inquest', term: 'Inquest', category: 'Legal & paperwork',
    shortDef: 'A formal investigation by the coroner into the cause of death; can take 6+ months for complex cases.',
    longDef: 'An inquest is a formal investigation by the coroner into the cause of death. Inquests are held when the cause of death is unclear, when the death was violent or unnatural, when it occurred in custody, or when other concerns exist. Most coroner cases conclude within 2-4 weeks; inquests are reserved for cases requiring deeper investigation and can take 6+ months. The funeral cannot proceed until the coroner releases the body.',
    related: ['coroner', 'death-certificate'],
  },
  {
    slug: 'funeral-expenses-payment', term: 'Funeral Expenses Payment', category: 'Legal & paperwork',
    shortDef: 'A means-tested UK government payment to help low-income families with funeral costs.',
    longDef: 'The Funeral Expenses Payment is a means-tested government payment available to low-income families on certain benefits (Universal Credit, Pension Credit, Income Support, Housing Benefit, JSA, ESA, Working Tax Credit with disability element, Child Tax Credit). It covers cremation or burial fees, certain travel costs, and additional moving costs. Typically £1,000-£1,500. Apply within 6 months via GOV.UK.',
    related: ['bereavement-support-payment', 'public-health-funeral'],
  },
  {
    slug: 'bereavement-support-payment', term: 'Bereavement Support Payment', category: 'Legal & paperwork',
    shortDef: 'UK government payment for spouses, civil partners, or (since 2023) cohabiting partners with children.',
    longDef: 'Bereavement Support Payment is a UK government payment to spouses, civil partners, or (since 2023) cohabiting partners with children, when their partner dies. Higher rate (with children): £3,500 initial + £350 per month for 18 months. Standard rate (without children): £2,500 initial + £100 per month for 18 months. The deceased must have been paying National Insurance. Apply within 21 months of the death.',
    related: ['funeral-expenses-payment', 'estate'],
  },
  {
    slug: 'public-health-funeral', term: 'Public Health Funeral', category: 'Legal & paperwork',
    shortDef: 'A basic but dignified council-arranged funeral when there is no one able to pay for it.',
    longDef: 'A Public Health Funeral (modernised term for what was historically called a "pauper\'s funeral") is arranged by the local council when there is no one able to pay for the funeral. It is basic but dignified — typically a simple cremation. The council may try to recover costs from the deceased\'s estate where possible. It is the safety net of last resort for families with no other option.',
    related: ['funeral-expenses-payment', 'direct-cremation'],
  },
  {
    slug: 'cma-funerals-order', term: 'CMA Funerals Market Investigation Order', category: 'Legal & paperwork',
    shortDef: 'The 2021 order requiring UK funeral directors to publish a Standardised Price List.',
    longDef: 'The CMA Funerals Market Investigation Order 2021 is the legal order from the UK\'s Competition and Markets Authority requiring every UK funeral director to publish a Standardised Price List on their website and display one in their branch. The format is set by the CMA so families can compare across providers directly. If a funeral director won\'t show you their Standardised Price List, they are in breach of the law.',
    related: ['standardised-price-list', 'cma'],
  },
  {
    slug: 'standardised-price-list', term: 'Standardised Price List', category: 'Legal & paperwork',
    shortDef: 'The legally required UK funeral price list in a CMA-defined format for direct comparison.',
    longDef: 'The Standardised Price List is the legally required UK funeral price list, in a format defined by the CMA Funerals Market Investigation Order 2021. Every funeral director must publish one on their website and display one in branch. It shows the all-in price for attended funeral, unattended cremation, and disbursements. The standardised format makes direct price comparison across providers possible.',
    related: ['cma-funerals-order'],
  },

  // ============================================================
  // FUNERAL PLANS & FINANCE
  // ============================================================
  {
    slug: 'funeral-plan', term: 'Funeral plan', category: 'Funeral plans & finance',
    shortDef: 'A prepaid contract to deliver a funeral at a fixed price, regardless of when death occurs.',
    longDef: 'A funeral plan is a prepaid contract between the buyer, a funeral plan provider, and (usually) a funeral director. The buyer pays for the funeral at today\'s prices, and the provider guarantees to deliver those services when the time comes. Since July 2022, every UK funeral plan provider must be authorised by the Financial Conduct Authority (FCA). Verify any provider on the FCA Register before paying.',
    related: ['fca-authorised', 'fca-register', 'fscs', 'prepaid-funeral-plan'],
    helpArticle: 'funeral-plans-explained',
  },
  {
    slug: 'fca-authorised', term: 'FCA-authorised', category: 'Funeral plans & finance',
    shortDef: 'Approved by the Financial Conduct Authority to sell UK funeral plans (required since July 2022).',
    longDef: 'FCA-authorised means a UK funeral plan provider has been approved by the Financial Conduct Authority to sell funeral plans. The FCA took over regulation of UK funeral plans on 29 July 2022, following the collapse of SafeHands. Authorisation requires capital adequacy, FSCS protection, conduct rules, and transparent terms. Always verify on the FCA Register (fca.org.uk/register) before paying any UK funeral plan provider.',
    related: ['funeral-plan', 'fca-register', 'fscs'],
  },
  {
    slug: 'fca-register', term: 'FCA Register', category: 'Funeral plans & finance',
    shortDef: 'The official register of UK firms authorised by the Financial Conduct Authority; check before buying any funeral plan.',
    longDef: 'The FCA Register (fca.org.uk/register) is the official list of UK firms authorised by the Financial Conduct Authority. It shows whether a firm is fully authorised, restricted, or has conditions on its permissions. Before buying any UK funeral plan, search the provider\'s name on the FCA Register. If they\'re not listed, they cannot legally sell funeral plans in the UK.',
    related: ['fca-authorised', 'funeral-plan', 'fscs'],
  },
  {
    slug: 'fscs', term: 'FSCS', category: 'Funeral plans & finance',
    shortDef: 'Financial Services Compensation Scheme — protects funeral plan customers if the provider fails.',
    longDef: 'FSCS (Financial Services Compensation Scheme) is the UK statutory compensation scheme. For funeral plans, FSCS protection means that if an FCA-authorised provider fails, customers\' plans are still honoured. The FSCS guarantee is part of the FCA authorisation framework that took effect on 29 July 2022. Pre-2022 plans (including SafeHands customers) generally do not have FSCS protection.',
    related: ['fca-authorised', 'funeral-plan'],
  },

  // ============================================================
  // BURIAL
  // ============================================================
  {
    slug: 'burial-plot', term: 'Burial plot', category: 'Burial',
    shortDef: 'The piece of land in a cemetery designated for burial of a single coffin.',
    longDef: 'A burial plot is the piece of land in a cemetery designated for burial. UK plot costs vary enormously — typically £1,500-£3,000 in rural council cemeteries, £5,000-£10,000 in suburban cemeteries, and £15,000-£25,000+ in central London or premium cemeteries (Highgate, Brompton). Most plots also require an annual maintenance fee. The plot is the biggest cost variable in a UK burial.',
    related: ['burial-right', 'exclusive-right-of-burial', 'cemetery'],
  },
  {
    slug: 'exclusive-right-of-burial', term: 'Exclusive Right of Burial', category: 'Burial',
    shortDef: 'A legal right granted by the cemetery owner allowing burial of a specific person in a specific plot.',
    longDef: 'The Exclusive Right of Burial (also called burial right or lair right in Scotland) is a legal right granted by the cemetery owner allowing burial of a specific person in a specific plot. The right is typically granted for 75-100 years and can be renewed. Without an Exclusive Right of Burial, you cannot bury someone in a specific plot — the cemetery owner can refuse and the burial cannot proceed.',
    related: ['burial-plot', 'cemetery'],
  },
  {
    slug: 'headstone', term: 'Headstone', category: 'Burial',
    shortDef: 'The memorial stone placed at the head of a grave, typically with the deceased\'s name and dates.',
    longDef: 'A headstone is the memorial stone placed at the head of a grave. UK headstones typically include the deceased\'s name, dates, and a brief inscription. They are subject to cemetery rules on size, material and design. Headstones must usually be erected 6-12 months after burial (allowing the ground to settle). Typical cost £600-£3,000+ depending on stone, lettering and detail. Some cemeteries also charge installation fees.',
    related: ['burial-plot', 'cemetery'],
  },
  {
    slug: 'cemetery', term: 'Cemetery', category: 'Burial',
    shortDef: 'A burial ground, typically owned by the local authority or a private operator.',
    longDef: 'A cemetery is a burial ground. UK cemeteries are typically owned by local authorities (council cemeteries — most common) or private operators (private cemeteries — historically prestigious like Highgate). Some are denominational (Catholic cemeteries, Jewish cemeteries). Cemeteries set their own rules on plot size, headstone material, and visiting hours. Natural burial grounds are a specific type of cemetery (around 270 UK sites).',
    related: ['burial-plot', 'churchyard', 'garden-cemetery'],
  },
  {
    slug: 'churchyard', term: 'Churchyard', category: 'Burial',
    shortDef: 'The burial ground attached to a parish church, typically for Anglican parishioners.',
    longDef: 'A churchyard is the burial ground attached to a parish church. Burial in a churchyard is typically reserved for parishioners (people who lived in or attended the parish). Many UK churchyards are now full and not accepting new burials. Where space remains, churchyard burial requires the parish minister\'s involvement and typically a Church of England service.',
    related: ['cemetery', 'burial-plot'],
  },
  {
    slug: 'columbarium', term: 'Columbarium', category: 'Burial',
    shortDef: 'A structure containing niches for the storage of cremation urns.',
    longDef: 'A columbarium is a structure containing niches (small recesses) for the storage of cremation urns. Many UK crematoria have columbaria within their grounds or in their Garden of Remembrance. Families purchase a niche, place the urn inside, and add a plaque with the deceased\'s name and dates. Niches typically cost £200-£800 plus the plaque cost.',
    related: ['urn', 'ash-interment', 'garden-of-remembrance'],
  },
  {
    slug: 'biodegradable-coffin', term: 'Biodegradable coffin', category: 'Burial',
    shortDef: 'A coffin made from natural materials that decompose without harming the environment.',
    longDef: 'A biodegradable coffin is made from natural materials that decompose without environmental harm. Options include cardboard, willow (woven wicker), bamboo, banana leaf, seagrass and pine shrouds. Used in natural burial and for environmentally-conscious families choosing direct cremation. Cardboard is the cheapest (around £200); willow and bamboo are more expensive (£400-£800) but often more visually beautiful.',
    related: ['natural-burial', 'green-funeral', 'eco-funeral'],
  },

  // ============================================================
  // BODY CARE
  // ============================================================
  {
    slug: 'embalming', term: 'Embalming', category: 'Body care',
    shortDef: 'Chemical preservation of the body, typically using formaldehyde-based fluids.',
    longDef: 'Embalming is the chemical preservation of the body to slow decomposition. The process uses formaldehyde-based fluids and is typically performed by a trained embalmer. Embalming is needed for: long delays between death and funeral; viewing or open-casket display; transport over long distances (especially international). UK direct cremation does NOT involve embalming because it is unnecessary for an unattended cremation. Embalming chemicals are problematic for groundwater, making it incompatible with most natural burial sites.',
    related: ['embalmer', 'natural-burial', 'viewing'],
  },
  {
    slug: 'mortuary', term: 'Mortuary', category: 'Body care',
    shortDef: 'A refrigerated facility where the deceased is cared for between death and the funeral.',
    longDef: 'A mortuary is a refrigerated facility where the deceased is cared for between death and the funeral. Mortuaries are operated by funeral directors (own-premises mortuary), hospitals (hospital mortuary), or specialist regional facilities. UK direct cremation specialists vary widely on mortuary location — local funeral director networks (like Best Direct Cremation) use the local FD\'s own mortuary; centralised operators (like Pure Cremation) use a single regional mortuary, often hundreds of miles from where the deceased lived.',
    related: ['funeral-director', 'collection', 'priority-care'],
  },
  {
    slug: 'collection', term: 'Collection', category: 'Body care',
    shortDef: 'The funeral director\'s service of collecting the deceased from where they died.',
    longDef: 'Collection is the funeral director\'s service of collecting the deceased from where they died and transporting them to the funeral director\'s mortuary. Collection happens from hospital mortuaries (no extra fee), or from home, care homes and hospices (Priority Care fee — £250 with Best Direct Cremation). Collection involves two trained staff in plain, unmarked vehicles and is conducted with dignity at any hour of the day or night.',
    related: ['priority-care', 'mortuary', 'funeral-director'],
  },
  {
    slug: 'viewing', term: 'Viewing', category: 'Body care',
    shortDef: 'A private time for the family to see the deceased at the funeral director\'s premises.',
    longDef: 'A viewing (also called visitation) is a private time for the family to see and spend time with the deceased at the funeral director\'s premises before the funeral. Most direct cremation providers allow a brief viewing if requested in advance, even though the cremation itself is unattended. For attended cremation or traditional funerals, viewing is more formal and may be open to wider family and friends. Embalming is typically needed for extended viewing or open-casket display.',
    related: ['embalming', 'direct-cremation', 'mortuary'],
  },

  // ============================================================
  // CEREMONIAL ELEMENTS
  // ============================================================
  {
    slug: 'eulogy', term: 'Eulogy', category: 'Ceremonial elements',
    shortDef: 'A tribute spoken at a funeral, telling the story of the deceased\'s life.',
    longDef: 'A eulogy is a tribute spoken at a funeral, telling the story of the deceased\'s life. Eulogies typically run 5-8 minutes and capture the person\'s character, key relationships, achievements and quirks. Written by family or by a celebrant after spending time with the family. Specifics work better than generalities — particular stories that demonstrate the person\'s character.',
    related: ['celebrant', 'order-of-service'],
    helpArticle: 'how-to-write-a-eulogy',
  },
  {
    slug: 'order-of-service', term: 'Order of service', category: 'Ceremonial elements',
    shortDef: 'The printed programme of a funeral service, listing readings, music and tributes.',
    longDef: 'The order of service is the printed programme of a funeral service. It typically includes the deceased\'s photo, name, dates, the sequence of the service (readings, music, eulogy, committal), the lyrics or words of any hymns or readings, and information about the wake. Printed for the family and attendees. A direct cremation does not have an order of service because there is no service.',
    related: ['traditional-funeral', 'attended-cremation', 'eulogy'],
  },
  {
    slug: 'committal', term: 'Committal', category: 'Ceremonial elements',
    shortDef: 'The formal moment when the coffin is moved behind the curtain or onto the catafalque at the crematorium.',
    longDef: 'The committal is the formal moment in an attended cremation service when the coffin is moved behind the curtain (or onto the catafalque, which then sinks). It marks the symbolic end of the family\'s time with the body. Direct cremation does not involve a committal because there is no service. The committal is often the most emotionally charged moment of an attended funeral.',
    related: ['attended-cremation', 'crematorium-chapel'],
  },
  {
    slug: 'hearse', term: 'Hearse', category: 'Ceremonial elements',
    shortDef: 'The specialised vehicle used to transport the coffin during a traditional funeral procession.',
    longDef: 'A hearse is the specialised vehicle used to transport the coffin during a traditional funeral procession. Modern UK hearses are typically based on Mercedes, Jaguar or Daimler models, finished in black, with windows for the coffin to be visible. Hearses are not used for direct cremation because there is no procession or service. For traditional funerals, the hearse leads the cortège from the family home or funeral director\'s premises to the crematorium or cemetery.',
    related: ['traditional-funeral', 'cortege', 'limousine'],
  },
  {
    slug: 'wake', term: 'Wake', category: 'Ceremonial elements',
    shortDef: 'The gathering after a funeral, typically at a pub, family home or community hall.',
    longDef: 'The wake (sometimes called reception or repast) is the gathering after a funeral. Typically held at a pub function room, a community hall, the family home, or a hired venue. Includes food and drink (sometimes a meal, sometimes just buffet and bar) and gives family and friends time to share memories, look at photos, and grieve together. Cost varies enormously — from free (pub function room with bar tab) to £25-£50 per head for a sit-down meal.',
    related: ['traditional-funeral', 'memorial-service'],
  },
  {
    slug: 'coffin', term: 'Coffin', category: 'Ceremonial elements',
    shortDef: 'The container for the deceased, used for both burial and cremation.',
    longDef: 'A coffin is the container for the deceased. UK coffins are typically veneered MDF (most common, around £200 wholesale), solid hardwood (premium, £600-£1,500), cardboard (cheap, eco, £150-£250), or wicker/willow/bamboo (eco, £400-£800). For cremation, the coffin must meet crematorium standards (no metal handles or fittings that won\'t burn). Best Direct Cremation includes a simple coffin suitable for cremation in the all-in £1,499.',
    related: ['casket', 'biodegradable-coffin'],
  },
  {
    slug: 'casket', term: 'Casket', category: 'Ceremonial elements',
    shortDef: 'American term for coffin; sometimes used in the UK for higher-end rectangular coffins.',
    longDef: 'Casket is the American term for coffin. In the UK, the words are sometimes used interchangeably, but "casket" is occasionally used specifically for rectangular (rather than the traditional tapered) coffins. American caskets are often more elaborate than UK coffins. In UK usage, "coffin" is the standard term.',
    related: ['coffin'],
  },

  // ============================================================
  // MEMORIAL & AFTERCARE
  // ============================================================
  {
    slug: 'urn', term: 'Urn', category: 'Memorial & aftercare',
    shortDef: 'A container for cremation ashes, ranging from simple wooden boxes to elaborate ceramic vessels.',
    longDef: 'An urn is a container for cremation ashes. Simple wooden or cardboard urns are included in most UK direct cremation services. Decorative urns (ceramic, marble, brass) range from £30 to several hundred pounds, purchased separately. Specialist urns include biodegradable urns (designed to be planted), scattering urns (designed to make scattering easier), and miniature urns for splitting ashes between family members.',
    related: ['ashes', 'scatter-tube', 'columbarium'],
  },
  {
    slug: 'scatter-tube', term: 'Scatter tube', category: 'Memorial & aftercare',
    shortDef: 'A specialised urn designed to make scattering ashes easier and cleaner.',
    longDef: 'A scatter tube is a specialised urn designed to make scattering ashes cleaner and easier. The tube has a removable end so ashes can be poured out gradually. Often biodegradable. Used by families who plan to scatter ashes outdoors. Many UK funeral directors include a simple scatter tube as the default container for returning ashes.',
    related: ['urn', 'ashes', 'scattering'],
  },
  {
    slug: 'garden-of-remembrance', term: 'Garden of Remembrance', category: 'Memorial & aftercare',
    shortDef: 'A landscaped garden at a crematorium where ashes can be scattered or interred.',
    longDef: 'A Garden of Remembrance is a landscaped garden within a crematorium\'s grounds where ashes can be scattered or interred. Most UK crematoria have one. Scattering fees are typically £100-£200; interment in a small ashes plot is £200-£500; a memorial plaque adds £100-£300. Provides families with a fixed place to visit while still using cremation.',
    related: ['crematorium', 'ashes', 'columbarium', 'ash-interment'],
  },
  {
    slug: 'ash-interment', term: 'Ash interment', category: 'Memorial & aftercare',
    shortDef: 'Burying cremation ashes in a small plot, urn niche, or family grave.',
    longDef: 'Ash interment is burying cremation ashes in a small ashes plot, an urn niche in a columbarium, or in an existing family grave. Costs are much lower than burial of a body — typically £200-£800 for the interment. Ash interment is popular with families who want a fixed place to visit while still using cremation. Can take place at a cemetery, churchyard, memorial garden or crematorium grounds.',
    related: ['ashes', 'garden-of-remembrance', 'columbarium'],
  },
  {
    slug: 'memorial-jewellery', term: 'Memorial jewellery', category: 'Memorial & aftercare',
    shortDef: 'Jewellery that incorporates a small amount of the deceased\'s ashes.',
    longDef: 'Memorial jewellery incorporates a small amount of the deceased\'s ashes into a wearable piece — typically a pendant, ring or bracelet. The ashes are sealed into glass, resin or precious metal. Costs range from £50 (simple glass pendants) to £500+ (gold or silver designs). Some specialist providers can also create a small diamond from a larger amount of ashes; this is significantly more expensive (£2,000-£15,000+).',
    related: ['ashes', 'memorial-diamond'],
  },
  {
    slug: 'memorial-tree', term: 'Memorial tree', category: 'Memorial & aftercare',
    shortDef: 'A tree planted in memory of the deceased, sometimes with ashes incorporated into the root area.',
    longDef: 'A memorial tree is planted in memory of the deceased. Can be in a personal garden, in a Woodland Trust memorial woodland (£50-£200 typical), or in a National Trust commemorative scheme. Some natural burial grounds plant a tree directly above the grave. Specialist "bios urn" products are biodegradable urns containing tree seeds that grow from the ashes — though their practicality is debated.',
    related: ['natural-burial', 'green-funeral', 'ashes'],
  },

  // ============================================================
  // RELIGIOUS TRADITIONS
  // ============================================================
  {
    slug: 'christian-funeral', term: 'Christian funeral', category: 'Religious traditions',
    shortDef: 'A funeral conducted within Christian tradition, varying by denomination (Anglican, Catholic, Methodist, etc).',
    longDef: 'A Christian funeral is conducted within Christian tradition. The specifics vary by denomination. Anglican (Church of England) funerals use the Book of Common Prayer service. Catholic funerals centre on the Requiem Mass. Methodist, Baptist and Free Church funerals follow their own traditions but share many common elements (readings, hymns, eulogy, committal). Most Christian denominations now accept cremation; the Catholic Church prefers the body present at the funeral mass.',
    related: ['catholic-funeral', 'anglican-funeral', 'minister'],
  },
  {
    slug: 'catholic-funeral', term: 'Catholic funeral', category: 'Religious traditions',
    shortDef: 'A Roman Catholic funeral, typically centred on the Requiem Mass with a priest officiating.',
    longDef: 'A Catholic funeral is conducted by a priest following Catholic liturgy. Typically centres on the Requiem Mass, with the body or ashes present. The Catholic Church accepted cremation in 1963 but prefers the body present at the funeral mass. Ashes should be interred in consecrated ground rather than scattered or kept at home. The full Catholic funeral can include a vigil/wake, the funeral mass, and committal at the cemetery or crematorium.',
    related: ['christian-funeral', 'priest', 'requiem-mass'],
  },
  {
    slug: 'jewish-funeral', term: 'Jewish funeral', category: 'Religious traditions',
    shortDef: 'A funeral conducted within Jewish tradition; burial within 24 hours where possible.',
    longDef: 'A Jewish funeral follows Jewish tradition, typically with burial within 24 hours of death where possible. The body is washed (tahara), wrapped in a shroud, and placed in a simple wooden coffin. The service is led by a rabbi or knowledgeable family member. After the burial, the family observes shiva (a 7-day mourning period). Orthodox Jewish tradition specifically requires burial; Reform Judaism permits cremation.',
    related: ['rabbi', 'shiva'],
  },
  {
    slug: 'muslim-funeral', term: 'Muslim funeral', category: 'Religious traditions',
    shortDef: 'A funeral conducted within Islamic tradition; burial within 24 hours, no cremation.',
    longDef: 'A Muslim funeral (Janazah) follows Islamic tradition. Cremation is not permitted — burial is required. The body is washed (ghusl), wrapped in a white shroud (kafan), and buried as soon as possible (typically within 24 hours) with the face turned toward Mecca. Funeral prayers (Salat al-Janazah) are led by an imam. The body is buried directly in the earth, in a simple unmarked or simply-marked grave.',
    related: ['imam', 'janazah'],
  },
  {
    slug: 'hindu-funeral', term: 'Hindu funeral', category: 'Religious traditions',
    shortDef: 'A funeral conducted within Hindu tradition, traditionally featuring cremation and scattering of ashes in a river.',
    longDef: 'A Hindu funeral follows Hindu tradition, traditionally featuring cremation. The cremation is preceded by rituals at home, and the family typically attends. After cremation, ashes are traditionally scattered in a river (ideally the Ganges, but any river is meaningful). The mourning period (Antyesti) involves specific rituals over 13 days. In the UK, modern Hindu funerals adapt these traditions to UK crematoria and circumstances.',
    related: ['antyesti'],
  },
  {
    slug: 'humanist-funeral', term: 'Humanist funeral', category: 'Religious traditions',
    shortDef: 'A non-religious funeral led by a humanist celebrant within the humanist tradition.',
    longDef: 'A humanist funeral is non-religious, led by a humanist celebrant accredited by Humanists UK. The service celebrates the life lived rather than spiritual continuation, with personal tributes, music chosen by the family, and readings (often poetry or prose rather than religious texts). Suitable for families who specifically want a non-religious service. Humanist celebrants typically charge £250-£450.',
    related: ['humanist-celebrant', 'celebrant'],
  },

  // ============================================================
  // INDUSTRY BODIES
  // ============================================================
  {
    slug: 'nafd', term: 'NAFD', category: 'Industry bodies',
    shortDef: 'National Association of Funeral Directors — the UK\'s largest funeral trade body.',
    longDef: 'NAFD (National Association of Funeral Directors) is the UK\'s largest funeral trade body, founded in 1905. Around 4,000 UK funeral homes are members. Members commit to professional standards, a code of practice, and a complaints process, and undergo periodic inspection. NAFD membership is a baseline trust signal for UK funeral directors. Best Direct Cremation requires NAFD or SAIF accreditation at every partner funeral director.',
    related: ['saif', 'funeral-director'],
  },
  {
    slug: 'saif', term: 'SAIF', category: 'Industry bodies',
    shortDef: 'National Society of Allied and Independent Funeral Directors — the UK trade body for independents.',
    longDef: 'SAIF (National Society of Allied and Independent Funeral Directors) is the UK trade body specifically representing independent (non-chain) funeral directors. Around 900 UK members. Members commit to standards including a complaints process and a Code of Practice. SAIF accreditation is a strong trust signal that you\'re dealing with an independent rather than a national chain branch.',
    related: ['nafd', 'funeral-director'],
  },
  {
    slug: 'cma', term: 'CMA', category: 'Industry bodies',
    shortDef: 'Competition and Markets Authority — the UK regulator behind the Funerals Market Investigation Order.',
    longDef: 'CMA (Competition and Markets Authority) is the UK\'s competition regulator. The CMA\'s 2020-2021 Funerals Market Investigation found significant variation in pricing, quality and transparency across the UK funeral industry. The resulting CMA Funerals Market Investigation Order 2021 requires every UK funeral director to publish a Standardised Price List, making price comparison possible for the first time.',
    related: ['cma-funerals-order', 'standardised-price-list'],
  },
  {
    slug: 'fbca', term: 'FBCA', category: 'Industry bodies',
    shortDef: 'Federation of Burial and Cremation Authorities — the UK trade body for crematoria and cemeteries.',
    longDef: 'FBCA (Federation of Burial and Cremation Authorities) is the UK trade body representing crematoria and cemetery operators. It sets professional standards for member crematoria, publishes guidelines on cremation practice, and represents the industry on regulatory matters.',
    related: ['crematorium'],
  },
  {
    slug: 'iccm', term: 'ICCM', category: 'Industry bodies',
    shortDef: 'Institute of Cemetery and Crematorium Management — the UK professional body for cemetery and crematorium professionals.',
    longDef: 'ICCM (Institute of Cemetery and Crematorium Management) is the UK professional body for individual cemetery and crematorium managers and staff. It provides training, qualifications and professional development for people working in cemeteries and crematoria. ICCM works alongside FBCA, which represents the operator organisations themselves.',
    related: ['fbca', 'crematorium'],
  },

  // ============================================================
  // BEREAVEMENT SUPPORT
  // ============================================================
  {
    slug: 'cruse', term: 'Cruse Bereavement Support', category: 'Bereavement support',
    shortDef: 'The UK\'s largest bereavement charity, offering free helpline, online chat and counselling.',
    longDef: 'Cruse Bereavement Support is the UK\'s largest bereavement charity. Offers a free helpline (0808 808 1677), online chat, regional support groups, and one-to-one counselling. Highly recommended as a first port of call for anyone struggling with grief — fresh or long-standing. Free, confidential, and trained.',
    related: ['samaritans', 'sands', 'way'],
    helpArticle: 'bereavement-support',
  },
  {
    slug: 'samaritans', term: 'Samaritans', category: 'Bereavement support',
    shortDef: 'UK helpline for anyone in distress — 116 123, free, 24/7, confidential.',
    longDef: 'Samaritans is a UK helpline for anyone in distress. Call 116 123 — free, 24 hours a day, every day, confidential. Trained for anyone in emotional distress, including those experiencing grief that has become overwhelming, or who have thoughts of self-harm. Samaritans does not provide ongoing counselling but offers immediate emotional support at the moment you need it.',
    related: ['cruse'],
  },
  {
    slug: 'sands', term: 'Sands', category: 'Bereavement support',
    shortDef: 'Stillbirth and Neonatal Death Society — UK charity specifically supporting families through baby loss.',
    longDef: 'Sands (Stillbirth and Neonatal Death Society) is the UK charity specifically supporting families through stillbirth and neonatal death. Offers a free helpline, online community, regional support groups, and one-to-one bereavement support. Sands operates the only national stillbirth and neonatal death registry. sands.org.uk',
    related: ['cruse', 'child-bereavement-uk'],
  },
  {
    slug: 'way', term: 'WAY (Widowed and Young)', category: 'Bereavement support',
    shortDef: 'UK charity specifically supporting people who have been widowed under the age of 50.',
    longDef: 'WAY (Widowed and Young) is the UK charity specifically for people widowed under 50. Offers peer support, regional events, online community, and a structured framework for connecting with other widowed-young members. Important because most general bereavement support is geared toward older bereaved partners, and the experience of being widowed young has specific challenges.',
    related: ['cruse', 'bereavement-support-payment'],
  },
  {
    slug: 'marie-curie', term: 'Marie Curie', category: 'Bereavement support',
    shortDef: 'UK charity providing end-of-life care and bereavement support for families of people with terminal illness.',
    longDef: 'Marie Curie provides end-of-life care (in Marie Curie hospices and through home nursing) and bereavement support specifically for families of people with terminal illness. Free bereavement helpline (0800 090 2309), online community, and counselling. Particularly experienced with anticipatory grief — the grief experienced during the months of a loved one\'s terminal illness, before death.',
    related: ['hospice', 'palliative-care', 'cruse'],
  },
  {
    slug: 'grief', term: 'Grief', category: 'Bereavement support',
    shortDef: 'The natural emotional response to losing someone you love.',
    longDef: 'Grief is the natural emotional response to losing someone you love. It is not a problem to be solved or a phase to be moved through — it is the way humans process loss. Grief comes in waves, can include sadness, numbness, anger, guilt, exhaustion, even relief, and looks different for everyone. Most grief is not pathological and does not require professional treatment, though support (from friends, family, or charities like Cruse) helps almost everyone.',
    related: ['bereavement', 'anticipatory-grief', 'cruse'],
  },
  {
    slug: 'anticipatory-grief', term: 'Anticipatory grief', category: 'Bereavement support',
    shortDef: 'Grief experienced before a loss, typically during a loved one\'s terminal illness.',
    longDef: 'Anticipatory grief is grief experienced before a loss, typically during a loved one\'s terminal illness. The family grieves through the months of decline — for the person they\'re losing in real time. This is a normal, healthy response, not premature mourning. Marie Curie, Cruse and most bereavement charities specifically support anticipatory grief because it is often as difficult as the grief that follows the death itself.',
    related: ['grief', 'palliative-care', 'marie-curie'],
  },

];

// Cross-referenced helpers — used by the page templates
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find(t => t.slug === slug);
}

export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return GLOSSARY.filter(t => t.category === category).sort((a, b) => a.term.localeCompare(b.term));
}

export function getRelatedTerms(slugs: string[]): GlossaryTerm[] {
  return slugs
    .map(s => getTermBySlug(s))
    .filter((t): t is GlossaryTerm => Boolean(t));
}

// Alphabetical index for A-Z hub
export function getAlphabeticalIndex(): Record<string, GlossaryTerm[]> {
  const idx: Record<string, GlossaryTerm[]> = {};
  GLOSSARY.forEach(t => {
    const letter = t.term[0].toUpperCase();
    (idx[letter] ||= []).push(t);
  });
  Object.keys(idx).forEach(k => idx[k].sort((a, b) => a.term.localeCompare(b.term)));
  return idx;
}
