export const logoutPartner = () => {
    localStorage.removeItem("partner_token");
    localStorage.removeItem("partner_user");
    sessionStorage.removeItem("partner_token");
    sessionStorage.removeItem("partner_user");
    window.location.href = "/partner/login";
  };
  