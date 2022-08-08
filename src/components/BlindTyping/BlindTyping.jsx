import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import ControlButtons from '../ControlButtons'
import TypingInfo from '../TypingInfo'
import TextInputContainer from '../TextInputContainer'
import getBlindTypingReducer from './BlindTyping.reducer'
import classes from './style.module.scss'

function BlindTyping({ fetchText, textForTyping, saveTextResult }) {
  const [state, dispatch] = getBlindTypingReducer()
  const { errorsCount, charsPerMinute } = state

  const accuracy = useMemo(() => {
    const errorsPercent = +((errorsCount / textForTyping.length) * 100).toFixed(1)

    return 100 - errorsPercent || 100
  }, [errorsCount, fetchText])

  const textEnteredHandler = () => {
    const textResult = {
      text: textForTyping,
      errorsCount,
      accuracy,
      charsPerMinute,
    }

    saveTextResult(textResult)
    fetchText()
  }

  const resetProgress = () => {
    dispatch({ type: 'reset' })
  }

  return (
    <div>
      <TextInputContainer
        textForTyping={textForTyping}
        textEnteredHandler={textEnteredHandler}
        dispatch={dispatch}
        expectedCharIndex={state.expectedCharIndex}
        isInputStarted={state.isInputStarted}
      />
      <aside className={classes.aside}>
        <ControlButtons restartHandler={resetProgress} getNewTextHandler={fetchText} />
        <TypingInfo errorsCount={errorsCount} accuracy={accuracy} charsPerMinute={charsPerMinute} />
      </aside>
    </div>
  )
}

BlindTyping.propTypes = {
  fetchText: PropTypes.func.isRequired,
  textForTyping: PropTypes.string.isRequired,
  saveTextResult: PropTypes.func.isRequired,
}

export default BlindTyping
