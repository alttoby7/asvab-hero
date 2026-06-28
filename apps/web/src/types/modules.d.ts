// gray-matter ships its types as gray-matter.d.ts without an "exports" or "types" field
// that bundler module resolution can pick up automatically. This shim re-exports them.
declare module "gray-matter" {
  interface GrayMatterFile<T extends string | Buffer> {
    data: { [key: string]: unknown };
    content: string;
    excerpt?: string;
    orig: T;
    language: string;
    matter: string;
    stringify(lang: string): string;
  }

  interface Options {
    excerpt?: boolean | ((file: GrayMatterFile<string | Buffer>, options: Options) => void);
    excerpt_separator?: string;
    engines?: { [index: string]: unknown };
    language?: string;
    delimiters?: string | [string, string];
  }

  function matter<T extends string | Buffer>(input: T, options?: Options): GrayMatterFile<T>;

  export = matter;
}
