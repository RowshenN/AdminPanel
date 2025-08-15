const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const validateEmail = (e) => {
  if (e && e.match(isValidEmail)) {
    return true;
  } else {
    return false;
  }
};
