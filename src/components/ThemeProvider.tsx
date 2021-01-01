import * as React from 'react';
import { useTheme } from 'next-themes';
import * as CSS from 'csstype';

import { ITheme, Colors, ObjectOf } from '$/types/theme.type';

export type ThemeProviderProps = {
  children: React.ReactNode;
  colorModes: ITheme;
};

export function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  const { resolvedTheme } = useTheme();
  const { light, dark } = React.useMemo(() => getThemeCSSVariables(props.colorModes), [
    props.colorModes,
  ]);
  // Update theme CSS variables
  React.useEffect(() => {
    if (resolvedTheme === 'dark') {
      setColorModeCSSVariable(dark);
    } else {
      setColorModeCSSVariable(light);
    }
  }, [resolvedTheme, light, dark]);

  return <>{props.children}</>;
}

function setColorModeCSSVariable(colors: CSSVariables) {
  const root = document.documentElement;
  for (const [key, value] of colors) {
    root.style.setProperty(`--colors-${key}`, value);
  }
}

export type ThemeCSSVariables = {
  light: CSSVariables;
  dark: CSSVariables;
};

export function getThemeCSSVariables(theme: ITheme): ThemeCSSVariables {
  const { light, dark } = theme;
  return {
    light: getColorModeCSSVariable(light),
    dark: getColorModeCSSVariable(dark),
  };
}

export type CSSVariables = Array<[string, string]>;

function getColorModeCSSVariable(colors: Colors, prefix = ''): CSSVariables {
  const cssVariables: Array<[string, string]> = [];
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string') {
      // Handle { primary: { '': '#123' } }
      const cssVariableKey = prefix && key ? [prefix, key].join('-') : prefix || key;
      cssVariables.push([cssVariableKey, value]);
    } else if (typeof value === 'object' && value) {
      cssVariables.push(...getColorModeCSSVariable(value as ObjectOf<CSS.Property.Color>, key));
    } else {
      throw new Error(`Unexpected color mode value: ${value}`);
    }
  }
  return cssVariables;
}
