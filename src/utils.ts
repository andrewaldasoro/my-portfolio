export const StringUtils = {
  toSentenceCase: (s: string): string => {
    if (/\$|\.|\!|\*|\'|\(|\)|\,/.test(s.toString())) return s.toString();
    const symbols = /\-|\_|\+/;
    if (symbols.test(s.toString())) {
      return s
        .split(symbols)
        .map((s) => StringUtils.toSentenceCase(s))
        .join(" ");
    }

    return s.charAt(0).toUpperCase() + s.slice(1);
  },
};
