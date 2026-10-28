import journalCare from "@/assets/journal-care.jpg";
import journalGraphology from "@/assets/journal-graphology.jpg";
import journalReflection from "@/assets/journal-reflection.jpg";

export const contact = {
  phone: "+919168611716",
  phoneDisplay: "+91 91686 11716",
  whatsapp: "https://wa.me/919168611716?text=Hello%20Healing%20Emotions%2C%20I%27d%20like%20to%20book%20a%20session.",
  email: "healingemotions.co@gmail.com",
};

export const articleImages: Record<string, string> = {
  "notice-emotional-overload": journalCare,
  "boundaries-without-guilt": journalGraphology,
  "burnout-is-not-a-badge": journalReflection,
};

export interface HospitalLocation {
  id: string;
  name: string;
  area: string;
  phone: string;
  mapsUrl: string;
  services: string[];
  address?: string;
  timings?: string;
}

/** Placeholder until each hospital's confirmed visiting hours are provided. */
export const DEFAULT_TIMINGS = "Mon–Sat, 10:00 AM – 6:00 PM (by appointment)";

export const HOSPITAL_PRIVACY_REASSURANCE =
  "Your sessions take place in private hospital rooms, and nothing you share is disclosed outside your care.";

export interface TestimonialItem {
  id: string;
  quote: string;
  attribution: string;
  context?: string;
}

export const placeholderTestimonials: TestimonialItem[] = [
  {
    id: "testimonial-1",
    quote:
      "I nearly didn’t message. I kept telling myself my problems weren’t big enough to bother anyone. The reply was warm and ordinary, nothing dramatic, and that made it easier to just go for the first session.",
    attribution: "Adult client",
  },
  {
    id: "testimonial-2",
    quote:
      "My son had started refusing school and mornings were awful for all of us. Nobody made us feel like bad parents. It took a few weeks, but he is calmer now, and so are we.",
    attribution: "Parent of a school child",
  },
  {
    id: "testimonial-3",
    quote:
      "We still argue sometimes, but differently now. We actually let each other finish a sentence. I came in expecting someone to pick a side, and they never did.",
    attribution: "Couple sessions",
  },
  {
    id: "testimonial-4",
    quote:
      "My mother keeps forgetting things and I didn’t know how to talk to her without losing my patience. The session was gentle, and it was in Marathi so she could follow along. I came out feeling less alone.",
    attribution: "Daughter of an older family member",
  },
  {
    id: "testimonial-5",
    quote:
      "I play cricket at district level and the pressure before matches was getting to me. Learning to slow down and reset between overs sounds simple, but it works for me.",
    attribution: "Young athlete",
  },
  {
    id: "testimonial-6",
    quote:
      "My daughter was nervous about coming, and the therapist let her draw for the first ten minutes. By the third visit she was asking when we were going again.",
    attribution: "Parent of a young child",
  },
  {
    id: "testimonial-7",
    quote:
      "I liked that the fees were written clearly before I even messaged. One less thing to worry about.",
    attribution: "Adult client",
  },
];

/** Replace with the real online booking page (e.g. Calendly) when available. */
export const ONLINE_BOOKING_URL = "";


export const hospitalLocations: HospitalLocation[] = [
  {
    id: "onp-prime",
    name: "ONP Prime Hospital",
    area: "Shivajinagar, Pune",
    phone: "+91 91686 11716",
    mapsUrl: "https://maps.google.com/?q=ONP+Prime+Hospital+Shivajinagar+Pune",
    services: ["Psychotherapy", "Child & Adolescent Support", "Specialised Therapies", "Assessments"],
  },
  {
    id: "onp-lila",
    name: "ONP Lila Hospital",
    area: "Pimple Saudagar, Pune",
    phone: "+91 91686 11716",
    mapsUrl: "https://maps.google.com/?q=ONP+Lila+Hospital+Pimple+Saudagar+Pune",
    services: ["Adult Counselling", "Child Therapy", "Family Support", "Speech & OT"],
  },
  {
    id: "sunmed",
    name: "Sunmed Hospital",
    area: "Bhumkar Chowk, Wakad, Pune",
    phone: "+91 91686 11716",
    mapsUrl: "https://maps.google.com/?q=Sunmed+Hospital+Bhumkar+Chowk+Wakad+Pune",
    services: ["Adult Support", "Adolescent Care", "Psychological Screening"],
  },
  {
    id: "universal",
    name: "Universal Hospital",
    area: "Kasba Peth, Pune",
    phone: "+91 91686 11716",
    mapsUrl: "https://maps.google.com/?q=Universal+Hospital+Kasba+Peth+Pune",
    services: ["Psychotherapy", "Senior Citizen & Dementia Care", "Therapies"],
  },
  {
    id: "rao-nursing-home",
    name: "Rao Nursing Home",
    area: "Satara Road, near City Pride, Swargate, Pune",
    phone: "+91 91686 11716",
    mapsUrl: "https://maps.google.com/?q=Rao+Nursing+Home+Satara+Road+Swargate+Pune",
    services: ["Adult & Couple Support", "Reminiscence Therapy", "Clinical Support"],
  },
  {
    id: "lopmudra-meera",
    name: "Lopmudra Meera Hospital",
    area: "Swargate, Pune",
    phone: "+91 91686 11716",
    mapsUrl: "https://maps.google.com/?q=Lopmudra+Meera+Hospital+Swargate+Pune",
    services: ["Psychotherapy", "Couple & Family Support", "Assessments"],
  },
  {
    id: "lopmudra-bavdhan",
    name: "Lopmudra Hospital",
    area: "Bavdhan, Pune",
    phone: "+91 91686 11716",
    mapsUrl: "https://maps.google.com/?q=Lopmudra+Hospital+Bavdhan+Pune",
    services: ["Individual Therapy", "Child Support", "Sports Psychology"],
  },
  {
    id: "lopmudra-pashan",
    name: "Lopmudra Hospital",
    area: "Pashan, Pune",
    phone: "+91 91686 11716",
    mapsUrl: "https://maps.google.com/?q=Lopmudra+Hospital+Pashan+Pune",
    services: ["Adult Support", "Specialised Therapies", "Assessments"],
  },
];

