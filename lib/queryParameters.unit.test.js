import queryParameters from './queryParameters'

describe("queryParameters function", () => {
  it("it should return an empty object when no query paramters are set.", () => {
    delete window.location
    window.location = {
      search: '?'
    }

    expect(queryParameters({ trackQueryParameters: ['utm_campaign'] })).toEqual({});
  });

  it("it should return an empty object when no trackQueryParameters are set.", () => {
    delete window.location
    window.location = {
      search: '?random-param=hello&another-param=okay'
    }

    expect(queryParameters({ trackQueryParameters: ['utm_campaign'] })).toEqual({});
  });

  it("it should return an object containing all query parameters that are listed in trackQueryParameters.", () => {
    const params = {
      utm_campaign: 'hello',
      utm_source: 'source',
      utm_medium: 'medium'
    }

    delete window.location
    window.location = {
      search: '?' + Object.keys(params).map((key) => `${key}=${params[key]}`).join('&')
    }

    expect(queryParameters({ trackQueryParameters: Object.keys(params) })).toEqual(params);
  });
});
