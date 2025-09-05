import { padZero } from "./utils";

interface TestCase<T, D = T> {
  input: T;
  want: D;
}

test("test pad zero", () => {
  const num = "1";

  const result = padZero(num);

  expect(result).toBe("01");
});

const cases: TestCase<string>[] = [
  { input: "1", want: "01" },
  { input: "11", want: "11" },
  { input: "23", want: "23" },
  { input: "777", want: "777" },
];

cases.forEach(({ input, want }) => {
  test(`padZero(${input}) = ${want}`, () => {
    expect(padZero(input)).toBe(want);
  });
});

const testEachCases = cases.map(({ input, want }) => [input, want]);

test.each(testEachCases)("padZero(%s) = %s", (input, want) => {
  expect(padZero(input)).toBe(want);
});

const anyTypesCases: [any, string][] = [
  [2, "02"],
  [[], ""],
  [{}, ""],
];

test.each(anyTypesCases)("padZero(%s) = %s", (input, want) => {
  expect(padZero(input)).toBe(want);
});
