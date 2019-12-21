# Attribution.js API

## settings
You can use this function to set or retrieve the current settings. If you change the settings, all the subsequent [save](https://github.com/pearmill/attribution.js/blob/master/API.md#analyticsjs) calls will be affected.

**Signature**
```javascript
  // options – (optional) - settings attributes to set/change
  attribution.settings(options = {});
```

You can pass the following parameters as part of the `options` object:

* `localStorageName` – string – localStorage key. Default: `_attrbjs`.
* `limitVisits` – limit the number of tracked visits. It always keeps the first and last visits. Default: `5`.
* trackQueryParameters – array – query parameters to keep track of. Default: `['utm_campaign', 'utm_medium', 'utm_source', 'utm_content', 'utm_term', 'ref', 'fbclid']`
* trackCookies – array – cookies to keep track of. Default: `['_fbc', '_fbp', '_ga', '_gid', '__utma', '__utmb', '__utmc', '__utmz', '__utmv', '__utmx', '__utmxx', '_gaexp', '_opt_awcid', '_opt_awmid', '_opt_awgid', '_opt_awkid', '_opt_utmc']`
* trackReferrer – boolean – whether or not to keep track of the referrer. Default: `true`
* ignoreVisitsWithoutUTMParameters – boolean – whether or not to ignore visits that don't include a `utm_*` parameter. Default: `true`
* visitFilterFunction – function – a function to block or allow tracking. Default: `null`
* debug – boolean – whether or not to lock debug information. Default: `false`

**Returns**

Function returns the full settings object.

```json
{
  "localStorageName": "_attrbjs",
  "limitVisits": 5,
  "trackQueryParameters": [
    "utm_campaign",
    "utm_medium",
    "utm_source",
    "utm_content",
    "utm_term",
    "fbclid"
  ],
  "trackCookies": [
    "_fbc",
    "_fbp",
    "_ga",
    "_gid",
    "__utma",
    "__utmb",
    "__utmc",
    "__utmz",
    "__utmv",
    "__utmx",
    "__utmxx",
    "_gaexp",
    "_opt_awcid",
    "_opt_awmid",
    "_opt_awgid",
    "_opt_awkid",
    "_opt_utmc"
  ],
  "trackReferrer": true,
  "ignoreVisitsWithoutUTMParameters": true,
  "visitFilterFunction": null,
  "debug": false
}
```

**Usage**
```javascript
  // Set settings
  attribution.settings({
    limitVisits: 10
  });

  // Get settings
  attribution.settings();
```

## save

Calling this function tracks the visit information. It is **not called automatically**, so you are required to call it every time the user visits a page.

Each time it's called, a new visit is tracked.

**Signature**
```javascript
  attribution.save();
```

**Returns**

Function returns the saved parameters object if the visit is saved, or undefined if the visit is ignored due to settings.

```json
{
  "time": "Sat, 21 Dec 2019 10:42:08 GMT",
  "query": {
    "utm_campaign": "test"
  },
  "cookies": {
    "_ga": "...",
    "_gid": "..."
  },
  "page": "https://pearmill.com/?utm_campaign=test",
  "referrer": ""
}
```

## params

Retrieve the current visit's parameters. Note: this function calls `save` for you if you haven't called it yet.

**Signature**
```javascript
  attribution.params();
```

**Returns**

Function returns the parameters object for the current visit.

```json
{
  "time": "Sat, 21 Dec 2019 10:42:08 GMT",
  "query": {
    "utm_campaign": "test"
  },
  "cookies": {
    "_ga": "...",
    "_gid": "..."
  },
  "page": "https://pearmill.com/?utm_campaign=test",
  "referrer": ""
}
```

## firstClickParams

Retrieve the first tracked visit's parameters.

**Signature**
```javascript
  attribution.firstClickParams();
```

**Returns**

Function returns first tracked visits parameters object.

```json
{
  "time": "Sat, 21 Dec 2019 10:42:08 GMT",
  "query": {
    "utm_campaign": "test"
  },
  "cookies": {
    "_ga": "...",
    "_gid": "..."
  },
  "page": "https://pearmill.com/?utm_campaign=hello",
  "referrer": "https://google.com"
}
```

## historicalParams

Retrieve all historical tracked visits' parameters.

**Signature**
```javascript
  attribution.historicalParams();
```
**Returns**

Function returns an array of all tracked visits' parameters objects.

```json
[
  {
    "time": "Sat, 21 Dec 2019 10:41:47 GMT",
    "query": {
      "utm_campaign": "hello"
    },
    "cookies": {
      "_ga": "...",
      "_gid": "..."
    },
    "page": "https://www.npmjs.com/package/@pearmill/attribution.js?utm_campaign=hello",
    "referrer": "https://google.com"
  },
  {
    "time": "Sat, 21 Dec 2019 10:42:08 GMT",
    "query": {
      "utm_campaign": "test"
    },
    "cookies": {
      "_ga": "...",
      "_gid": "..."
    },
    "page": "https://www.npmjs.com/package/@pearmill/attribution.js?utm_campaign=test",
    "referrer": ""
  }
]
```
