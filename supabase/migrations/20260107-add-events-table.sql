-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  cta TEXT,
  image_url TEXT,
  location TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Allow public to SELECT events (for listing on homepage)
CREATE POLICY "Events are publicly readable"
  ON public.events
  FOR SELECT
  USING (true);

-- Only admins can modify events
CREATE POLICY "Only admins can modify events"
  ON public.events
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users WHERE email = current_setting('app.current_admin_email', true)
    )
  );

-- Sample events
INSERT INTO public.events (name, description, date, cta, image_url, location, featured) VALUES
('Summer Music Festival', 'Annual outdoor music festival', '2026-07-18', 'https://buytickets.example.com/summer-2026', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop', 'City Park', true),
('Fundraiser Gala', 'Charity gala event', '2026-05-22', 'https://tickets.example.com/gala-2026', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop', 'Grand Hotel', false);
