import API from './api.js'
import UTIL from './utils.js'

/**
 * INITIAL LOAD
 */
fetchStates()
fetchPlans()
// calculatePremium()
/**
 * HANDLING EVENTS
 */
addEventListenerToButton()
handleDateChange()
/**
 * FUNCTIONS
 */
function handleDateChange () {
  const date = document.getElementById('birth-date')
  date.addEventListener('blur', () => calculateAge(date.value))
}
function calculateAge (dateString) {
  const ageInput = document.getElementById('age')
  if (!Date.parse(dateString)) {
    ageInput.value = 0
    return
  }
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  ageInput.value = age
}
function addEventListenerToButton () {
  const button = document.getElementById('submit-btn')
  button.addEventListener('click', handleSubmitButton)
}
function handleSubmitButton () {
  const birthDate = document.getElementById('birth-date').value
  const state = document.getElementById('state').value
  const plan = document.getElementById('plan').value
  const age = document.getElementById('age').value
  const data = { birthDate, state, plan, age: +age }
  calculatePremium(data)
}
function calculatePremium (data) {
  const contentBox = document.getElementById('content')
  const results = document.getElementById('results')
  const alertMessage = document.getElementById('alert')
  results.innerHTML = ''
  alertMessage.innerHTML = ''
  API.calculatePremium(data).then((response) => {
    if (response.success) {
      const loader = UTIL.createLoader()
      contentBox.insertBefore(loader, contentBox.firstChild)
      // this is bad, we are just doing this to make the effect of loading
      setTimeout(() => {
        contentBox.removeChild(loader)
        const premiumEntries = response.results
        if (premiumEntries.length === 0) {
          results.appendChild(UTIL.createErrorMessage())
        } else {
          premiumEntries.forEach((item) => {
            const row = UTIL.createRow(item)
            results.appendChild(row)
          })
        }
      }, 1000)
    } else {
      alertMessage.innerHTML = response.message
    }
  })
}
function fetchStates () {
  API.fetchStates().then((response) => {
    const stateSelect = document.getElementById('state')
    const stateEntries = response.results
    stateEntries.forEach((item) => {
      const option = UTIL.createOption(item, item)
      stateSelect.appendChild(option)
    })
  })
}
function fetchPlans () {
  API.fetchPlans().then((response) => {
    const planSelect = document.getElementById('plan')
    const planEntries = response.results
    planEntries.forEach((item) => {
      const option = UTIL.createOption(item.code, item.name)
      planSelect.appendChild(option)
    })
  })
}
