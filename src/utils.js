export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

export const getCurrentYear = () => {
  const now = new Date();
  return now.getFullYear();
};