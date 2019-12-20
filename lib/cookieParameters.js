import Cookies from 'js-cookie'

export default (settings) => {
  const result = {}

  settings.trackCookies.map((key) => {
    const value = Cookies.get(key)

    if (value) {
      result[key] = value;
    }
  })

  return result
}
