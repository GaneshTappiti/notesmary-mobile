
-- Add email_domain column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email_domain TEXT;

-- Update the handle_new_user function to include email_domain
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, email_domain)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'email_domain'
  );
  RETURN NEW;
END;
$function$;
