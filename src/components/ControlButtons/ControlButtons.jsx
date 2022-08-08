import React from 'react'
import PropTypes from 'prop-types'
import classes from './ControlButtons.module.scss'

function ControlButtons({ restartHandler, getNewTextHandler }) {
  return (
    <div className={classes.controlButtonsContainer}>
      <button type="button" className="btn btn-primary" onClick={getNewTextHandler}>
        Новый текст
      </button>
      <button type="button" className="btn btn-warning" onClick={restartHandler}>
        Рестарт
      </button>
    </div>
  )
}

ControlButtons.propTypes = {
  restartHandler: PropTypes.func.isRequired,
  getNewTextHandler: PropTypes.func.isRequired,
}

export default ControlButtons
