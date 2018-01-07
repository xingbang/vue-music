// import storage from 'good-storage'
const SEARCH_KEY = '__SEARCH__'
const SEARCH_MAX_LENGTH = '15'

function insertArray (arr, val, compare, maxLen) {
  let index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
function deleteArray (arr, compare) {
  let index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
// set封装
function serialize (val) {
  return JSON.stringify(val)
}
// get封装
function deserialize (val) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}
export function saveSearch (query) {
  let searches
  // let searches = storage.get(SEARCH_KEY, [])
  if (!localStorage.getItem(SEARCH_KEY)) {
    searches = []
  } else {
    searches = deserialize(localStorage.getItem(SEARCH_KEY))
  }
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  localStorage.setItem(SEARCH_KEY, serialize(searches))
  return searches
}
export function loadSearch () {
  if (!localStorage.getItem(SEARCH_KEY)) {
    return []
  } else {
    return deserialize(localStorage.getItem(SEARCH_KEY))
  }
}
export function deleteSearch (query) {
  let searches
  if (!localStorage.getItem(SEARCH_KEY)) {
    searches = []
  } else {
    searches = deserialize(localStorage.getItem(SEARCH_KEY))
  }
  deleteArray(searches, (item) => {
    return item === query
  })
  localStorage.setItem(SEARCH_KEY, serialize(searches))
  return searches
}
export function clearSearch () {
  localStorage.removeItem(SEARCH_KEY)
  return []
}
