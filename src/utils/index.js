export const logout = () => {
  localStorage.removeItem("userData");
};

export const isLogin = () => {
  if (localStorage.getItem("userData")) {
    var data = JSON.parse(localStorage.getItem("userData"));
    if (data.token) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const isLoginAdmin = () => {
  if (localStorage.getItem("userData")) {
    var data = JSON.parse(localStorage.getItem("userData"));
    if (data.token) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
