declare module '*.module.css' {
  interface CSSModule {
    readonly [key: string]: string;
  }

  const content: CSSModule;
  export default content;
}

declare module '*.module.scss' {
  interface CSSModule {
    readonly [key: string]: string;
  }

  const content: CSSModule;
  export default content;
}

declare module '*.module.sass' {
  interface CSSModule {
    readonly [key: string]: string;
  }

  const content: CSSModule;
  export default content;
}

declare module '*.module.less' {
  interface CSSModule {
    readonly [key: string]: string;
  }

  const content: CSSModule;
  export default content;
}

declare module '*.module.styl' {
  interface CSSModule {
    readonly [key: string]: string;
  }

  const content: CSSModule;
  export default content;
}
