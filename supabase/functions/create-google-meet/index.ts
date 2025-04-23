
// Follow this setup guide to integrate the Deno runtime and know the benefits:
// https://deno.land/manual/getting_started/setup_your_environment
// This is using v1.31.7 of the Deno CLI. The Deno.env ES module includes require for getting env vars.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create Google Calendar API wrapper
const createGoogleCalendarEvent = async (
  apiKey: string, // API key for accessing Google Calendar API
  summary: string, 
  description: string
): Promise<string> => {
  // MOCK: In a real implementation, we would use the Google Calendar API
  // This is a mock implementation that simulates the API call
  
  // Generate a random Google Meet link for demo purposes
  const randomId = Math.random().toString(36).substring(2, 15);
  const meetLink = `https://meet.google.com/${randomId}`;
  
  console.log(`Created mock Google Meet link: ${meetLink}`);
  
  return meetLink;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get request body
    const { roomId, userId, summary, description } = await req.json();
    
    // Validate required fields
    if (!roomId || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // In a real implementation, we would fetch the Google API key from env vars
    // Since this is a mock implementation, we'll use a placeholder
    const googleApiKey = 'GOOGLE_API_KEY';
    
    // Create Google Calendar event with Meet link
    const meetLink = await createGoogleCalendarEvent(
      googleApiKey,
      summary || 'Study Room Session',
      description || 'A collaborative study session'
    );
    
    // Return success response with Meet link
    return new Response(
      JSON.stringify({ 
        success: true, 
        meetLink,
        roomId,
        userId
      }),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error creating Google Meet:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
})

// To invoke:
// curl -i --location --request POST 'https://zsiwyvbiwyppkftcaeph.functions.supabase.co/create-google-meet' \
//   --header 'Content-Type: application/json' \
//   --data '{"roomId":"123", "userId":"456", "summary":"Study Session", "description":"Study together"}'
