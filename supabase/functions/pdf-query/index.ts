
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

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
    // Check required environment variables
    if (!OPENAI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required environment variables");
    }

    // Parse request body
    const body = await req.json();
    const { question, noteIds, userId } = body;
    
    if (!question || !userId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Log the query
    console.log(`PDF Query from user ${userId}, question: "${question}"`);
    
    // In a real implementation, we would:
    // 1. Generate an embedding for the question
    // 2. Query the vector database for similar chunks
    // 3. Create a prompt with the context chunks and the question
    // 4. Send the prompt to OpenAI
    // 5. Return the answer
    
    // Get the note details for the requested noteIds
    let notes;
    if (noteIds && noteIds.length > 0) {
      const { data: notesData, error: notesError } = await supabase
        .from("notes")
        .select("id, title, content")
        .in("id", noteIds)
        .eq("user_id", userId);
        
      if (notesError) {
        throw notesError;
      }
      
      notes = notesData;
    } else {
      // Get all notes for the user if no specific noteIds provided
      const { data: notesData, error: notesError } = await supabase
        .from("notes")
        .select("id, title, content")
        .eq("user_id", userId)
        .limit(5); // Limit to 5 notes for performance
        
      if (notesError) {
        throw notesError;
      }
      
      notes = notesData;
    }
    
    if (!notes || notes.length === 0) {
      return new Response(JSON.stringify({ 
        answer: "I couldn't find any PDFs to answer your question. Please upload some PDFs first.",
        sources: []
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // For the demo, we'll simulate a PDF query with OpenAI
    // In a real implementation, we would look up the similar chunks in our vector database
    // and then use OpenAI to generate an answer based on those chunks
    
    // Create context from available notes
    const context = notes.map(note => `
      Title: ${note.title}
      Content: ${note.content || "This PDF was uploaded but content is not available for searching."}
    `).join("\n\n");
    
    // Send to OpenAI for answer generation
    const prompt = `
      You are a helpful academic assistant that answers questions based on the PDF content provided.
      Answer the following question using only the information in the PDF content below.
      If the answer cannot be found in the content, say "I couldn't find information about this in your PDFs."
      
      PDF CONTENT:
      ${context}
      
      QUESTION: ${question}
      
      Provide a comprehensive and accurate answer. Include relevant details from the PDFs when possible.
    `;
    
    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    const answer = data.choices[0].message.content;
    
    // For the demo, we'll create sample sources from the notes
    const sources = notes.slice(0, 3).map(note => ({
      title: note.title,
      content: note.content?.substring(0, 200) + "..." || "Content preview not available"
    }));
    
    // Calculate approximate tokens used
    const promptTokens = Math.ceil(prompt.length / 4);
    const completionTokens = Math.ceil(answer.length / 4);
    const totalTokens = promptTokens + completionTokens;
    
    return new Response(JSON.stringify({ 
      answer, 
      sources, 
      tokensUsed: totalTokens 
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error querying PDFs:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process PDF query" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
