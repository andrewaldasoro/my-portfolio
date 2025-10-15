import {
  convertString,
  SentenceCase,
  toCamelCase,
  toCobolCase,
  toGoCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  toUpperCase,
} from "./sentence-case";

interface TestCase {
  phrase: string;
  camelCase: string;
  kebabCase: string;
  pascalCase: string;
  snakeCase: string;
  upperCase: string;
  cobolCase: string;
  golangCase: string;
}

const testCases: TestCase[] = [
  {
    phrase: "hello world",
    camelCase: "helloWorld",
    kebabCase: "hello-world",
    pascalCase: "HelloWorld",
    snakeCase: "hello_world",
    upperCase: "HELLO_WORLD",
    cobolCase: "HELLO-WORLD",
    golangCase: "helloWorld",
  },
  {
    phrase: "This is a sentence",
    camelCase: "thisIsASentence",
    kebabCase: "this-is-a-sentence",
    pascalCase: "ThisIsASentence",
    snakeCase: "this_is_a_sentence",
    upperCase: "THIS_IS_A_SENTENCE",
    cobolCase: "THIS-IS-A-SENTENCE",
    golangCase: "ThisIsASentence",
  },
  {
    phrase: "numbers and symbols like 5-2=3",
    camelCase: "numbersAndSymbolsLike523",
    kebabCase: "numbers-and-symbols-like-5-2-3",
    pascalCase: "NumbersAndSymbolsLike523",
    snakeCase: "numbers_and_symbols_like_5_2_3",
    upperCase: "NUMBERS_AND_SYMBOLS_LIKE_5_2_3",
    cobolCase: "NUMBERS-AND-SYMBOLS-LIKE-5-2-3",
    golangCase: "numbersAndSymbolsLike523",
  },
  {
    phrase: "I am 100% sure",
    camelCase: "iAm100Sure",
    kebabCase: "i-am-100-sure",
    pascalCase: "IAm100Sure",
    snakeCase: "i_am_100_sure",
    upperCase: "I_AM_100_SURE",
    cobolCase: "I-AM-100-SURE",
    golangCase: "IAm100Sure",
  },
  {
    phrase: "NVIDIA or AMD",
    camelCase: "nvidiaOrAmd",
    kebabCase: "nvidia-or-amd",
    pascalCase: "NvidiaOrAmd",
    snakeCase: "nvidia_or_amd",
    upperCase: "NVIDIA_OR_AMD",
    cobolCase: "NVIDIA-OR-AMD",
    golangCase: "NVIDIAOrAMD",
  },
];

testCases.forEach((testCase) => {
  test(`toCamelCase(${testCase.phrase}) = ${testCase.camelCase}`, () => {
    expect(toCamelCase(testCase.phrase)).toBe(testCase.camelCase);
  });
  test(`convertString(${testCase.phrase}, ${SentenceCase.CAMEL}) = ${testCase.camelCase}`, () => {
    expect(convertString(testCase.phrase, SentenceCase.CAMEL)).toBe(
      testCase.camelCase,
    );
  });
  test(`toKebabCase(${testCase.phrase}) = ${testCase.kebabCase}`, () => {
    expect(toKebabCase(testCase.phrase)).toBe(testCase.kebabCase);
  });
  test(`convertString(${testCase.phrase}, ${SentenceCase.KEBAB}) = ${testCase.kebabCase}`, () => {
    expect(convertString(testCase.phrase, SentenceCase.KEBAB)).toBe(
      testCase.kebabCase,
    );
  });
  test(`toPascalCase(${testCase.phrase}) = ${testCase.pascalCase}`, () => {
    expect(toPascalCase(testCase.phrase)).toBe(testCase.pascalCase);
  });
  test(`convertString(${testCase.phrase}, ${SentenceCase.PASCAL}) = ${testCase.pascalCase}`, () => {
    expect(convertString(testCase.phrase, SentenceCase.PASCAL)).toBe(
      testCase.pascalCase,
    );
  });
  test(`toSnakeCase(${testCase.phrase}) = ${testCase.snakeCase}`, () => {
    expect(toSnakeCase(testCase.phrase)).toBe(testCase.snakeCase);
  });
  test(`convertString(${testCase.phrase}, ${SentenceCase.SNAKE}) = ${testCase.snakeCase}`, () => {
    expect(convertString(testCase.phrase, SentenceCase.SNAKE)).toBe(
      testCase.snakeCase,
    );
  });
  test(`toUpperCase(${testCase.phrase}) = ${testCase.upperCase}`, () => {
    expect(toUpperCase(testCase.phrase)).toBe(testCase.upperCase);
  });
  test(`convertString(${testCase.phrase}, ${SentenceCase.UPPER}) = ${testCase.upperCase}`, () => {
    expect(convertString(testCase.phrase, SentenceCase.UPPER)).toBe(
      testCase.upperCase,
    );
  });
  test(`toCobolCase(${testCase.phrase}) = ${testCase.cobolCase}`, () => {
    expect(toCobolCase(testCase.phrase)).toBe(testCase.cobolCase);
  });
  test(`convertString(${testCase.phrase}, ${SentenceCase.COBOL}) = ${testCase.cobolCase}`, () => {
    expect(convertString(testCase.phrase, SentenceCase.COBOL)).toBe(
      testCase.cobolCase,
    );
  });
  test(`toGoCase(${testCase.phrase}) = ${testCase.golangCase}`, () => {
    expect(toGoCase(testCase.phrase)).toBe(testCase.golangCase);
  });
  test(`convertString(${testCase.phrase}, ${SentenceCase.GO}) = ${testCase.golangCase}`, () => {
    expect(convertString(testCase.phrase, SentenceCase.GO)).toBe(
      testCase.golangCase,
    );
  });
  test(`convertString(${testCase.phrase}, "unknown") = throw "case not supported"`, () => {
    expect(() => convertString(testCase.phrase, "unknown" as any)).toThrow(
      "case not supported",
    );
  });
});
