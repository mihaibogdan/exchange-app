export const escapeRegExp = text =>
  text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

export const getSearchRegex = (value = '') =>
  new RegExp(escapeRegExp(value).replace(/\\\[/g, '\\\\'), 'gi');

export const searchList = (list = [], value = '', keys: Array<string> = []) => {
  if (!value || !keys.length) {
    return list;
  }
  const inputValue = value.toLowerCase();
  const regex = getSearchRegex(inputValue);

  return list.filter(item =>
    keys.some(key => String(item[key]).search(regex) !== -1)
  );
};

export const highlightQuery = (str: string, query: string): string => {
  if (!query) return str;

  const regex = getSearchRegex(query);
  const highlighter = string =>
    string.replace(regex, text => `<strong>${text}</strong>`);
  return highlighter(String(str));
};
