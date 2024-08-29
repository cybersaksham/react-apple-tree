import React, { createContext, useState } from "react";
import {
  ContextProviderProps,
  ReactAppleTreeProps,
  ThemeProps,
} from "../types";
import { defaultAppleTreeProps } from "../utils/default-props";
import { cloneDeep } from "lodash";

interface PropDataContextProps {
  appleTreeProps: ReactAppleTreeProps;
  setAppleTreeProps: any;
}

const PropDataContext = createContext<PropDataContextProps>({
  appleTreeProps: defaultAppleTreeProps,
  setAppleTreeProps: () => {},
});

const PropDataContextProvider = (
  props: ContextProviderProps
): React.JSX.Element => {
  const [appleTreeProps, setAppleTreeProps] = useState<ReactAppleTreeProps>(
    defaultAppleTreeProps
  );

  const mergeThemeProps = (props: any): ThemeProps => {
    const mergedTheme: any = {
      style: { ...props.theme?.style, ...props.style },
      innerStyle: {
        ...props.theme?.innerStyle,
        ...props.innerStyle,
      },
      reactVirtualizedListProps: {
        ...props.theme?.reactVirtualizedListProps,
        ...props.reactVirtualizedListProps,
      },
    };
    const overridableThemeDefaults: any = {
      rowHeight: defaultAppleTreeProps.rowHeight,
      scaffoldBlockPxWidth: defaultAppleTreeProps.scaffoldBlockPxWidth,
      slideRegionSize: defaultAppleTreeProps.slideRegionSize,
    };
    Object.keys(overridableThemeDefaults).forEach((propKey) => {
      if (props[propKey] === null) {
        mergedTheme[propKey] =
          typeof props.theme[propKey] !== "undefined"
            ? props.theme[propKey]
            : overridableThemeDefaults[propKey];
      } else {
        mergedTheme[propKey] = props[propKey];
      }
    });
    return mergedTheme;
  };

  return (
    <PropDataContext.Provider
      value={{
        appleTreeProps,
        setAppleTreeProps: (props: ReactAppleTreeProps) => {
          let cloneProps: any = cloneDeep(props);
          let mergedTheme: ThemeProps = mergeThemeProps(cloneProps);
          setAppleTreeProps({
            ...appleTreeProps,
            ...cloneProps,
            ...mergedTheme,
          });
        },
      }}
    >
      {props.children}
    </PropDataContext.Provider>
  );
};

export { PropDataContext, PropDataContextProvider };
