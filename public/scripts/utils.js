function createInput (value) {
  const input = document.createElement('input')
  input.value = value
  input.type = 'text'
  input.className += 'input table-column'
  input.disabled = true
  return input
}
function createAnnualInput (value, period) {
  if (period === 0) return createInput('Select a period')
  let result = value * (12 / period)
  if (!Number.isInteger(result)) result = result.toFixed(2)
  return createInput(result)
}
function createMonthlyInput (value, period) {
  if (period === 0) return createInput('Select a period')
  let result = value / period
  if (!Number.isInteger(result)) result = result.toFixed(2)
  return createInput(result)
}
function createRow (items, period) {
  const row = document.createElement('div')
  row.className += 'table-row grid-4'
  const values = Object.values(items)
  values.forEach(item => {
    const input = createInput(item)
    row.appendChild(input)
  })
  row.appendChild(createAnnualInput(values[1], period))
  row.appendChild(createMonthlyInput(values[1], period))
  return row
}
function createOption (value, label) {
  const option = document.createElement('option')
  option.value = value
  option.label = label
  return option
}
function createErrorMessage () {
  const message = document.createElement('div')
  message.innerHTML = 'Sorry, no results were found'
  message.className += 'error-message'
  return message
}
function createLoader () {
  const loader = document.createElement('div')
  loader.className += 'lds-roller'
  loader.innerHTML = `
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  `
  return loader
}

const util = {
  createRow: (items, period) => createRow(items, period),
  createOption: (value, label) => createOption(value, label),
  createLoader: () => createLoader(),
  createErrorMessage: () => createErrorMessage()
}

export default util
