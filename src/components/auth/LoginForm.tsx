import { useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // Add loading state
      const loadingMessage = document.createElement("div");
      loadingMessage.textContent = "Attempting to sign in...";
      loadingMessage.style.position = "fixed";
      loadingMessage.style.bottom = "10px";
      loadingMessage.style.right = "10px";
      loadingMessage.style.background = "black";
      loadingMessage.style.color = "white";
      loadingMessage.style.padding = "10px";
      loadingMessage.style.borderRadius = "5px";
      loadingMessage.style.zIndex = "9999";
      document.body.appendChild(loadingMessage);

      console.log("Attempting login with:", {
        email,
        url: window.location.href,
      });

      const result = await signIn(email, password);
      console.log("Auth result:", result);

      // Remove loading message
      document.body.removeChild(loadingMessage);

      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      // Display the full error message for better debugging
      const errorMessage = error?.message || "Invalid email or password";
      console.log("Full error details:", JSON.stringify(error, null, 2));

      // Check if it's a network error
      const isNetworkError =
        error.message?.includes("fetch") ||
        error.message?.includes("network") ||
        error.message?.includes("Failed to fetch");

      // Check if it might be a CORS error
      const isCorsError =
        error.message?.includes("CORS") ||
        error.message?.includes("cross-origin") ||
        error.message?.includes("Access-Control");

      let detailedError = `Error: ${errorMessage}\n\n`;

      if (isNetworkError) {
        detailedError +=
          "Network connectivity issue detected. Please check your internet connection.\n\n";
      } else if (isCorsError) {
        detailedError += "CORS configuration issue detected.\n\n";
      }

      detailedError += "Troubleshooting steps:\n";
      detailedError +=
        "1. Verify your Supabase Site URL and Redirect URL settings (Authentication > URL Configuration)\n";
      detailedError += "   - Current app URL: " + window.location.origin + "\n";
      detailedError +=
        "   - Both should match exactly, including http/https protocol\n";
      detailedError +=
        "2. Check browser console for detailed error messages (F12)\n";
      detailedError += "3. Verify your credentials are correct\n";
      detailedError += "4. Try creating a new account if you don't have one";

      setError(detailedError);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && (
            <div className="my-4">
              <div className="bg-red-50 border border-red-300 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Login Failed
                    </h3>
                    <pre className="text-sm text-red-700 whitespace-pre-wrap mt-2">
                      {error}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="text-sm font-medium text-blue-800">
                  Need help?
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  If you're still having trouble, try the following:
                </p>
                <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
                  <li>
                    Check that your Supabase project is properly configured
                  </li>
                  <li>
                    Verify that http://167.71.213.84 is added as a Site URL in
                    Supabase Authentication settings
                  </li>
                  <li>Try using the Sign Up form to create a new account</li>
                </ul>
              </div>
            </div>
          )}
          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-black text-white hover:bg-gray-800 text-sm font-medium"
          >
            Sign in
          </Button>

          <div className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
