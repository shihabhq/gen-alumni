import { refreshAccessToken } from "./api";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let access = localStorage.getItem("access_token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });

  // Handle expired access token
  if (response.status === 401) {
    try {
      access = await refreshAccessToken();
      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      });
      return retryResponse;
    } catch (err) {
      console.error("Token refresh failed:", err);
      localStorage.clear();
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }
  }

  return response;
};
