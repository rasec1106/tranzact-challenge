import axios from 'axios'

const results = document.getElementById('results')

const fetchData = async (url) => {
  try {
    const data = await axios.get(url)
    const people = data.data.map((person) => {
      return `<h5>${person.name}</h5>`
    })
    results.innerHTML = people.join('')
  } catch (err) {
    results.innerHTML = '<div class="alert alert-danger">Can\'t fetch data</div>'
  }
}
fetchData('/api/plans')
