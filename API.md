# Attribution.js API

## settings
You can use this function to set or retrieve the current settings. If you change the settings, all the subsequent [save](https://github.com/pearmill/attribution.js/blob/master/API.md#analyticsjs) calls will be affected.

### Params
#### options – optional - settings attributes to set/change

### Options

* `localStorageName` – string – localStorage key. Default: `_attrbjs`.
* `limitVisits` – limit the number of tracked visits. It always keeps the first and last visits. Default: `5`.
* trackQueryParameters – array – query parameters to keep track of. Default: `['utm_campaign', 'utm_medium', 'utm_source', 'utm_content', 'utm_term', 'fbclid']`
* trackCookies – array – cookies to keep track of. Default: `['_fbc', '_fbp', '_ga', '_gid', '__utma', '__utmb', '__utmc', '__utmz', '__utmv', '__utmx', '__utmxx', '_gaexp', '_opt_awcid', '_opt_awmid', '_opt_awgid', '_opt_awkid', '_opt_utmc']`
* trackReferrer – boolean – whether or not to keep track of the referrer. Default: `true`
* ignoreVisitsWithoutUTMParameters – boolean – whether or not to ignore visits that don't include a `utm_*` parameter. Default: `true`
* visitFilterFunction – function – a function to block or allow tracking. Default: `null`
* debug – boolean – whether or not to lock debug information. Default: `false`

### Usage
```javascript
// Set settings
attribution.settings({
  limitVisits: 10
});

// Get settings
attribution.settings();
```

## save

Calling this function tracks the visit information. It is *not* called automatically, so you are required to call it every time the user visits a page.

Each time it's called, a new visit is tracked.

### Usage
```javascript
attribution.save();
```

## params

Retrieve the current visit's parameters. Note: this function calls `save` for you if you haven't called it yet.

### Usage
```javascript
attribution.params();
// { query: {...}, cookies: {...}, ... }
```

## firstClickParams

Retrieve the first tracked visit's parameters.

### Usage

```javascript
attribution.firstClickParams();
/// { query: {...}, cookies: {...}, ...}
```

## historicalParams

Retrieve all historical tracked visits' parameters.

```javascript
attribution.historicalParams();
// [{ query: {...}, cookies: {...}, ...}, { query: {...}, cookies: {...}, ...}, ...]
```
