const BASE_URL = process.env.UPSTASH_REDIS_REST_URL
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

const redis = {
  async get(key) {
    const res = await fetch(`${BASE_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    })
    const data = await res.json()
    return data.result
  },

  async set(key, value) {
    return fetch(`${BASE_URL}/set/${key}/${value}`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    })
  },

  async del(key) {
    return fetch(`${BASE_URL}/del/${key}`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    })
  },

  async hgetall(key) {
    const res = await fetch(`${BASE_URL}/hgetall/${key}`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    })
    const data = await res.json()
    const obj = {}
    for (let i = 0; i < data.result.length; i += 2) {
      obj[data.result[i]] = data.result[i + 1]
    }
    return obj
  },

  async hset(key, value) {
    const body = new URLSearchParams()
    for (const k in value) {
      body.append(k, value[k])
    }

    return fetch(`${BASE_URL}/hset/${key}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })
  }
}

export default redis