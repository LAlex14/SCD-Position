import axios from 'axios'

const apiCache = {}
const limit = 50 // max number of keys to store in the cache
const history = []
const defaultTTL = 2 * 60 * 1000 // 2 minutes

export default {
  /**
   * Set value to the cache
   * @param key cache key
   * @param value cache value
   * @param ttl expiration in milliseconds
   */
  set(key, value, ttl = defaultTTL) {
    apiCache[key] = {
      value,
      timestamp: new Date().getTime(),
      ttl: ttl,
    }
    history.push(key)

    if (history.length > limit) {
      this.removeOldKeys()
    }
  },
  /**
   * Get value from cache
   * @param key cache get
   * @return {null|*} cached value or null if key doesn't exist or ttl expired
   */
  get(key) {
    if (!apiCache[key]) {
      return null
    }

    const now = new Date().getTime()
    let { value, timestamp, ttl } = apiCache[key]
    ttl = ttl || defaultTTL

    if (timestamp + ttl < now) {
      // the cache expired
      this.removeKey(key)
      return null
    }
    return value
  },
  /**
   * Removes key from the cache
   * @param key
   */
  removeKey(key) {
    const historyIndex = history.indexOf(key)

    if (historyIndex !== -1) {
      history.splice(historyIndex, 1)
    }

    delete apiCache[key]
  },
  /**
   * Performs a cached get request with axios.
   * If the request is cached, it will return the value from cache, otherwise it will make the request and cache the value
   * @param url
   * @param config
   * @return {Promise<unknown>}
   */
  async getRequest(url, config = {}) {
    const configCopy = {
      ...config
    }

    delete configCopy.invalidateCache
    let key = JSON.stringify({ url, config: configCopy })

    if (config.invalidateCache) {
      this.removeKey(key)
    }
    if (this.get(key)) {
      return this.get(key)
    }

    const response = await axios.get(url, config)
    this.set(key, response, config.ttl)
    return response
  },
  /**
   * Removes cache keys that are above the cache key limit
   */
  removeOldKeys() {
    const keysToRemove = history.length - limit

    for (let i = 0; i < keysToRemove; i++) {
      const key = history[0]
      delete apiCache[key]
      history.shift()
    }
  },
  /**
   * Removes key for a given word from the key. E.g removeForEntity("projects")
   * @param entity
   */
  removeForEntity(entity) {
    for (let key in apiCache) {
      if (key.includes(entity)) {
        this.removeKey(key)
      }
    }
  }
}
