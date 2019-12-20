import * as attribution from './index'
import * as visitParameters from './visitParameters'

const defaultSetttings = attribution.settings();

describe("module", () => {
  beforeEach(() => {
    // Reset history
    visitParameters.set(attribution.settings(), []);
    visitParameters.set(defaultSetttings, []);

    // Reset settings

    attribution.settings(defaultSetttings);
  });

  describe("settings", () => {
    it("it should update trackingSettings when passed options", () => {
        const settings = attribution.settings({
          test: true
        });

        expect(settings.test).toEqual(true);
    });

    it("it should return trackingSettings when no options are passed", () => {
      const settings = attribution.settings();

      expect(settings).toBeTruthy()
      expect(settings.localStorageName).toBeTruthy();
    });
  });

  describe("save", () => {
    it("should save referrer if trackReferrer is truthy.", () => {
      attribution.settings({
        trackReferrer: true
      });

      Object.defineProperty(document, 'referrer', {
        writable: true,
        value: 'https://fake.com'
      });

      attribution.save();

      const params = attribution.params();
      expect(params).toBeTruthy();
      expect(params.referrer).toBeTruthy();
      expect(params.referrer).toEqual("https://fake.com");
    });

    it("should not save referrer it trackReferrer is falsey.", () => {
      attribution.settings({
        trackReferrer: false
      });

      Object.defineProperty(document, 'referrer', {
        writable: true,
        value: 'https://fake.com'
      });

      attribution.save();

      const params = attribution.params();
      expect(params).toBeTruthy();
      expect(params.referrer).toBeUndefined();
    });

    it("should ignore visits without UTM params if ignoreVisitsWithoutUTMParameters is truthy.", () => {
      delete window.location
      window.location = {
        search: '?'
      }

      attribution.settings({
        ignoreVisitsWithoutUTMParameters: true
      });

      attribution.save();

      const visits = visitParameters.get(attribution.settings());
      expect(visits).toBeTruthy();
      expect(visits.length).toEqual(0);
    });

    it("should save visits without UTM params if ignoreVisitsWithoutUTMParameters is falsey.", () => {
      delete window.location
      window.location = {
        search: '?'
      }

      attribution.settings({
        ignoreVisitsWithoutUTMParameters: false
      });

      attribution.save();

      const visits = visitParameters.get(attribution.settings());
      expect(visits).toBeTruthy();
      expect(visits.length).toEqual(1);
    });


    it("should save visits with utm params", () => {
      delete window.location
      window.location = {
        search: '?utm_campaign=test'
      }

      attribution.settings({
        ignoreVisitsWithoutUTMParameters: true
      });

      attribution.save();

      const visits = visitParameters.get(attribution.settings());
      expect(visits).toBeTruthy();
      expect(visits.length).toEqual(1);
    });

    it("should not save visits if visitFilterFunction returns falsey.", () => {
      attribution.settings({
        visitFilterFunction: ({ query, cookies }) => {
          expect(query).toBeTruthy();
          expect(cookies).toBeTruthy();

          return false
        }
      });

      attribution.save();

      const visits = visitParameters.get(attribution.settings());
      expect(visits).toBeTruthy();
      expect(visits.length).toEqual(0);
    });

    it("should save visits if visitFilterFunction returns truthy.", () => {
      attribution.settings({
        visitFilterFunction: ({ query, cookies }) => {
          expect(query).toBeTruthy();
          expect(cookies).toBeTruthy();

          return true
        }
      });

      attribution.save();

      const visits = visitParameters.get(attribution.settings());
      expect(visits).toBeTruthy();
      expect(visits.length).toEqual(1);
    });

    it("should respect limitVisits setting.", () => {
      attribution.settings({
        limitVisits: 3
      })

      attribution.save();
      attribution.save();
      attribution.save();
      attribution.save();
      attribution.save();

      const visits = visitParameters.get(attribution.settings());
      expect(visits).toBeTruthy();
      expect(visits.length).toEqual(3);
    });
  });
});
