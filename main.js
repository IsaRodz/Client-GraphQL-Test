const continentSelect = document.getElementById('continentSelect')
const countriesList = document.getElementById('countriesList')

queryFetch(`
        query {
            continents {
                name
                code
            }
        }`)
.then(result => {
    result.data.continents.forEach(continent => {
        let option = document.createElement('option')
        option.value = continent.code
        option.innerText = continent.name

        continentSelect.append(option)
    })
})

continentSelect.addEventListener('change', async e => {
   let code = e.target.value
   let countries = await getCountries(code)
   console.log(countries);
   let html = ''
   countries.forEach(country => {
        html += `<li>${country.name}</li>`
    })
   countriesList.innerHTML = html 
})

function getCountries(code) {
    return queryFetch(`
    query getCountries($code: ID!) {
        continent(code: $code) {
           countries {
            name
          }
        }
    }`, { code })
    .then(result => {
        return result.data.continent.countries
    }) 
}

function queryFetch(query, variables) {
    return fetch('https://countries.trevorblades.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query,
            variables
        })
    })
    .then(response => response.json())
}