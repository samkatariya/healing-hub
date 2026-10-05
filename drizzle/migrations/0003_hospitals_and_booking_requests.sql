CREATE TABLE IF NOT EXISTS "hospitals" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "slug" text NOT NULL UNIQUE,
  "name" text NOT NULL,
  "area" text NOT NULL DEFAULT '',
  "address" text NOT NULL DEFAULT '',
  "phone" text NOT NULL DEFAULT '',
  "timings" text NOT NULL DEFAULT '',
  "map_query" text NOT NULL DEFAULT '',
  "services" text NOT NULL DEFAULT '',
  "active" boolean NOT NULL DEFAULT true,
  "sort_order" integer NOT NULL DEFAULT 0,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booking_requests" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "segment" text NOT NULL,
  "specialist" text NOT NULL,
  "visit_mode" text NOT NULL,
  "hospital_slug" text,
  "name" text NOT NULL,
  "phone" text NOT NULL,
  "area" text,
  "preferred_time" text,
  "notes" text,
  "status" text NOT NULL DEFAULT 'new',
  "created_at" timestamp NOT NULL DEFAULT now()
);
--> statement-breakpoint
INSERT INTO "hospitals" ("slug","name","area","address","phone","timings","map_query","services","sort_order") VALUES
('onp-prime','ONP Prime Hospital','Shivajinagar, Pune','ONP Prime Hospital, Shivajinagar, Pune','+91 91580 11716','Mon–Sat, 10:00 AM – 6:00 PM (by appointment)','ONP Prime Hospital Shivajinagar, Pune','Psychotherapy, Child & Adolescent Support, Specialised Therapies, Assessments',0),
('onp-lila','ONP Lila Hospital','Pimple Saudagar, Pune','ONP Lila Hospital, Pimple Saudagar, Pune','+91 91580 11716','Mon–Sat, 10:00 AM – 6:00 PM (by appointment)','ONP Lila Hospital Pimple Saudagar, Pune','Adult Counselling, Child Therapy, Family Support, Speech & OT',1),
('sunmed','Sunmed Hospital','Bhumkar Chowk, Wakad, Pune','Sunmed Hospital, Bhumkar Chowk, Wakad, Pune','+91 91580 11716','Mon–Sat, 10:00 AM – 6:00 PM (by appointment)','Sunmed Hospital Bhumkar Chowk, Wakad, Pune','Adult Support, Adolescent Care, Psychological Screening',2),
('universal','Universal Hospital','Kasba Peth, Pune','Universal Hospital, Kasba Peth, Pune','+91 91580 11716','Mon–Sat, 10:00 AM – 6:00 PM (by appointment)','Universal Hospital Kasba Peth, Pune','Psychotherapy, Senior Citizen & Dementia Care, Therapies',3),
('rao-nursing-home','Rao Nursing Home','Satara Road, near City Pride, Swargate, Pune','Rao Nursing Home, Satara Road, near City Pride, Swargate, Pune','+91 91580 11716','Mon–Sat, 10:00 AM – 6:00 PM (by appointment)','Rao Nursing Home Satara Road, near City Pride, Swargate, Pune','Adult & Couple Support, Reminiscence Therapy, Clinical Support',4),
('lopmudra-meera','Lopmudra Meera Hospital','Swargate, Pune','Lopmudra Meera Hospital, Swargate, Pune','+91 91580 11716','Mon–Sat, 10:00 AM – 6:00 PM (by appointment)','Lopmudra Meera Hospital Swargate, Pune','Psychotherapy, Couple & Family Support, Assessments',5),
('lopmudra-bavdhan','Lopmudra Hospital','Bavdhan, Pune','Lopmudra Hospital, Bavdhan, Pune','+91 91580 11716','Mon–Sat, 10:00 AM – 6:00 PM (by appointment)','Lopmudra Hospital Bavdhan, Pune','Individual Therapy, Child Support, Sports Psychology',6),
('lopmudra-pashan','Lopmudra Hospital','Pashan, Pune','Lopmudra Hospital, Pashan, Pune','+91 91580 11716','Mon–Sat, 10:00 AM – 6:00 PM (by appointment)','Lopmudra Hospital Pashan, Pune','Adult Support, Specialised Therapies, Assessments',7)
ON CONFLICT ("slug") DO NOTHING;
