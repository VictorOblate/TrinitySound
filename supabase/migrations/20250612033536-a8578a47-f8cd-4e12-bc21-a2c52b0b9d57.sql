
-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio_items table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  location TEXT,
  guests TEXT,
  date TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT,
  event_date DATE,
  expected_guests TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert some sample portfolio items
INSERT INTO public.portfolio_items (title, description, category, image_url, location, guests, date, featured) VALUES
('Royal Garden Wedding', 'Elegant wedding ceremony sound setup', 'Weddings', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop', 'Kampala Gardens', '200+', '2024', true),
('Tech Conference 2024', 'Corporate event audio equipment', 'Corporate', 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=400&fit=crop', 'Convention Center', '500+', '2024', false),
('Birthday Celebration', 'DJ setup at birthday party', 'Entertainment', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop', 'Private Venue', '150+', '2024', false),
('Summer Festival', 'Outdoor event sound system', 'Outdoor Events', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop', 'City Park', '1000+', '2024', true),
('Live Music Concert', 'Concert sound equipment', 'Concerts', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop', 'Music Hall', '800+', '2024', false),
('Church Conference', 'Church service audio setup', 'Religious', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop', 'Trinity Church', '300+', '2024', false),
('University Graduation', 'University graduation ceremony', 'Graduations', 'https://images.unsplash.com/photo-1523580846011-d3982bcd500e?w=600&h=400&fit=crop', 'University Hall', '600+', '2024', true),
('Product Launch Event', 'Corporate product launch', 'Corporate', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop', 'Hotel Ballroom', '400+', '2024', false);

-- Insert a default admin user (password: admin123)
INSERT INTO public.admin_users (email, password_hash, name) VALUES
('admin@trinitysound.com', '$2b$10$rBaR3lUlOeHy.DqZ6ZYaNeJ3y7j1qF4qQ5Y5Q7Y5Q7Y5Q7Y5Q7Y5Q', 'Trinity Admin');

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolio_items (publicly readable, admin writable)
CREATE POLICY "Portfolio items are publicly readable" 
  ON public.portfolio_items 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can modify portfolio items" 
  ON public.portfolio_items 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE email = current_setting('app.current_admin_email', true)
    )
  );

-- Create policies for contact_messages (admin only)
CREATE POLICY "Only admins can access contact messages" 
  ON public.contact_messages 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE email = current_setting('app.current_admin_email', true)
    )
  );

-- Create policy for admin_users (admin only)
CREATE POLICY "Only admins can access admin users" 
  ON public.admin_users 
  FOR ALL 
  USING (
    email = current_setting('app.current_admin_email', true)
  );

-- Allow public to insert contact messages
CREATE POLICY "Anyone can submit contact messages" 
  ON public.contact_messages 
  FOR INSERT 
  WITH CHECK (true);
