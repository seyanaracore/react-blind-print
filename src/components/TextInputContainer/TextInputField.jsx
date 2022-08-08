import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useEventListener from '@/hooks/useEventListener'
import classes from './TextInput.module.scss'

function TextInputField({ textForTyping, getClasses, inputHandler }) {
  const textInput = useRef()

  useEffect(() => {
    textInput.current.focus()
  }, [])

  useEventListener('keydown', inputHandler, textInput.current)
  return (
    <div className={classes.inputFieldContainer} ref={textInput} role="textbox" tabIndex="-1">
      {textForTyping.split('').map((char, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={idx} className={getClasses(idx)}>
          {char}
        </span>
      ))}
    </div>
  )
}

TextInputField.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  textForTyping: PropTypes.string.isRequired,
  getClasses: PropTypes.func.isRequired,
}

export default TextInputField
