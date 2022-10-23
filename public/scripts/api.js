const BASE_URL = '/api'
const PREMIUM_URL = '/premium'
const STATE_URL = '/states'
const PLAN_URL = '/plans'

async function fetchWithMethod (url = '', data = {}, method = 'GET') {
  const options = {
    method, // GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }
  if (method !== 'GET') {
    options.body = JSON.stringify(data)
  }
  const response = await fetch(url, options)
  return response.json()
}
const api = {
  calculatePremium: async (data = {}) => {
    return await fetchWithMethod(BASE_URL + PREMIUM_URL + '/calculatePremium', data, 'POST')
  },
  fetchStates: async () => {
    return await fetchWithMethod(BASE_URL + STATE_URL)
  },
  fetchPlans: async () => {
    return await fetchWithMethod(BASE_URL + PLAN_URL)
  }
}
export default api
