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

/**
 * Converts a (possibly nested) object into text where each line is a non-empty field value
 * @param {Object} obj - The object to convert (can be nested)
 * @param {string} separator - Line separator (default: "\n")
 * @returns {string} Text with each non-empty value on a separate line
 *
 * @example
 * const obj = { a: "hello", b: "", c: { d: "world", e: null, f: { g: "nested" } } };
 * objectToText(obj);
 * // Returns: "hello\nworld\nnested"
 */
export const objectToText = (obj, separator = "\n") => {
  const values = [];

  const extractValues = (item) => {
    if (item === null || item === undefined || item === "" || item === 0) {
      return;
    }

    // If it's a primitive value (string, number, boolean)
    if (typeof item !== "object") {
      const stringValue = String(item).trim();
      if (stringValue !== "") {
        values.push(stringValue);
      }
      return;
    }

    // If it's an array
    if (Array.isArray(item)) {
      item.forEach((element) => extractValues(element));
      return;
    }

    // If it's an object, recursively process its values
    Object.values(item).forEach((value) => extractValues(value));
  };

  extractValues(obj);
  return values.join(separator);
};
