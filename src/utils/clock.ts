export type Clock = {
  autoStart: boolean;
  startTime: number;
  oldTime: number;
  elapsedTime: number;
  running: boolean;
};
const $clock = () => {
  const state: Clock = {
    autoStart: true,
    startTime: 0,
    oldTime: 0,
    elapsedTime: 0,
    running: false,
  };

  const getElapsedTime = () => {
    getDelta();
    return state.elapsedTime;
  };

  const getDelta = () => {
    let diff = 0;

    if (state.autoStart && !state.running) {
      start();
      return 0;
    }

    if (state.running) {
      const newTime = Date.now();

      diff = (newTime - state.oldTime) / 1000;
      state.oldTime = newTime;

      state.elapsedTime += diff;
    }

    return diff;
  };

  const start = () => {
    state.startTime = Date.now();
    state.oldTime = state.startTime;
    state.elapsedTime = 0;
    state.running = true;
  };

  const stop = () => {
    getElapsedTime();
    state.running = false;
    state.autoStart = false;
  };

  return {
    ...state,
    getElapsedTime,
    getDelta,
    start,
    stop,
  };
};

export { $clock };
