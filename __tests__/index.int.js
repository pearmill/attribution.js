import * as attribution from '../lib';
import * as visitParameters from '../lib/visitParameters';

const defaultSetttings = attribution.settings({
  ignoreVisitsWithoutUTMParameters: false
});

describe("module", () => {
  beforeEach(() => {
    // Reset history
    visitParameters.set(attribution.settings(), []);
    visitParameters.set(defaultSetttings, []);

    // Reset settings

    attribution.settings(defaultSetttings);
  });

  describe("params", () => {
    it("it should create a new param object if it doesn't exist yet.", () => {
      const paramObject = attribution.params();

      expect(paramObject).toBeTruthy();
    });

    it("it should return the current param object.", () => {
      const paramObject = attribution.save()

      expect(attribution.params()).toEqual(paramObject);
    });
  });

  describe("save", () => {
    it("it should create and save a param object into storage.", () => {
      const paramObject = attribution.save();
      const visits = visitParameters.get(attribution.settings());

      expect(visits).toBeTruthy();
      expect(paramObject).toBeTruthy();
      expect(visits.length).toEqual(1);
    });

    it("it should only save a new param objects if called multiple times.", () => {
      attribution.save();
      attribution.save();

      const visits = visitParameters.get(attribution.settings());

      expect(visits).toBeTruthy();
      expect(visits.length).toEqual(2);
    });

    it("saves query parameters in param object correctly.", () => {
      const params = { utm_campaign: 'test', utm_source: 'source' };

      delete window.location
      window.location = {
        search: '?' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
      }

      const paramObject = attribution.save();

      expect(paramObject).toBeTruthy();
      expect(paramObject.query).toBeTruthy();
      expect(paramObject.query).toEqual(params);
    });

    it("saves cookies in param object correctly.", () => {
      document.cookie = "_ga=test-hello;"

      const paramObject = attribution.save();

      expect(paramObject).toBeTruthy();
      expect(paramObject.cookies).toBeTruthy();
      expect(paramObject.cookies._ga).toEqual('test-hello');
    });

    it("saves time in param object.", () => {
      const paramObject = attribution.save();

      expect(paramObject).toBeTruthy();
      expect(paramObject.time).toBeTruthy();
      const timeObject = new Date(paramObject.time);
      expect(!isNaN(timeObject.getTime())).toBeTruthy();
    });
  });

  describe("lastClickParams", () => {
    it("should return last visit params.", () => {
      attribution.save();
      attribution.save();
      const paramObject = attribution.save();

      expect(attribution.lastClickParams()).toEqual(paramObject);
    })
  });

  describe("firstClickParams", () => {
    it("should return first visit params.", () => {
      const paramObject = attribution.save();
      attribution.save();
      attribution.save();

      expect(attribution.firstClickParams()).toEqual(paramObject);
    });
  });

  describe("historicalParams", () => {
    it("should return all visits.", () => {
      const visits = [
        attribution.save(),
        attribution.save(),
        attribution.save()
      ]

      expect(attribution.historicalParams()).toEqual(visits);
    })
  });
});
