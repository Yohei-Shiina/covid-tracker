import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { prettyPrintStat } from "./util";
import numeral from 'numeral'
import './InfoBox.css'

function InfoBox({ isOrange, isGreen, isRed, isActive, title, cases, total, onClick }) {
  return (
    <Card onClick={() => { onClick() }} className={`infoBox ${isActive && 'infoBox--selected'} ${isOrange && 'infoBox--orange'} ${isRed && 'infoBox--red'}`}>
      <CardContent>
        {/* title */}
        <Typography className="infoBox__title" color="textSecondary">{title}</Typography>
        {/* +120k Number of cases */}
        <h2 className={`infoBox__cases ${isGreen && 'infoBox__cases--green'}`}>{numeral(cases).format('0,0')}</h2>
        {/* 1.2M Total */}
        <Typography className="infoBox__total" color="textSecondary">
          {prettyPrintStat(total)} Total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
