import cookieParameters from './cookieParameters'

describe("cookieParameters function", () => {
  it("it should return an empty object if no cookies are present.", () => {
    document.cookie = "";

    expect(cookieParameters({ trackCookies: ['test'] })).toEqual({});
  });

  it("it should return an empty object if no trackCookies cookies are present.", () => {
    document.cookie = "test=hello;"

    expect(cookieParameters({ trackCookies: ['other-param', 'hello'] })).toEqual({});
  });

  it("it should return the values of all cookies listetd in trackCookies.", () => {
    document.cookie = "test=hello; okay=value;"

    expect(cookieParameters({ trackCookies: ['test', 'other-param'] })).toEqual({
      test: 'hello'
    });
  });
});
