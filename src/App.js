import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Header from './components/Header'
import DataPaper from './components/DataPaper'
import Chart from './components/Chart'
import CountryPicker from './components/CountryPicker'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function FullWidthGrid() {
  const [countryCode, setcountryCode] = useState('')

  const classes = useStyles()
  const handleCountryChange = async (code) => {
    setcountryCode(code)
  }

  return (
    <div className={classes.root}>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <DataPaper />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <CountryPicker handleCountryChange={handleCountryChange} />
            <Chart countryCode={countryCode && countryCode} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
