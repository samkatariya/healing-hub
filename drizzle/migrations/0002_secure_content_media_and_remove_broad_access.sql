DROP POLICY "Authenticated staff manage categories" ON public.categories;
DROP POLICY "Authenticated staff manage articles" ON public.articles;
DROP POLICY "Authenticated staff manage services" ON public.services;
DROP POLICY "Authenticated staff manage programs" ON public.programs;
DROP POLICY "Authenticated staff manage faqs" ON public.faqs;
DROP POLICY "Authenticated staff manage testimonials" ON public.testimonials;
DROP POLICY "Authenticated staff manage site settings" ON public.site_settings;

CREATE POLICY "Admins can read content media" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'content-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can upload content media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'content-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update content media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'content-media' AND public.has_role(auth.uid(), 'admin')) WITH CHECK (bucket_id = 'content-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete content media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'content-media' AND public.has_role(auth.uid(), 'admin'));