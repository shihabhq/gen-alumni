import { fetchWithAuth } from "./refresh";

// This app now serves its own data API (see src/app/api/v1) backed by Prisma,
// so requests are same-origin — no external backend URL needed anymore.
const API_BASE_URL = "";

// Search API
export const searchStudents = async (query: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/search?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error("Search failed");
  return response.json();
};

// Get students with filters
export const getStudentProfiles = async (filters?: {
  batch?: string;
  country?: string;
  company?: string;
  position?: string;
}) => {
  const params = new URLSearchParams();
  if (filters?.batch) params.append("batch", filters.batch);
  if (filters?.country) params.append("country", filters.country);
  if (filters?.company) params.append("company", filters.company);
  if (filters?.position) params.append("position", filters.position);

  const response = await fetch(
    `${API_BASE_URL}/api/v1/profile?${params.toString()}`
  );
  if (!response.ok) throw new Error("Failed to fetch profiles");
  return response.json();
};

// Get single profile
export const getStudentProfile = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/profile/${id}`);
  const responseData = await response.json(); // only once!

  if (!response.ok) {
    console.error("Backend error:", responseData);
    throw new Error(responseData.message || "Profile not found");
  }

  return responseData; // return parsed data
};

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) throw new Error("No refresh token available");

  const response = await fetch(`${API_BASE_URL}/auth/token/refresh`, {
    // ✅ fixed path
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    throw new Error("Token refresh failed");
  }

  const data = await response.json();
  localStorage.setItem("access_token", data.access);
  return data.access;
};

// Login
export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const responseData = await response.json();
  console.log(responseData);

  if (!response.ok) {
    // Log the backend error message
    console.error("Backend error:", responseData);
    throw new Error(responseData.message || "Registration failed");
  }

  return responseData;
};

//logout
export async function logout() {
  const token = localStorage.getItem("access_token");

  if (token) {
    try {
      await fetch("/api/v1/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    }
  }
}

// Register
export const register = async (data: {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  batch: string;
  country: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Parse JSON even if it's an error
    const responseData = await response.json();

    if (!response.ok) {
      // Log the backend error message
      console.error("Backend error:", responseData);
      throw new Error(responseData.message || "Registration failed");
    }

    return responseData;
  } catch (error) {
    console.error("Register function error:", error);
    throw error; // throw it so your handleRegister catch block can catch it
  }
};

// Update profile
export const updateProfile = async (
  id: number,
  data: Partial<{
    first_name: string;
    last_name: string;
    bio: string;
    profile_pic: string;
    current_job_position: string;
    current_company: string;
    phone: string;
    linkedin: string;
    facebook: string;
    instagram: string;
  }>
) => {
  const response = await fetchWithAuth(
    `${API_BASE_URL}/api/v1/profile/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
  console.log(data);
  const responseData = await response.json();

  if (!response.ok) {
    console.error("Backend error:", responseData);
    throw new Error("Profile not found");
  }
  // if (!response.ok) throw new Error("Failed to update profile");
  return responseData;
};
