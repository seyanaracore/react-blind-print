import Api from '@/utils/api'
import { API_URL, SENTENCES_COUNT } from '@/constants'

function getText(url = API_URL, sentences = SENTENCES_COUNT) {
  return Api.get(`${url}?type=all-meat&sentences=${sentences}`)
}

export default getText
