import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AVADING_KEYS } from '@/constants'
import useCharsPerMinute from '@/hooks/useCharsPerMinute'
import layoutValidator from '@/utils/layoutValidator'
import classNames from 'classnames'
import classes from './style.module.scss'
import TextInputField from './TextInputField'

export default function TextInputContainer({
  textForTyping,
  textEnteredHandler,
  expectedCharIndex,
  isInputStarted,
  dispatch,
}) {
  const [isInputError, setIsInputError] = useState(false)
  const [incorrectLayout, setIncorrectLayout] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [keysCountInSecond, setKeysCountInSecond] = useState(0) // Keys pressed count in one second

  const { charsPerMinute, startCpmWatcher, clearCharsPerMinute } =
    useCharsPerMinute(setKeysCountInSecond)

  useEffect(() => {
    dispatch({ type: 'setCharsPerMinute', payload: charsPerMinute }) // On every change dispatching actualy data to parent reducer
  }, [charsPerMinute])

  const inputHandler = useCallback(
    (e) => {
      const pressedKey = e.key
      const isAvadingKey = AVADING_KEYS.some((avaidingKey) => avaidingKey === pressedKey) // Check on service keys

      if (isAvadingKey) return
      if (!isInputStarted) dispatch({ type: 'setIsInputStarted', payload: true }) // Initializing the chars per minute observer

      if (!layoutValidator(pressedKey)) setIncorrectLayout(true) // Show error block to user
      else setIncorrectLayout(false)

      const exceptedKey = textForTyping[expectedCharIndex]

      if (pressedKey === exceptedKey) {
        dispatch({ type: 'upExpectedCharIndex' })
        setIsInputError(false)
        setKeysCountInSecond((prev) => prev + 1)
      } else {
        if (isInputError) return
        dispatch({ type: 'upErrorsCount' })
        setIsInputError(true) // Letter ui highlighting
      }
    },
    [isInputError, textForTyping, expectedCharIndex]
  )

  useEffect(() => {
    // if expected char index equal text string length then text input is completed - call handler
    if (textForTyping && expectedCharIndex === textForTyping.length) textEnteredHandler()
  }, [expectedCharIndex])

  useEffect(() => {
    const charsPerSecondWacher = isInputStarted ? startCpmWatcher() : null

    if (!isInputStarted) {
      clearInterval(charsPerSecondWacher)
      clearCharsPerMinute()
    }

    return () => {
      clearInterval(charsPerSecondWacher)
    }
  }, [isInputStarted])

  const getCharClasses = useCallback(
    // Letters hightlighting classes
    (idx) =>
      classNames({
        [classes.aviableChar]: idx === expectedCharIndex,
        [classes.wrongChar]: isInputError && idx === expectedCharIndex,
        [classes.enteredChar]: idx < expectedCharIndex,
      }),
    [expectedCharIndex, isInputError]
  )

  return (
    <div>
      {incorrectLayout && <p>Неверная раскладка</p>}
      <hr />
      <TextInputField
        textForTyping={textForTyping}
        getClasses={getCharClasses}
        inputHandler={inputHandler}
      />
    </div>
  )
}

TextInputContainer.propTypes = {
  textForTyping: PropTypes.string.isRequired,
  expectedCharIndex: PropTypes.number.isRequired,
  isInputStarted: PropTypes.bool.isRequired,
  textEnteredHandler: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}
