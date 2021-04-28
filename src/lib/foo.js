export const findIndexAfterMatch = (text, searchTerm) => {
  const firstPos = text.indexOf(searchTerm)
  return searchTerm.length + firstPos
}

export const insertString = (string, insert, pos) => {
  const front = string.slice(0, pos)
  const back = string.slice(-(string.length - pos))
  return `${front}\n${insert}${back}`
}

export const camelCase = (w) => w.charAt(0).toUpperCase() + w.slice(1)
