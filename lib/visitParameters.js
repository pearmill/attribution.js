import * as log from './log'

export const get = (settings) => {
  try {
    const raw = localStorage.getItem(settings.localStorageName)

    return JSON.parse(raw) || []
  } catch (e) {
    log.error('[localStorage.getItem + parse failed]', e);

    return []
  }
}

export const set = (settings, newParameters) => {
  try {
    const raw = JSON.stringify(newParameters)
    localStorage.setItem(settings.localStorageName, raw)

  } catch (e) {
    log.error('[localStorage.setItem + parse failed]', e);
  }
}
