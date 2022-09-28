export const getToken = () => {
  if (typeof window === "undefined") return;

  return localStorage.getItem("refreshToken");
};
