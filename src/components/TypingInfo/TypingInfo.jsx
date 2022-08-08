import React from 'react'
import textItemInfo from '@/typings/textItemInfo'

function TypingInfo({ errorsCount, accuracy, charsPerMinute }) {
  return (
    <div>
      <p>
        Ошибок: <span>{errorsCount}</span>
      </p>
      <p>
        Точность: <span>{accuracy}%</span>
      </p>
      <p>
        Знаков в минуту: <span>{charsPerMinute}</span>
      </p>
    </div>
  )
}

TypingInfo.propTypes = textItemInfo

export default TypingInfo
