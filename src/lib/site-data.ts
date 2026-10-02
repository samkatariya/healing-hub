import journalCare from "@/assets/journal-care.jpg";
import journalGraphology from "@/assets/journal-graphology.jpg";
import journalReflection from "@/assets/journal-reflection.jpg";

export const contact = {
  phone: "+919158011716",
  phoneDisplay: "+91 91580 11716",
  whatsapp: "https://wa.me/919158011716?text=Hello%20Healing%20Emotions%2C%20I%27d%20like%20to%20book%20a%20session.",
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
}

export const hospitalLocations: HospitalLocation[] = [
  {
    id: "onp-prime",
    name: "ONP Prime Hospital",
    area: "Shivajinagar, Pune",
    phone: "+91 91580 11716",
    mapsUrl: "https://maps.google.com/?q=ONP+Prime+Hospital+Shivajinagar+Pune",
    services: ["Psychotherapy", "Child & Adolescent Support", "Specialised Therapies", "Assessments"],
  },
  {
    id: "onp-lila",
    name: "ONP Lila Hospital",
    area: "Pimpri-Saudagar, Pune",
    phone: "+91 91580 11716",
    mapsUrl: "https://maps.google.com/?q=ONP+Lila+Hospital+Pimpri+Pune",
    services: ["Adult Counselling", "Child Therapy", "Family Support", "Speech & OT"],
  },
  {
    id: "sunmed",
    name: "Sunmed Hospital",
    area: "Bhumkar Chowk, Wakad, Pune",
    phone: "+91 91580 11716",
    mapsUrl: "https://maps.google.com/?q=Sunmed+Hospital+Bhumkar+Chowk+Wakad+Pune",
    services: ["Adult Support", "Adolescent Care", "Psychological Screening"],
  },
  {
    id: "universal",
    name: "Universal Hospital",
    area: "Kasba Peth, Pune",
    phone: "+91 91580 11716",
    mapsUrl: "https://maps.google.com/?q=Universal+Hospital+Kasba+Peth+Pune",
    services: ["Psychotherapy", "Senior Citizen & Dementia Care", "Therapies"],
  },
  {
    id: "rao-nursing-home",
    name: "Rao Nursing Home",
    area: "Satara Road, near City Pride, Swargate, Pune",
    phone: "+91 91580 11716",
    mapsUrl: "https://maps.google.com/?q=Rao+Nursing+Home+Satara+Road+Swargate+Pune",
    services: ["Adult & Couple Support", "Reminiscence Therapy", "Clinical Support"],
  },
  {
    id: "lopmudra-meera",
    name: "Lopmudra Meera Hospital",
    area: "Swargate, Pune",
    phone: "+91 91580 11716",
    mapsUrl: "https://maps.google.com/?q=Lopmudra+Meera+Hospital+Swargate+Pune",
    services: ["Psychotherapy", "Couple & Family Support", "Assessments"],
  },
  {
    id: "lopmudra-bavdhan",
    name: "Lopmudra Hospital",
    area: "Bavdhan, Pune",
    phone: "+91 91580 11716",
    mapsUrl: "https://maps.google.com/?q=Lopmudra+Hospital+Bavdhan+Pune",
    services: ["Individual Therapy", "Child Support", "Sports Psychology"],
  },
  {
    id: "lopmudra-pashan",
    name: "Lopmudra Hospital",
    area: "Pashan, Pune",
    phone: "+91 91580 11716",
    mapsUrl: "https://maps.google.com/?q=Lopmudra+Hospital+Pashan+Pune",
    services: ["Adult Support", "Specialised Therapies", "Assessments"],
  },
];

export const feeDetails = {
  consultation: [
    { title: "Individual / Adult", fee: "₹2,000", note: "Standard 50-minute clinical or counselling session" },
    { title: "Child & Adolescent", fee: "₹2,000", note: "Developmental, behavioural or emotional guidance" },
    { title: "Couple & Family", fee: "₹3,500", note: "Structured relationship and joint consultation" },
    { title: "Follow-up Session", fee: "₹2,000", note: "Ongoing therapy and review consultations" },
    { title: "Quick Discovery Call (15 mins)", fee: "₹500", note: "Brief exploratory guidance to clarify the best approach" },
  ],
  assessments: [
    { title: "Adult Psychological Screening", fee: "₹2,500", note: "Standardized mental health and wellbeing screening" },
    { title: "Child Autism / ADHD / Learning Assessment", fee: "₹3,000", note: "Comprehensive developmental and educational evaluation" },
  ],
  assessmentNote: "Assessment fees vary according to the specific protocol and diagnostic battery required.",
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