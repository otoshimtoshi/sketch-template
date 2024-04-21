const $pointer = (canvas: HTMLCanvasElement) => {
  const state = {
    x: 0.5 * canvas.width,
    y: 0.5 * canvas.height,
    dx: 0,
    dy: 0,
    moved: false,
  };

  /**
   *
   * @param x - number
   * @param y - number
   */
  const setPosition = (x: number, y: number) => {
    state.x = x;
    state.y = y;
  };

  return {
    ...state,
    setPosition,
  };
};

export { $pointer };