export const feeDetails = {
  consultation: [
    {
      title: "Individual Session",
      duration: "50 mins",
      fee: "₹2,000",
      onlineFee: "₹1,500",
      modes: "Hospital · Home · Online",
      note: "Standard 50-minute psychotherapy or counselling session for adults, adolescents, or personal therapy.",
    },
  ],
  assessments: [
    {
      title: "IQ Assessment",
      duration: "Standardized Battery",
      note: "Standardised cognitive, intellectual, and aptitude evaluation with comprehensive profiling and formal reporting.",
    },
    {
      title: "EQ Assessment",
      duration: "Standardized Battery",
      note: "Standardised assessment of emotional quotient, emotional regulation, interpersonal functioning, and personality dynamics.",
    },
  ],
  assessmentNote: "Charges may vary based on site. Every assessment includes one session with the psychologist.",
  onlineNote: "Save 25% on online sessions (₹1,500). Charges may vary based on site.",
  policies: [
    {
      title: "Advance Payment Required",
      description: "All consultation, therapy, and assessment fees must be paid in full in advance to confirm and secure your scheduled appointment slot.",
    },
    {
      title: "By Appointment Only (No Walk-Ins)",
      description: "To maintain client privacy, clinical sanctity, and zero waiting room crowding, walk-in consultations are strictly not accepted. Every session must be scheduled prior to visiting.",
    },
    {
      title: "Cancellation & No-Show Policy",
      description: "Therapists reserve dedicated time blocks exclusively for you. Sessions are strictly non-refundable for last-minute cancellations or no-shows without advance notice. Please provide timely advance notice if you need to reschedule.",
    },
  ],
};

export const fallbackServices = [
  {
    title: "Individual & Adult Support",
    slug: "individual-adult-support",
    summary: "Psychotherapy, counselling and emotional wellness support.",
    body: "Support for anxiety, depression, stress, life transitions, emotional overwhelm, and personal growth with tailored therapeutic approaches.",
  },
  {
    title: "Child & Adolescent Support",
    slug: "child-adolescent-support",
    summary: "Child therapy and developmental support.",
    body: "Compassionate guidance for emotional regulation, behavioural concerns, ADHD, academic stress, social skills, and family dynamics.",
  },
  {
    title: "Couple & Family Support",
    slug: "couple-family-support",
    summary: "Guided conversations for relationships navigating conflict or disconnection.",
    body: "Safe, neutral mediation and therapeutic counselling to rebuild trust, improve communication, and address family crises.",
  },
  {
    title: "Senior Citizen & Dementia Support",
    slug: "senior-citizen-dementia-support",
    summary: "Including reminiscence and supportive therapeutic approaches.",
    body: "Gentle emotional care, cognitive stimulation, memory care support, and guidance for family caregivers.",
  },
  {
    title: "Sports & Performance Psychology",
    slug: "sports-performance-psychology",
    summary: "Mental conditioning, focus, and resilience for athletes and performers.",
    body: "Handling competition anxiety, building mental toughness, recovery support, and peak performance habits.",
  },
  {
    title: "Assessments",
    slug: "assessments",
    summary: "Standardised emotional, developmental, and psychological evaluations.",
    body: "Adult screening, ADHD, Autism, learning disabilities, personality profiling, and cognitive testing.",
  },
  {
    title: "Specialised Therapies",
    slug: "specialised-therapies",
    summary: "Speech, Occupational, Art, Music, Dance & Movement, and Reminiscence therapies.",
    body: "Holistic allied therapeutic disciplines working together under one roof for complete mind-body recovery.",
  },
];

export const specialisedTherapiesList = [
  "Speech Therapy",
  "Occupational Therapy",
  "Art Therapy",
  "Music Therapy",
  "Dance & Movement Therapy",
  "Reminiscence Therapy",
];

