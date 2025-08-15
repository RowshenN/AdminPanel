export const token = () => {
  if (JSON.parse(localStorage.getItem("userData"))) {
    var data = JSON.parse(localStorage.getItem("userData"));
    return data?.token;
  }
};
