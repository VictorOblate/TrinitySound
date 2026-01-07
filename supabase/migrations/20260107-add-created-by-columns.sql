-- Add created_by column to portfolio_items and events, referencing admin_users
ALTER TABLE public.portfolio_items
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES public.admin_users(id) DEFAULT NULL;

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES public.admin_users(id) DEFAULT NULL;

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_portfolio_items_created_by ON public.portfolio_items(created_by);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON public.events(created_by);