export const whatBringsYouHereOptions = [
  {
    id: "myself",
    title: "I need support for myself",
    lead: "Adult Support",
    desc: "Psychotherapy, anxiety, depression, burnout, life decisions, emotional balance.",
    route: "/services#individual-adult-support",
    supportType: "Adult Support",
    category: "Myself",
  },
  {
    id: "child",
    title: "I need support for my child",
    lead: "Child & Adolescent Support",
    desc: "Behavioural concerns, developmental support, school anxiety, ADHD, attention.",
    route: "/services#child-adolescent-support",
    supportType: "Child & Adolescent Support",
    category: "My Child",
  },
  {
    id: "relationship",
    title: "I need support for my relationship/family",
    lead: "Couple & Family Support",
    desc: "Communication breakdown, conflict resolution, separation, family harmony.",
    route: "/services#couple-family-support",
    supportType: "Couple & Family Support",
    category: "Couple",
  },
  {
    id: "senior",
    title: "I need support for a senior citizen",
    lead: "Senior Citizen / Dementia Support",
    desc: "Memory care, cognitive stimulation, reminiscence therapy, emotional comfort.",
    route: "/services#senior-citizen-dementia-support",
    supportType: "Senior Citizen & Dementia Support",
    category: "Senior Citizen",
  },
  {
    id: "therapies",
    title: "I am looking for a specific therapy",
    lead: "Therapies & Professionals",
    desc: "Speech, Occupational, Art, Music, Dance & Movement, Reminiscence therapy.",
    route: "/services#specialised-therapies",
    supportType: "Specialised Therapies",
    category: "Specific Therapy",
  },
  {
    id: "sports",
    title: "I need sports/performance support",
    lead: "Sports Psychology",
    desc: "Performance anxiety, focus, tournament mindset, resilience for athletes.",
    route: "/services#sports-performance-psychology",
    supportType: "Sports & Performance Psychology",
    category: "Athlete",
  },
  {
    id: "organization",
    title: "I represent an organisation",
    lead: "For Organizations",
    desc: "Corporate wellness, EAP, psychological workshops, team mental health programs.",
    route: "/programs",
    supportType: "For Organizations",
    category: "Organization",
  },
];

export const professionalsList = [
  {
    name: "Psy. Yash Daga",
    role: "Founder | Psychologist | Psychotherapist",
    specialisation: "Adult Psychotherapy, Sports Psychology, Corporate Wellness",
    locations: "All Healing Emotions Hospitals & Online",
    confirmed: true,
    bio: "Psychologist and psychotherapist dedicated to human-centred, evidence-informed emotional healthcare. Leads the multidisciplinary team across partner hospitals in Pune.",
  },
  {
    name: "Child & Adolescent Therapist",
    role: "Child Therapist",
    specialisation: "Developmental Guidance, Behavioural Therapy, Social Skills",
    locations: "ONP Prime, ONP Lila, Lopmudra Hospitals",
    confirmed: false,
    bio: "Specialised support for children navigating developmental, emotional, and learning milestones in a warm, child-friendly setting.",
  },
  {
    name: "Speech & Language Therapist",
    role: "Speech Therapist",
    specialisation: "Speech Delays, Articulation, Stammering, Social Communication",
    locations: "ONP Prime, ONP Lila, Universal Hospital",
    confirmed: false,
    bio: "Structured, evidence-based speech and language therapy tailored for paediatric and adult rehabilitation.",
  },
  {
    name: "Occupational Therapist",
    role: "Occupational Therapist",
    specialisation: "Sensory Integration, Motor Planning, Daily Living Skills",
    locations: "ONP Lila, Sunmed Hospital, Rao Nursing Home",
    confirmed: false,
    bio: "Empowering children and adults with sensory-motor integration, hand function, and daily independence skills.",
  },
  {
    name: "Expressive Art Therapist",
    role: "Art Therapist",
    specialisation: "Creative Expression, Emotional Processing, Trauma Relief",
    locations: "ONP Prime, Lopmudra Meera, Bavdhan",
    confirmed: false,
    bio: "Gentle non-verbal exploration using visual arts to process complicated feelings when words are not enough.",
  },
  {
    name: "Music Therapist",
    role: "Music Therapist",
    specialisation: "Rhythm & Neurologic Relaxation, Mood Regulation, Stress Relief",
    locations: "Lopmudra Hospitals & Centre",
    confirmed: false,
    bio: "Therapeutic music interventions supporting emotional expression, regulation, and cognitive wellbeing.",
  },
  {
    name: "Dance & Movement Therapist",
    role: "Dance & Movement Therapist",
    specialisation: "Somatic Grounding, Body Awareness, Trauma Release",
    locations: "Partner Studios & Hospital Centers",
    confirmed: false,
    bio: "Integrating somatic movement and bodily awareness for emotional balance and mind-body harmony.",
  },
  {
    name: "Reminiscence Therapist",
    role: "Reminiscence Therapist",
    specialisation: "Dementia Care, Senior Cognitive Comfort, Life Review Therapy",
    locations: "Universal Hospital, Rao Nursing Home",
    confirmed: false,
    bio: "Structured life-review and sensory recall therapy providing deep comfort and dignity for senior citizens.",
  },
];