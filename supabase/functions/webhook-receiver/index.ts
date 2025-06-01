import { corsHeaders } from "@shared/constants.ts";

// Store received webhooks in memory for demo purposes
const receivedWebhooks: any[] = [];

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Parse the webhook payload
    const payload = await req.json();
    console.log("Received webhook payload:", payload);

    // Add timestamp to the webhook
    const webhookWithTimestamp = {
      ...payload,
      receivedAt: new Date().toISOString(),
    };

    // Store the webhook (in a real app, you'd save to a database)
    receivedWebhooks.push(webhookWithTimestamp);

    // Keep only the last 100 webhooks for demo purposes
    if (receivedWebhooks.length > 100) {
      receivedWebhooks.shift();
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Webhook received successfully",
        webhookId: `wh_${Math.random().toString(36).substring(2, 15)}`,
        totalReceived: receivedWebhooks.length,
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
