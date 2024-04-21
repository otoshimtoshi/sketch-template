/** color mode type */
export type ColorModeType = "light" | "dark";

/** color data type */
export type ColorData = {
  /** red */
  r: number;
  /** green */
  g: number;
  /** blue */
  b: number;
  /** alpha */
  a: number;
};

const $color = (mode: ColorModeType = "light") => {
  const state: ColorData = {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  };

  /**
   * Sets this color from RGB values.
   * @param r - Red channel value between 0 and 1.
   * @param g - Green channel value between 0 and 1.
   * @param b - Blue channel value between 0 and 1.
   */
  const setRGB = (r: number, g: number, b: number, a: number = 1) => {
    state.r = r;
    state.g = g;
    state.b = b;
    state.a = a;
  };

  const updateMode = () => {
    if (mode === "light") {
      setRGB(0, 0, 0);
    } else {
      setRGB(0.901, 0.905, 0.909);
    }
  };
  updateMode();

  return {
    ...state,
    setRGB,
  };
};

export { $color };
