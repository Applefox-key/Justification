export const getCursorPosById = (id) => {
  const el = document.getElementById(id);
  if (!el) return null;

  // check is it textarea or input
  if ("selectionStart" in el) {
    return {
      start: el.selectionStart,
      end: el.selectionEnd,
    };
  }
  return null;
};
