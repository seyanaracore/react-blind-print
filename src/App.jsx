import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.scss'
import React, { useCallback, useEffect, useState } from 'react'
import getText from '@/api/getText'
import BlindTyping from './components/BlindTyping'
import Header from './components/Header'
import TextsHistory from './components/TextsHistory'
import Loader from './components/UI/Loader'
import useFetching from './hooks/useFetching'
import { LOCAL_TYPING_RESULTS_KEY } from './constants'
import LocalStorageUtil from './utils/localStorage'

function App() {
  const [textForTyping, setTextForTyping] = useState('')
  const [textsHistoryList, setTextsHistoryList] = useState([])

  const textFetcher = useCallback(async () => {
    const response = await getText()
    const [text] = response

    setTextForTyping(text)
  }, [])

  const [fetchText, error, isLoading] = useFetching(textFetcher)

  const getTextsHistory = () => {
    // Read text rusults from LocalStorage
    const previusResults = LocalStorageUtil.get(LOCAL_TYPING_RESULTS_KEY) || []

    setTextsHistoryList(previusResults)
  }

  const deleteRecords = useCallback(
    // Clear LocalStorage
    (record) => {
      if (!record) return

      if (record === 'all') {
        LocalStorageUtil.delete(LOCAL_TYPING_RESULTS_KEY)
      } else {
        const filteredTexts = textsHistoryList.filter((text) => text.id !== record.id)

        LocalStorageUtil.set(filteredTexts, LOCAL_TYPING_RESULTS_KEY)
      }

      getTextsHistory()
    },
    [textsHistoryList]
  )

  useEffect(() => {
    fetchText()
    getTextsHistory()
  }, [])

  const saveTextResult = useCallback(
    // Write data to LocalStorage
    (textResult) => {
      if (!textResult) return

      // eslint-disable-next-line no-unsafe-optional-chaining
      const textWithId = { ...textResult, id: textsHistoryList.at(-1)?.id + 1 || 1 }

      LocalStorageUtil.set([...textsHistoryList, textWithId], LOCAL_TYPING_RESULTS_KEY)
      getTextsHistory()
    },
    [textsHistoryList]
  )

  return (
    <div className="App">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <BlindTyping
          fetchText={fetchText}
          textForTyping={textForTyping}
          saveTextResult={saveTextResult}
        />
      )}
      <TextsHistory textsHistoryList={textsHistoryList} deleteRecords={deleteRecords} />
      {error && (
        <div>
          <h2>Ошибка: {error}</h2>
          <button type="button" onClick={fetchText}>
            Попробовать ещё раз
          </button>
        </div>
      )}
    </div>
  )
}

export default App
