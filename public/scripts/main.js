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
addEventListenerToSelectPeriod()
handleDateChange()
/**
 * FUNCTIONS
 */
function calculatePeriod () {
  const period = document.getElementById('period').value
  const results = document.getElementById('results')
  console.log(results, period)
  const children = results.children
  for (let i = 0; i < children.length; i++) {
    const premium = children[i].children[1].value
    const annual = children[i].children[2]
    const monthly = children[i].children[3]
    if (+period === 0) {
      annual.value = 'Select a period'
      monthly.value = 'Select a period'
    } else {
      let annualValue = premium * (12 / period)
      if (!Number.isInteger(annualValue)) annualValue = annualValue.toFixed(2)
      let monthlyValue = premium / period
      if (!Number.isInteger(monthlyValue)) monthlyValue = monthlyValue.toFixed(2)
      annual.value = annualValue
      monthly.value = monthlyValue
    }
  }
}
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
function addEventListenerToSelectPeriod () {
  const select = document.getElementById('period')
  select.addEventListener('change', calculatePeriod)
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
      // this is bad, we are just doing this to make the loading effect
      setTimeout(() => {
        contentBox.removeChild(loader)
        const premiumEntries = response.results
        if (premiumEntries.length === 0) {
          results.appendChild(UTIL.createErrorMessage())
        } else {
          const period = document.getElementById('period').value
          premiumEntries.forEach((item) => {
            const row = UTIL.createRow(item, +period)
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
      const option = UTIL.createOption(item.code, item.code)
      planSelect.appendChild(option)
    })
  })
}
