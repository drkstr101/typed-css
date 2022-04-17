declare module '*.module.css' {
  const content: CSSModule;
  export default content;
}

export interface CSSModule {
  readonly [key: string]: string;
}
