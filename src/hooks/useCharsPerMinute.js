import { useState, useMemo, useCallback } from 'react'

/**
 * @callback setKeysCountInSecond
 * @param {number} keys - keys count pressed in the last second
 */

/**
 * Returns average chars per minute, observation initiation handler, state chars per second cleaner
 * @param {setKeysCountInSecond} setKeysCountInSecond - State setter of the keys pressed in the last second
 */

function useCharsPerMinute(setKeysCountInSecond) {
  // Array with keys pressed per second
  const [keysCountsListPerSecond, setKeysCountsListPerSecond] = useState([])

  // Calculate the sum of the keys and divide by the elapsed time and multiply on 60 seconds = average value
  const charsPerMinute = useMemo(() => {
    const keysSummary = keysCountsListPerSecond.reduce((a, b) => a + b, 0)

    return Math.floor(keysSummary / keysCountsListPerSecond.length) * 60 || 0
  }, [keysCountsListPerSecond])

  // Write the number of keys to the array and reset the value
  const startCpmWatcher = useCallback(() => {
    return setInterval(() => {
      setKeysCountInSecond((keys) => {
        setKeysCountsListPerSecond((prev) => [...prev.slice(-59), keys])
        return 0
      })
    }, 1000)
  }, [setKeysCountInSecond])

  const clearCharsPerMinute = useCallback(() => {
    setKeysCountsListPerSecond([])
  }, [setKeysCountsListPerSecond])

  return { charsPerMinute, startCpmWatcher, clearCharsPerMinute }
}

export default useCharsPerMinute
