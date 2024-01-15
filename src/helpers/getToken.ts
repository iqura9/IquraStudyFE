export const getAccessToken = (): string | null => {
  const authData = localStorage.getItem("auth");
  if (!authData) return null;
  try {
    const parsedAuthData = JSON.parse(authData);
    if (parsedAuthData && parsedAuthData.accessToken) {
      return parsedAuthData.accessToken;
    }
  } catch (error) {
    console.error("Error parsing auth data:", error);
  }

  return null;
};

export const getRefreshToken = (): string | null => {
  const authData = localStorage.getItem("auth");
  if (!authData) return null;
  try {
    const parsedAuthData = JSON.parse(authData);
    if (parsedAuthData && parsedAuthData.refreshToken) {
      return parsedAuthData.refreshToken;
    }
  } catch (error) {
    console.error("Error parsing auth data:", error);
  }

  return null;
};
