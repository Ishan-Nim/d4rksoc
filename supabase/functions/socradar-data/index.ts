import { corsHeaders } from "@shared/constants.ts";

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // For now, return mock data since we don't have actual API access
    // In a real implementation, you would make API calls to SOCRadar here
    const mockData = {
      incidents: {
        count: 0,
        today: 0,
      },
      employees: {
        count: 0,
        passwordReuse: 0,
      },
      darkWeb: {
        count: 0,
        thisWeek: 0,
      },
      domains: {
        count: 0,
        atRisk: 0,
      },
    };

    return new Response(JSON.stringify(mockData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing request:", error);

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
