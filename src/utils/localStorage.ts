/* eslint-disable no-console */
/* eslint-disable consistent-return */
class LocalStorageUtil {
  static get(key: string) {
    if (!key) return null

    try {
      const lcItem = localStorage.getItem(key)

      if (!lcItem) throw new Error('key not found')

      return JSON.parse(lcItem)
    } catch (error) {
      console.error(error)
    }
  }

  static set(value: any, key: string) {
    if (!key) return
    localStorage.setItem(key, JSON.stringify(value))
  }

  static delete(key: string) {
    if (!key) return
    localStorage.removeItem(key)
  }
}

export default LocalStorageUtil
