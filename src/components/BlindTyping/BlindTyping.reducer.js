import { useReducer } from 'react'

const initialState = {
  expectedCharIndex: 0,
  errorsCount: 0,
  charsPerMinute: 0,
  isInputStarted: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'upExpectedCharIndex':
      return { ...state, expectedCharIndex: state.expectedCharIndex + 1 }
    case 'upErrorsCount':
      return { ...state, errorsCount: state.errorsCount + 1 }
    case 'setCharsPerMinute':
      return { ...state, charsPerMinute: action.payload }
    case 'setIsInputStarted':
      return { ...state, isInputStarted: action.payload }
    case 'reset':
      return initialState
    default:
      return state
  }
}

const getBlindTypingReducer = () => useReducer(reducer, initialState)

export default getBlindTypingReducer
