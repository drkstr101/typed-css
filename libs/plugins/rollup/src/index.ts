import { RollupOptions } from 'rollup';

export interface TypedCSSOptions extends RollupOptions {
  extraGlobals?: Record<string, string>;
}

const defaultGlobals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'styled',
  '@emotion/react': 'emotionReact',
  '@emotion/styled': 'emotionStyled',
};

export default function getRollupOptions({
  extraGlobals = defaultGlobals,
  ...options
}: TypedCSSOptions) {
  if (Array.isArray(options.output)) {
    options.output.forEach((o) => {
      o.globals = { ...o.globals, ...extraGlobals };
    });
  } else {
    options.output = {
      ...options.output,
      globals: {
        ...(options?.output?.globals ?? {}),
        ...extraGlobals,
      },
    };
  }
  return options;
}
