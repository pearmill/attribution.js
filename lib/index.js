import queryParameters from './queryParameters'
import cookieParameters from './cookieParameters'
import * as visitParameters from './visitParameters'
import log from './log'

let trackingSettings = {
  localStorageName: '_attrbjs',
  limitVisits: 5,
  trackQueryParameters: [
    'utm_campaign',
    'utm_medium',
    'utm_source',
    'utm_content',
    'utm_term',
    'fbclid'
  ],
  trackCookies: [
    /* Facebook Cookies: https://developers.facebook.com/docs/marketing-api/facebook-pixel/server-side-api/parameters#fbc */
    '_fbc',
    '_fbp',

    /* Google Analytics */
    '_ga',
    '_gid',
    '__utma',
    '__utmb',
    '__utmc',
    '__utmz',
    '__utmv',
    '__utmx',
    '__utmxx',

    /* Google Optimize */
    '_gaexp',
    '_opt_awcid',
    '_opt_awmid',
    '_opt_awgid',
    '_opt_awkid',
    '_opt_utmc'
  ],
  trackReferrer: true,
  ignoreVisitsWithoutUTMParameters: true,
  visitFilterFunction: null, // Only accept visits if this function returns true
  debug: true
}

let thisVisit = null

export const save = () => {
  // Set cookie data
  const previousVisits = visitParameters.get(trackingSettings)
  thisVisit = {
    time: (new Date()).toUTCString(),
    query: queryParameters(trackingSettings),
    cookies: cookieParameters(trackingSettings)
  }

  if (trackingSettings.trackReferrer) {
    thisVisit.referrer = document.referrer
  }

  if (trackingSettings.ignoreVisitsWithoutUTMParameters) {
    let shouldIgnore = true
    Object.keys((thisVisit.query || {})).forEach(key => {
      if (/utm/i.test(key)) {
        shouldIgnore = false
      }
    })

    if (shouldIgnore) {
      log('Ignoring visit, no UTM parameters found.');
      return
    }
  }

  if (trackingSettings.visitFilterFunction) {
    if (!trackingSettings.visitFilterFunction(thisVisit)) {
      log('Ignoring visit, visitFilterFunction returned falsey.');
      return
    }
  }

  let visits = [
    ...previousVisits,
    thisVisit
  ].filter(t => !!t)

  if (visits.length > trackingSettings.limitVisits) {
    visits = [ visits[0], ...visits.splice(2, visits.length)]
  }

  visitParameters.set(trackingSettings, visits)

  return thisVisit
}

export const settings = (options) => {
  if (options) {
    trackingSettings = {
      ...trackingSettings,
      ...options
    }
  }

  return trackingSettings
}

export const params = () => {
  if (!thisVisit) {
    save()
  }

  return thisVisit
}

export const lastClickParams = () => {
  const visits = visitParameters.get(trackingSettings)

  return visits[visits.length - 1]
}

export const firstClickParams = () => {
  const visits = visitParameters.get(trackingSettings)

    return visits[0]
}

export const historicalParams = () => {
  return visitParameters.get(trackingSettings)
}
