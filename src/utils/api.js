class Api {
  // eslint-disable-next-line class-methods-use-this
  #request(url, method) {
    return fetch(url, { method })
  }

  async get(url) {
    try {
      const response = await this.#request(url, 'GET')

      return response.json()
    } catch (e) {
      // eslint-disable-next-line no-console
      return console.error(e)
    }
  }
}

export default new Api()
