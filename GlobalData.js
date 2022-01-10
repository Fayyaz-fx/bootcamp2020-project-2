import React, { useState, useEffect } from 'react'

const GlobalData = () => {
  const [globalData, setGlobalData] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true)
      const response = await fetch(
        'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world',
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
      const apiData = await response.json()
      const destructuredData = {
        TotalCases: apiData[0].TotalCases,
        ActiveCases: apiData[0].TotalCases,
        TotalRecovered: apiData[0].TotalRecovered,
        TotalDeaths: apiData[0].TotalDeaths,
      }
      setGlobalData(destructuredData)
      setLoading(false)
    }
    fetchAPI()
  }, [setGlobalData])
  const { TotalCases, ActiveCases, TotalRecovered, TotalDeaths } = globalData
  if (loading) {
    return <h1>Loading Data....</h1>
  }
  return (
    <div>
      <h1>{TotalCases}</h1>
    </div>
  )
}

export default GlobalData
