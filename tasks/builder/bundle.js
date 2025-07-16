import fs from 'node:fs'
import path from 'node:path'

/**
 * Примерный алгоритм работы бандлера:
 * 1. Прочитать entry и собрать список всех вызовов require
 * 2. Пройтись по полученным require (они могут быть вложенными)
 * 3. На выходе получится массив с исходным кодом всех модулей
 * 4. Склеить всё воедино обернув модули и entry в новый рантайм
 *
 * Для чтения файлов используйте fs.readFileSync
 * Для резолва пути до модуля испльзуйте path.resolve (вам нужен путь до родителя где был вызван require)
 * Пока что сборщик упрощен, считаем что require из node_modules нет
 */

/**
 * @param {string} entryPath - путь к entry бандлинга
 */
export function bundle(entryPath) {
  const output = []
  const paths = new Set()
  paths.add(`./${path.parse(entryPath).base}`)
  const entryDir = path.dirname(entryPath)
  let entryCode = fs.readFileSync(entryPath, 'utf-8')
  let requireCalls = searchRequireCalls(entryCode)

  while (requireCalls.length) {
    requireCalls.map((requirePath) => {
      paths.add(requirePath)
      entryCode = fs.readFileSync(
        path.resolve(entryDir, requirePath),
        'utf-8',
      )
      requireCalls = searchRequireCalls(entryCode)
    })
  }
  output.push(...paths.values())
  output.reverse()

  const code = output.map((module) => {
    const modulePath = path.resolve(entryDir, module)

    let content = fs.readFileSync(modulePath, 'utf8')

    let lines = content.split(/\r?\n/)

    let filtered = lines.filter((line) => !line.includes('require('))

    let newContent = filtered
      .join('\n')
      .replace(/\s\n/g, '')
      .replace(/module\.exports\s*=\s*{[^}]*};?/g, '')
    return newContent
  })
  return code.join('\n')
}
/**
 * Функция для поиска в файле вызовов require
 * Возвращает id модулей
 * @param {string} code
 */
function searchRequireCalls(code) {
  return [...code.matchAll(/require\(('|")(.*)('|")\)/g)].map(
    (item) => item[2],
  )
}

