import * as visitParameters from './visitParameters'

describe("visitParameters function", () => {
  it("it should return empty array when the key is empty in localStorage.", () => {
    expect(visitParameters.get({
      localStorageName: '_attrbjs'
    })).toEqual([]);
  });

  it("it should save stringified object in localStorage under the right key.", () => {
    const value = ['test', 'hello'];
    const valueStr = JSON.stringify(value);
    visitParameters.set({
      localStorageName: '_attrbjs'
    }, value);

    expect(localStorage.getItem('_attrbjs')).toEqual(valueStr);
  });

  it("should fail gracefully with corrupt data passed in.", () => {
    // Circular dependency
    var t = {}
    t.t = t;

    expect(() => {
      visitParameters.set({
        localStorage: '_attrbjs'
      }, t)
    }).not.toThrow();
  });

  it("it should retrieve parsed JSON object from localStorage from the right key.", () => {
    const value = ['test', 'hello'];
    const valueStr = JSON.stringify(value);

    localStorage.setItem('_attrbjs', valueStr)

    expect(visitParameters.get({
      localStorageName: '_attrbjs'
    })).toEqual(value);
  });

  it("it should fail gracefully with corrupt data in localStorage.", () => {
    localStorage.setItem('_attrbjs', 'bad - data');

    expect(visitParameters.get({
      localStorageName: '_attrbjs'
    })).toEqual([]);
  });
});
