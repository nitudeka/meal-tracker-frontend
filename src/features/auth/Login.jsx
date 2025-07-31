import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../contexts/AuthContext";
import { authService } from "../../services";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Welcome
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mb-6 text-center">
          Sign in to your account with Google
        </p>

        {/* Error Display */}
        {error && (
          <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="w-full mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded text-sm text-center">
            Signing you in...
          </div>
        )}
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              if (credentialResponse.credential) {
                setLoading(true);
                setError(null);

                try {
                  const response = await authService.login({
                    idToken: credentialResponse.credential,
                  });
                  login(response);
                } catch (err) {
                  console.error("Login error details:", {
                    message: err.message,
                    status: err.response?.status,
                    data: err.response?.data,
                  });
                  setError(err.message || "Login failed. Please try again.");
                } finally {
                  setLoading(false);
                }
              }
            }}
            onError={() => {
              setError("Google login failed. Please try again.");
            }}
            width="100%"
            disabled={loading}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default LoginPage;
