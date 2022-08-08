import React from 'react'
import PropTypes from 'prop-types'
import textitem from '@/typings/textitem'
import classes from './style.module.scss'

function TextsHistory({ textsHistoryList, deleteRecords }) {
  const deleteAllRecords = () => {
    deleteRecords('all')
  }

  return (
    <div>
      <hr />
      <h4>Предыдущие результаты:</h4>
      {textsHistoryList.length ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <td className={classes.textCol}>Текст</td>
                <td>Точность</td>
                <td>Знаков в минуту</td>
                <td>Ошибок</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {textsHistoryList.map((textItem) => {
                return (
                  <tr key={textItem.id}>
                    <td className={classes.textCol}>{textItem.text}</td>
                    <td>{textItem.accuracy}%</td>
                    <td>{textItem.charsPerMinute}</td>
                    <td>{textItem.errorsCount}</td>
                    <td>
                      <button
                        className={`${classes.removeBtn} btn btn-danger`}
                        type="button"
                        onClick={() => deleteRecords(textItem)}>
                        X
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <button type="button" onClick={deleteAllRecords} className="btn btn-danger">
            Удалить всё
          </button>
        </>
      ) : (
        <h4 className={classes.noResultsTitle}>Список пуст...</h4>
      )}
    </div>
  )
}

TextsHistory.propTypes = {
  textsHistoryList: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      ...textitem,
    })
  ).isRequired,
  deleteRecords: PropTypes.func.isRequired,
}

export default TextsHistory
