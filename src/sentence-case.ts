enum SentenceCase {
  CAMEL = 'camelCase',
  KEBAB = 'kebab-case',
  CATERPILLAR = 'caterpillar-case',
  PARAM = 'param-case',
  DASH = 'dash-case',
  LISP = 'lisp-case',
  CSS = 'css-case',
  PASCAL = 'PascalCase',
  CAPITAL_CAMEL = 'CapitalCamelCase',
  SNAKE = 'snake_case',
  C = 'c_case',
  UPPER = 'UPPER_CASE',
  CONSTANT = 'CONSTANT_CASE',
  MACRO = 'MACRO_CASE',
  SCREAM = 'SCREAM_CASE',
  COBOL = 'COBOL-CASE',
  TRAIN = 'TRAIN-CASE',
  GO = 'goLANGCase',
}

function splitWords(s: string): string[] {
  return s.split(/[^0-9a-zA-Z]+/).flatMap((w) => {
    const substrings: string[] = [];
    const upperCaseWs = w.matchAll(/[A-Z]+/g);

    let prevI = 0;
    let currI = 0;
    let upperCaseW = upperCaseWs.next();
    while (!upperCaseW.done) {
      prevI = currI;
      currI = upperCaseW.value.index;

      if (currI !== 0) {
        const substring = w.substring(prevI, currI);
        substrings.push(substring);
      }

      upperCaseW = upperCaseWs.next();
    }

    substrings.push(w.substring(currI));

    return substrings;
  });
}

export function toCamelCase(s: string): string {
  return splitWords(s)
    .map(
      (w, i) =>
        (i !== 0 ? w[0].toUpperCase() : w[0]) + w.substring(1).toLowerCase()
    )
    .join('');
}

export function toGoCase(s: string): string {
  return splitWords(s)
    .map((w, i) => (i !== 0 ? w[0].toUpperCase() : w[0]) + w.substring(1))
    .join('');
}

export function toPascalCase(s: string): string {
  return splitWords(s)
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join('');
}

export function toSnakeCase(s: string): string {
  return splitWords(s)
    .map((w) => w.toLowerCase())
    .join('_');
}

export function toUpperCase(s: string): string {
  return splitWords(s)
    .map((w) => w.toUpperCase())
    .join('_');
}

export function toKebabCase(s: string): string {
  return splitWords(s)
    .map((w) => w.toLowerCase())
    .join('-');
}

export function toCobolCase(s: string): string {
  return splitWords(s)
    .map((w) => w.toUpperCase())
    .join('-');
}

export function convertString(s: string, format: SentenceCase): string {
  switch (format) {
    case SentenceCase.CAMEL:
      return toCamelCase(s);
    case SentenceCase.KEBAB:
    case SentenceCase.CATERPILLAR:
    case SentenceCase.PARAM:
    case SentenceCase.DASH:
    case SentenceCase.LISP:
    case SentenceCase.CSS:
      return toKebabCase(s);
    case SentenceCase.PASCAL:
    case SentenceCase.CAPITAL_CAMEL:
      return toPascalCase(s);
    case SentenceCase.SNAKE:
    case SentenceCase.C:
      return toSnakeCase(s);
    case SentenceCase.UPPER:
    case SentenceCase.CONSTANT:
    case SentenceCase.MACRO:
    case SentenceCase.SCREAM:
      return toUpperCase(s);
    case SentenceCase.COBOL:
    case SentenceCase.TRAIN:
      return toCobolCase(s);
    case SentenceCase.GO:
      return toGoCase(s);
    default:
      throw 'case not supported';
  }
}
