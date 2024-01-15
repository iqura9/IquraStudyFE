export const logOut = () => {
  localStorage.removeItem("auth");

  window.location.href = "/login";
};
