import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Paper, Typography } from '@material-ui/core'
import CountUp from 'react-countup'
import axios from 'axios'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Chart = ({ countryCode }) => {
  const [reqCountry, setReqCountry] = useState([])

  useEffect(() => {
    const fetchOneCountry = async () => {
      const response = await axios.get(
        `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/covid-ovid-data/sixmonth/${
          countryCode ? countryCode : 'afg'
        }`,
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

      setReqCountry(response.data.reverse())
    }
    fetchOneCountry()
  }, [countryCode])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        color: 'blue',

        text: `Showing past six months data`,
      },
    },
  }
  const labels = reqCountry.map(({ date }) => date)
  const data = {
    labels,
    datasets: [
      {
        data: reqCountry.map(({ new_cases }) => new_cases),
        label: 'Infected',
        borderColor: '#3333ff',
        fill: true,
      },
      {
        data: reqCountry.map(({ new_deaths }) => new_deaths),
        label: 'Deaths',
        borderColor: 'rgba(255,0,0)',
        backgroundColor: 'rgba(255,0,0,0.5)',
        fill: true,
      },
      {
        data: reqCountry.map(({ total_cases }) => total_cases),
        label: 'Total Infected',
        borderColor: 'rgba(255,165,0)',
        backgroundColor: 'rgba(255,165,0, 0.5)',
        fill: true,
      },

      {
        data: reqCountry.map(({ total_deaths }) => total_deaths),
        label: 'Total deaths',
        borderColor: 'rgba(0,0,0)',
        backgroundColor: 'rgba(0,0,0,0.5)',
        fill: true,
      },
    ],
  }

  return <Line options={options} data={data} />
}

export default Chart
