import log, { error } from './log'

describe("log function", () => {
  it("it should not print to console if debug is set to false on global object.", () => {
    window.attribution = {
      settings: () => ({ debug: false })
    }

    const logSpy = jest.spyOn(global.console, 'log')

    log("test");

    expect(logSpy).toHaveBeenCalledTimes(0);

    logSpy.mockRestore();

  });

  it("it should print to console if debug is set to true on global object.", () => {
    window.attribution = {
      settings: () => ({ debug: true })
    }

    const logSpy = jest.spyOn(global.console, 'log')

    log("test");

    expect(logSpy).toHaveBeenCalledTimes(1);

    logSpy.mockRestore();
  });

  it("it should print tto console if debug is set to false when it's an error.", () => {
    window.attribution = {
      settings: () => ({ debug: false })
    }

    const logSpy = jest.spyOn(global.console, 'error')

    error("test");

    expect(logSpy).toHaveBeenCalledTimes(1);

    logSpy.mockRestore();
  });
});
