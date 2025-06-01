import { corsHeaders } from "@shared/constants.ts";

// Generate realistic mock data for leaked emails
const generateMockLeakedEmails = () => {
  const domains = ["example.com", "acme.org", "company.net", "enterprise.co"];
  const names = [
    "john",
    "jane",
    "robert",
    "sarah",
    "michael",
    "emma",
    "david",
    "olivia",
  ];
  const sources = [
    "Collection #1",
    "LinkedIn Breach",
    "Adobe Breach",
    "Dropbox Leak",
    "Yahoo Breach",
  ];
  const employees = [
    "Marketing",
    "Engineering",
    "Sales",
    "Executive",
    "HR",
    "Finance",
  ];
  const severities = ["High", "Medium", "Low"];
  const statuses = ["New", "Investigating", "Resolved"];

  const mockLeaks = [];

  // Generate 50 mock leaked email records
  for (let i = 0; i < 50; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const email = `${name}.${Math.floor(Math.random() * 100)}@${domain}`;

    // Generate random dates within the last 30 days
    const breachDate = new Date();
    breachDate.setDate(breachDate.getDate() - Math.floor(Math.random() * 90));

    const discoveryDate = new Date(breachDate);
    discoveryDate.setDate(
      breachDate.getDate() + Math.floor(Math.random() * 30),
    );

    mockLeaks.push({
      email,
      discoveryDate: discoveryDate.toISOString().split("T")[0],
      breachDate: breachDate.toISOString().split("T")[0],
      password: "********",
      source: sources[Math.floor(Math.random() * sources.length)],
      employee: `${employees[Math.floor(Math.random() * employees.length)]} Team`,
      severity: severities[Math.floor(Math.random() * severities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }

  return mockLeaks;
};

// All mock leaked emails (generated once when the function is loaded)
const allMockLeakedEmails = generateMockLeakedEmails();

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { apiKey, filters } = await req.json();

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    console.log("Processing leaked emails request with filters:", filters);

    // Apply filters to the mock data
    let filteredLeaks = [...allMockLeakedEmails];

    if (filters) {
      // Filter by status if specified
      if (filters.status && filters.status !== "All Status") {
        filteredLeaks = filteredLeaks.filter(
          (leak) => leak.status === filters.status,
        );
      }

      // Filter by severity if specified
      if (filters.severity && filters.severity !== "All Severity") {
        filteredLeaks = filteredLeaks.filter(
          (leak) => leak.severity === filters.severity,
        );
      }

      // Filter by search query if specified
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredLeaks = filteredLeaks.filter(
          (leak) =>
            leak.email.toLowerCase().includes(searchLower) ||
            leak.source.toLowerCase().includes(searchLower) ||
            leak.employee.toLowerCase().includes(searchLower),
        );
      }
    }

    const response = {
      leaks: filteredLeaks,
      totalCount: allMockLeakedEmails.length,
    };

    console.log(
      `Returning ${filteredLeaks.length} leaked emails out of ${allMockLeakedEmails.length} total`,
    );

    return new Response(JSON.stringify(response), {
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
