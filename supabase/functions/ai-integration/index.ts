
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

async function fetchFromOpenAI(prompt: string, model: string = "gpt-3.5-turbo") {
  const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
  
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    
    // Extract the request data
    const { requestType, prompt, content, userId } = body;
    
    if (!requestType || !prompt || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: requestType, prompt, and userId are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let result;
    let enhancedPrompt = prompt;
    
    // If content is provided (e.g., from uploaded notes), include it in the prompt
    if (content) {
      enhancedPrompt = `Context information from notes: ${content}\n\nQuery: ${prompt}`;
    }
    
    switch (requestType) {
      case "generate-answer":
        result = await fetchFromOpenAI(enhancedPrompt);
        break;
      
      case "generate-questions":
        const questionsPrompt = `Based on the following content, generate assessment questions of different levels:\n
${content}\n\nGenerate 3 easy questions (2 marks each), 2 medium questions (5 marks each), and 1 difficult question (10 marks). Format them as JSON with question text, difficulty level, and mark value.`;
        result = await fetchFromOpenAI(questionsPrompt);
        break;
      
      case "youtube-summary":
        const youtubePrompt = `Summarize the key points from this video content: ${prompt}. Provide a concise summary with main takeaways and insights.`;
        result = await fetchFromOpenAI(youtubePrompt);
        break;

      default:
        return new Response(
          JSON.stringify({ error: "Invalid requestType. Supported types: generate-answer, generate-questions, youtube-summary" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
    }

    // Log the request to the database
    const { data, error } = await supabaseAdmin.from("ai_requests").insert({
      user_id: userId,
      request_type: requestType,
      input: { prompt, content: content ? "content provided" : "no content" },
      output: { result },
      tokens_used: result.length, // A rough estimation of tokens used
    });

    if (error) {
      console.error("Error logging AI request:", error);
    }

    return new Response(
      JSON.stringify({ result }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing AI request:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process AI request" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
