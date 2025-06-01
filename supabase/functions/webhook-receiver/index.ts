import { corsHeaders } from "@shared/constants.ts";

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Parse the webhook payload
    const payload = await req.json();
    console.log("Received webhook payload:", payload);

    // Process the webhook data
    // Here you would typically store this in your database
    // For now, we'll just log it and return a success response

    return new Response(
      JSON.stringify({
        success: true,
        message: "Webhook received successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error processing webhook:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }
});
