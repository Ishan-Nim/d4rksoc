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

    console.log("Processing security data request with API key:", apiKey);

    // Enhanced mock data to simulate real API responses
    const mockData = {
      incidents: {
        count: 24,
        today: 5,
      },
      employees: {
        count: 37,
        passwordReuse: 42,
      },
      darkWeb: {
        count: 18,
        thisWeek: 8,
      },
      domains: {
        count: 12,
        atRisk: 3,
      },
    };

    console.log("Returning security data:", mockData);

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
