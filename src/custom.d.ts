/* eslint-disable @typescript-eslint/no-explicit-any */
interface String {
  /** Converts characters in a string sentence like. */
  toSentenceCase: () => string;
}

declare module "*.svg" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

declare module "*.wav" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
