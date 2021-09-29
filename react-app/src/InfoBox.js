import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { prettyPrintStat } from "./util";
import numeral from 'numeral'
import './InfoBox.css'

const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: '1.3rem',
      '@media (max-width:600px)': {
        fontSize: '0.87rem',
      }
    },
    h2: {
      fontSize: '1.75rem',
      '@media (max-width:600px)': {
        fontSize: '1.3rem',
      }
    },
  },

})

function InfoBox({ isOrange, isGreen, isRed, isActive, title, cases, total, onClick }) {
  return (
    <Card onClick={() => { onClick() }} className={`infoBox ${isActive && 'infoBox--selected'} ${isOrange && 'infoBox--orange'} ${isRed && 'infoBox--red'}`}>
      <CardContent>
        {/* title */}
        <ThemeProvider theme={theme}>
          <Typography variant="subtitle1" className="infoBox__title" color="textSecondary">{title}</Typography>
        </ThemeProvider>
        {/* +120k Number of cases */}
        <ThemeProvider theme={theme}>
          <Typography variant="h2" className={`infoBox__cases ${isGreen && 'infoBox__cases--green'}`}>{numeral(cases).format('0,0')}</Typography>
        </ThemeProvider>

        {/* 1.2M Total */}
        <ThemeProvider theme={theme}>
          <Typography variant="subtitle1" className="infoBox__total" color="textSecondary">
            {prettyPrintStat(total)} Total
          </Typography>
        </ThemeProvider>
      </CardContent>
    </Card>
  )
}

export default InfoBox