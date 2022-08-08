import React from 'react'
import textItemInfo from '@/typings/textItemInfo'
import classes from './TypingInfo.module.scss'

function TypingInfo({ errorsCount, accuracy, charsPerMinute }) {
  return (
    <div className={classes.infoBlock}>
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
