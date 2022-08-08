import React from 'react'
import classes from './Loader.module.scss'

const DIVS_COUNT = 12

export default function Loader() {
  return (
    <div className={classes.ldsSpinner}>
      {Array(DIVS_COUNT)
        .fill(null)
        .map((_, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={idx} />
        ))}
    </div>
  )
}
