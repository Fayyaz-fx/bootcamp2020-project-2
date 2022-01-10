import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host':
              'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
            'x-rapidapi-key':
              'ec53e7658dmsh52ae06f4f1ac5d4p10b957jsn9ea55f19924a',
          },
        }
      )
      const fetchedAPI = await response.json()
      setFetchedCountries(fetchedAPI)
    }
    fetchCountries()
  }, [setFetchedCountries])

  return (
    <FormControl>
      <NativeSelect
        defaultValue=''
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        {fetchedCountries.map((country, index) => {
          return (
            <option key={index} value={country.ThreeLetterSymbol}>
              {country && country.Country}
            </option>
          )
        })}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker
