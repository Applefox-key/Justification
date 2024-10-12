// getiing selection
// const getSelectedText = (setSelectedText) => {
//   const textarea = document.getElementById("editArea");
//   const selectedText = textarea.value.substring(
//     textarea.selectionStart,
//     textarea.selectionEnd
//   );
//   setSelectedText(selectedText);
// };

//new qlement to the array
export const addNewElement = (selectedLevel, setArray, array) => {
  let start = null;
  let end = null;
  let textarea = null;
  textarea = document.getElementById("editArea");
  let text = textarea.value;
  if (textarea !== null) {
    start = textarea.selectionStart;
    end = textarea.selectionEnd;
  }
  if (start === end) {
    // No text selected
    return;
  }
  const selectedText = text.slice(start, end);
  if (!selectedText || !selectedLevel) {
    alert("Please select text and level.");
    return;
  }

  const newElement = { en: selectedText, ru: "", level: selectedLevel };
  setArray([...array, newElement]);
};
