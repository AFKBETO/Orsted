export const nhentai = require('nhentai-js')

export const parseTagList = (tags: string[]) => {
  let result = ''
  for (const tag in tags) {
    result += tag + ', '
  }
  return result.slice(0, result.length - 2)
}