export const services = [
  {
    slug: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    short: 'Painless single-visit RCT with rotary endodontics & digital imaging.',
    icon: 'tooth',
    color: 'from-brand-500 to-brand-700',
    accent: 'bg-brand-500',
    hero: 'Save your natural tooth — painless, single-visit root canal therapy.',
    description:
      'Our endodontists use advanced rotary instruments, digital X-rays and microscope-assisted procedures to clean and seal infected tooth canals — most cases finished in a single, comfortable visit.',
    benefits: [
      'Pain-free single visit RCT',
      'Microscope assisted precision',
      'Digital intra-oral X-rays',
      'Premium ceramic crown options',
      '5-year crown warranty',
    ],
    faqs: [
      { q: 'Does it hurt?', a: 'No. Modern anaesthesia and rotary tools make RCT comparable to a routine filling.' },
      { q: 'How many visits?', a: 'Most molars are completed in 1 visit (60–90 min). Complex cases may need 2.' },
    ],
  },
  {
    slug: 'teeth-whitening',
    title: 'Teeth Whitening',
    short: 'In-clinic Zoom whitening — up to 8 shades brighter in 45 minutes.',
    icon: 'sparkle',
    color: 'from-brand-400 to-brand-600',
    accent: 'bg-brand-400',
    hero: 'Brighter, whiter smile — in just one visit.',
    description:
      'Professional in-clinic whitening using FDA-approved Zoom® and Opalescence systems. Safe for enamel, lasts 12+ months, with custom take-home trays available.',
    benefits: ['Up to 8 shades brighter', '45-minute in-clinic session', 'Custom take-home trays', 'Enamel-safe formula'],
    faqs: [
      { q: 'Is whitening safe?', a: 'Yes — performed under dentist supervision with desensitisers to protect enamel.' },
      { q: 'How long does it last?', a: '12–18 months with proper care; touch-up trays maintain results.' },
    ],
  },
  {
    slug: 'dental-implants',
    title: 'Dental Implants',
    short: 'World-class titanium & zirconia implants with lifetime warranty.',
    icon: 'implant',
    color: 'from-ink-900 to-brand-600',
    accent: 'bg-ink-900',
    hero: 'Replace missing teeth — permanently.',
    description:
      'CT-guided implant placement using global brands (Nobel Biocare, Straumann, Osstem). Same-day implants and All-on-4 full-arch options available.',
    benefits: ['CT-guided precision placement', 'Same-day implants available', 'All-on-4 full-arch solutions', 'Lifetime implant warranty', 'EMI plans available'],
    faqs: [
      { q: 'How long do implants last?', a: 'With good hygiene, implants typically last 25+ years — many for life.' },
      { q: 'Is it painful?', a: 'No. The procedure is done under local anaesthesia and most patients return to work next day.' },
    ],
  },
  {
    slug: 'braces-aligners',
    title: 'Braces & Aligners',
    short: 'Metal, ceramic and Invisalign® clear aligners for all ages.',
    icon: 'aligner',
    color: 'from-brand-500 to-ink-900',
    accent: 'bg-brand-500',
    hero: 'Straighter teeth — visible or invisible.',
    description:
      'Comprehensive orthodontics — traditional metal braces, tooth-coloured ceramic braces, lingual (behind-the-tooth) braces and Invisalign® clear aligners. Free first consult & 3D smile preview.',
    benefits: ['Free 3D smile preview', 'Invisalign® certified provider', 'Metal, ceramic & lingual options', 'Adult orthodontics', '0% interest EMI plans'],
    faqs: [
      { q: 'How long does treatment take?', a: 'Most adults complete treatment in 12–18 months; minor corrections in 4–6 months.' },
      { q: 'Are aligners better than braces?', a: 'Aligners are removable and invisible but braces work better for complex bite issues. We help you choose.' },
    ],
  },
  {
    slug: 'pediatric-dentistry',
    title: 'Pediatric Dentistry',
    short: 'Gentle, kid-friendly dentistry that builds lifelong smiles.',
    icon: 'kid',
    color: 'from-brand-400 to-brand-700',
    accent: 'bg-brand-400',
    hero: 'Happy little patients. Healthy big smiles.',
    description:
      'Specialist pediatric dentists, child-themed treatment rooms, tell-show-do behaviour techniques. Preventive sealants, fluoride and habit-breaking appliances.',
    benefits: ['Specialist pediatric dentists', 'Child-friendly play area', 'Painless laser cavities treatment', 'Preventive sealants & fluoride', 'Nitrous oxide sedation available'],
    faqs: [
      { q: 'When should my child first visit?', a: 'By age 1 or within 6 months of the first tooth, then every 6 months.' },
      { q: 'Do you treat anxious children?', a: 'Yes — we use behaviour shaping, distraction and sedation when needed.' },
    ],
  },
  {
    slug: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    short: 'Veneers, smile design and Hollywood smile makeovers.',
    icon: 'smile',
    color: 'from-brand-500 to-brand-800',
    accent: 'bg-brand-500',
    hero: 'Designed smiles, real-life ready.',
    description:
      'Digital smile design (DSD), ultra-thin porcelain veneers, gum contouring and full-mouth rehabilitation. Preview your new smile before treatment starts.',
    benefits: ['Digital Smile Design preview', 'Ultra-thin Emax® veneers', 'Gum contouring & whitening', 'Full-mouth rehabilitation', 'Celebrity-trusted aesthetics'],
    faqs: [
      { q: 'Will veneers look natural?', a: 'Yes — our DSD process matches shape, shade and translucency to your face.' },
      { q: 'How long do veneers last?', a: 'Premium porcelain veneers last 12–15+ years with normal care.' },
    ],
  },
  {
    slug: 'emergency-dental-care',
    title: 'Emergency Dental Care',
    short: '24×7 emergency line for trauma, swelling and severe pain.',
    icon: 'emergency',
    color: 'from-rose-600 to-ink-900',
    accent: 'bg-rose-600',
    hero: 'Dental emergency? We are here for you.',
    description:
      'Same-day appointments for severe toothache, broken teeth, abscess, swelling, accident trauma and lost crowns. Call our emergency line any time.',
    benefits: ['24×7 emergency phone line', 'Same-day appointments', 'Pain relief in 30 minutes', 'Accident & trauma care', 'Insurance assistance'],
    faqs: [
      { q: 'What counts as a dental emergency?', a: 'Severe pain, swelling, bleeding, knocked-out tooth, broken crown, lost filling or trauma.' },
      { q: 'What should I do first?', a: 'Call our emergency line — we will guide you through first aid and book you in immediately.' },
    ],
  },
];

export function findService(slug) {
  return services.find((s) => s.slug === slug);
}
