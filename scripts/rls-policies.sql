-- Enable RLS on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
-- Users can only see and update their own profile
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- RLS Policies for bookings table
-- Users can only see their own bookings
CREATE POLICY "Users can view their own bookings" ON bookings
    FOR SELECT USING (auth.uid()::text = user_id::text);

-- Users can only create bookings for themselves
CREATE POLICY "Users can create their own bookings" ON bookings
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Users can update their own bookings
CREATE POLICY "Users can update their own bookings" ON bookings
    FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Users can delete their own bookings
CREATE POLICY "Users can delete their own bookings" ON bookings
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- RLS Policies for contact_submissions
-- Allow anyone to insert contact submissions
CREATE POLICY "Anyone can submit contact forms" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- Only admins can view contact submissions (you can modify this as needed)
CREATE POLICY "Admins can view contact submissions" ON contact_submissions
    FOR SELECT USING (false); -- Change this to your admin logic

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON users TO authenticated;
GRANT ALL ON bookings TO authenticated;
GRANT INSERT ON contact_submissions TO anon, authenticated;
GRANT ALL ON contact_submissions TO authenticated;
