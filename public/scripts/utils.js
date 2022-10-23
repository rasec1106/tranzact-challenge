function createInput (value) {
  const input = document.createElement('input')
  input.value = value
  input.type = 'text'
  input.className += 'input table-column'
  input.disabled = true
  return input
}
function createAnnualInput (value, period) {
  return createInput(value)
}
function createMonthlyInput (value, period) {
  return createInput(value)
}
function createRow (items) {
  const row = document.createElement('div')
  row.className += 'table-row grid-4'
  Object.values(items).forEach(item => {
    const input = createInput(item)
    row.appendChild(input)
  })
  row.appendChild(createAnnualInput(0, 0))
  row.appendChild(createMonthlyInput(0, 0))
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
  createRow: items => createRow(items),
  createOption: (value, label) => createOption(value, label),
  createLoader: () => createLoader(),
  createErrorMessage: () => createErrorMessage(),
  setCarouselImages: images => console.log(images)
}

export default util
