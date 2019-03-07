// import storage from 'good-storage'
const SEARCH_KEY = '__SEARCH__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__PLAY__'
const PLAY_MAX_LENGTH = 200

const FAV_KEY = '__FAV__'
const FAV_MAX_LENGTH = 200

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

export function savePlay (song) {
  let songs
  if (!localStorage.getItem(PLAY_KEY)) {
    songs = []
  } else {
    songs = deserialize(localStorage.getItem(PLAY_KEY))
  }
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  localStorage.setItem(PLAY_KEY, serialize(songs))
  return songs
}

export function loadPlay () {
  if (!localStorage.getItem(PLAY_KEY)) {
    return []
  } else {
    return deserialize(localStorage.getItem(PLAY_KEY))
  }
}

export function saveFav (song) {
  let songs
  if (!localStorage.getItem(FAV_KEY)) {
    songs = []
  } else {
    songs = deserialize(localStorage.getItem(FAV_KEY))
  }
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, FAV_MAX_LENGTH)
  localStorage.setItem(FAV_KEY, serialize(songs))
  return songs
}

export function deleteFav (song) {
  let songs
  if (!localStorage.getItem(FAV_KEY)) {
    songs = []
  } else {
    songs = deserialize(localStorage.getItem(FAV_KEY))
  }
  deleteArray(songs, (item) => {
    return item.id === song.id
  })
  localStorage.setItem(FAV_KEY, serialize(songs))
  return songs
}

export function loadFav () {
  if (!localStorage.getItem(FAV_KEY)) {
    return []
  } else {
    return deserialize(localStorage.getItem(FAV_KEY))
  }
}
