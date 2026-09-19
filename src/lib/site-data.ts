import journalCare from "@/assets/journal-care.jpg";
import journalGraphology from "@/assets/journal-graphology.jpg";
import journalReflection from "@/assets/journal-reflection.jpg";

export const contact = {
  phone: "+919158011716",
  phoneDisplay: "+91 91580 11716",
  whatsapp: "https://wa.me/919158011716?text=Hello%20Healing%20Emotions%2C%20I%27d%20like%20to%20know%20more.",
  email: "healingemotions.co@gmail.com",
};

export const articleImages: Record<string, string> = {
  "notice-emotional-overload": journalCare,
  "boundaries-without-guilt": journalGraphology,
  "burnout-is-not-a-badge": journalReflection,
};

export const locations = [
  "Karve Nagar, Pune",
  "Sinhagad Road, Pune",
  "FC Road, Pune",
  "Pimpri-Chinchwad",
  "Ahilyanagar",
];

export const fallbackServices = [
  { title: "Individual Therapy", summary: "A private space to understand emotions, patterns, and meaningful change." },
  { title: "Couple & Family Therapy", summary: "Guided conversations for relationships navigating conflict or disconnection." },
  { title: "Child Support & Assessments", summary: "Thoughtful support for emotional, behavioural, learning, and attention concerns." },
  { title: "Life & Performance Coaching", summary: "Goal-focused support for direction, resilience, and sustainable progress." },
  { title: "Corporate Wellness", summary: "Human-centred workshops for healthier teams and leadership wellbeing." },
  { title: "Graphology", summary: "Handwriting analysis used as a reflective tool for exploring personality patterns." },
];