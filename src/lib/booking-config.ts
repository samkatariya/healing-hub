// Booking flow + wellness services configuration.
// Specialist lists per segment are placeholders until the final list is confirmed.

export type SegmentId = "child" | "adult" | "couple" | "senior" | "sports" | "corporate";

export type Segment = {
  id: SegmentId;
  label: string;
  hint: string;
  specialists: string[];
  recommendation?: string;
  allowHomeVisit: boolean;
};

const SENIOR_TIP = "Book your 1st appointment with our senior psychologist for better guidance.";

export const segments: Segment[] = [
  {
    id: "child",
    label: "My child",
    hint: "Kids & teens",
    specialists: ["Psychologist", "Child Therapist", "Speech Therapist", "Occupational Therapist"],
    recommendation: SENIOR_TIP,
    allowHomeVisit: true,
  },
  {
    id: "adult",
    label: "Myself",
    hint: "Adults",
    specialists: ["Psychologist / Psychotherapist", "Counsellor", "Physiotherapist", "Music / Dance Therapist"],
    recommendation: SENIOR_TIP,
    allowHomeVisit: false,
  },
  {
    id: "couple",
    label: "Couple / Family",
    hint: "Relationships",
    specialists: ["Couple Therapist", "Family Therapist", "Psychologist"],
    allowHomeVisit: false,
  },
  {
    id: "senior",
    label: "A senior",
    hint: "Elderly & dementia care",
    specialists: ["Psychologist", "Reminiscence Therapist", "Physiotherapist", "Occupational Therapist"],
    recommendation: SENIOR_TIP,
    allowHomeVisit: true,
  },
  {
    id: "sports",
    label: "Athlete",
    hint: "Sports & performance",
    specialists: ["Sports Psychologist", "Performance Coach", "Physiotherapist"],
    allowHomeVisit: false,
  },
  {
    id: "corporate",
    label: "Organisation",
    hint: "Corporate wellness",
    specialists: ["Corporate Wellness Workshop", "Employee Counselling (EAP)", "Stress Management Program"],
    allowHomeVisit: false,
  },
];

export const NOT_SURE = "Not sure — guide me";

export type VisitMode = "clinic" | "home" | "online";

export const visitModes: { id: VisitMode; label: string; hint: string }[] = [
  { id: "clinic", label: "Clinic / hospital visit", hint: "Meet at one of our Pune centres" },
  { id: "home", label: "Home visit", hint: "Our specialist comes to you" },
  { id: "online", label: "Online consultation", hint: "Video call from anywhere" },
];

export const wellnessServices = [
  { title: "Psychotherapy", forWhom: "Adults, teens, couples", how: "Talk-based sessions to understand emotions, stress and patterns, and build healthier ways to cope." },
  { title: "Occupational Therapy", forWhom: "Children & seniors", how: "Play and activity-based work on daily skills, focus, sensory needs and independence." },
  { title: "Physiotherapy", forWhom: "Seniors, athletes, adults", how: "Guided movement and exercise to restore strength, mobility and comfort." },
  { title: "Speech Therapy", forWhom: "Children & adults", how: "Structured exercises for speech clarity, language, communication and swallowing." },
  { title: "Music Therapy", forWhom: "All ages", how: "Listening, rhythm and making music to express feelings and calm the mind." },
  { title: "Dance & Movement Therapy", forWhom: "Children & adults", how: "Body movement used to release tension, build confidence and connect emotions." },
  { title: "Expressive Art Therapy", forWhom: "Children & adults", how: "Drawing, painting and craft as a gentle way to say what is hard to put into words." },
  { title: "Assessments", forWhom: "Children & adults", how: "Standardised evaluations (ADHD, autism, learning, IQ) that guide the right plan." },
];
