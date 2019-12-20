export default (settings) => {
  const query = {}
  const result = {}
  window.location.search.substring(1)
  .split('&')
  .map((param) => {
    const [key, value] = param.split('=')
    const decodedKey = decodeURIComponent(key)
    const decodedValue = decodeURIComponent(value)
    query[decodedKey] = decodedValue;

    if (settings.trackQueryParameters.indexOf(decodedKey) >= 0) {
      result[decodedKey] = decodedValue;
    }
  });

  return result
}
