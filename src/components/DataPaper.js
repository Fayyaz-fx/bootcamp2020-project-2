import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import CountUp from 'react-countup'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: theme.spacing(16),
      padding: '20px 0 0 0',
    },
  },
}))

export default function DataPaper() {
  const classes = useStyles()
  const [globalData, setGlobalData] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true)
      const response = await fetch(
        `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world`,
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
        ActiveCases: apiData[0].ActiveCases,
        TotalRecovered: apiData[0].TotalRecovered,
        TotalDeaths: apiData[0].TotalDeaths,
      }
      setGlobalData(destructuredData)
      setLoading(false)
    }
    fetchAPI()
  }, [])

  const { TotalCases, ActiveCases, TotalRecovered, TotalDeaths } = globalData
  if (loading) {
    return <h1>Loading Data....</h1>
  }

  return (
    <div className={classes.root}>
      <Paper>
        <Typography variant='h3' gutterBottom style={{ color: 'black' }}>
          <CountUp start={0} end={TotalCases} duration={2.5} separator=',' />
          <Typography variant='subtitle2'>Total Cases</Typography>
        </Typography>
      </Paper>
      <Paper>
        <Typography variant='h3' gutterBottom style={{ color: 'orange' }}>
          <CountUp start={0} end={ActiveCases} duration={2.5} separator=',' />

          <Typography variant='subtitle2'>Active</Typography>
        </Typography>
      </Paper>
      <Paper>
        <Typography variant='h3' gutterBottom style={{ color: 'green' }}>
          <CountUp
            start={0}
            end={TotalRecovered}
            duration={2.5}
            separator=','
          />

          <Typography variant='subtitle2'>Recovered</Typography>
        </Typography>
      </Paper>
      <Paper>
        <Typography variant='h3' gutterBottom style={{ color: 'red' }}>
          <CountUp start={0} end={TotalDeaths} duration={2.5} separator=',' />

          <Typography variant='subtitle2'>Fatalities</Typography>
        </Typography>
      </Paper>
    </div>
  )
}
