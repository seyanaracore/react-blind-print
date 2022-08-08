/* eslint-disable no-console */
/* eslint-disable consistent-return */
class LocalStorageUtil {
  static get(key = null) {
    if (!key) return null

    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (error) {
      console.error(error)
    }
  }

  static set(value, key = null) {
    if (!key) return
    localStorage.setItem(key, JSON.stringify(value))
  }

  static delete(key) {
    if (!key) return
    localStorage.removeItem(key)
  }
}

export default LocalStorageUtil
