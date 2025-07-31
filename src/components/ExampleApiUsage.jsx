import React, { useState, useEffect } from "react";
import { userService, authService } from "../services";

const ExampleApiUsage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  // Fetch user profile
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await userService.getProfile();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async () => {
    if (!profile) return;

    try {
      const updated = await userService.updateProfile({
        name: profile.name + " (Updated)",
        email: profile.email,
      });
      setProfile(updated);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const response = await userService.uploadProfilePicture(file);
      console.log("File uploaded:", response);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setProfile(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">API Usage Example</h2>

      {/* Authentication Status */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Status: {isAuthenticated ? "Authenticated" : "Not Authenticated"}
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Profile Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">User Profile</h3>

        {loading && <p className="text-blue-600">Loading...</p>}

        {profile ? (
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <button
              onClick={updateProfile}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update Profile
            </button>
          </div>
        ) : (
          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Fetch Profile
          </button>
        )}
      </div>

      {/* File Upload */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">File Upload</h3>
        <input
          type="file"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* Logout */}
      {isAuthenticated && (
        <div className="mb-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h4 className="font-semibold mb-2">How to use:</h4>
        <ol className="text-sm text-gray-600 space-y-1">
          <li>
            1. Import services:{" "}
            <code>
              import {`{ userService, authService }`} from '../services'
            </code>
          </li>
          <li>2. Use try-catch for error handling</li>
          <li>3. Implement loading states for better UX</li>
          <li>4. Let the utility handle authentication automatically</li>
        </ol>
      </div>
    </div>
  );
};

export default ExampleApiUsage;
