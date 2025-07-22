import fs from 'node:fs'
import path from 'node:path'

const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

const { imports } = packageJSON
const rootDir = path.resolve('.')

const extensionsToResolve = ['js', 'ts', 'json']

export function resolve(importPath, parentPath) {
  if (importPath.startsWith('#')) {
    const regExp = /#(\w+)/
    const alias = `#${importPath.match(regExp)[1]}/*`
    if (imports[alias]) {
      importPath = importPath.replace(regExp, imports[alias].slice(0, -2))
    } else {
      return null
    }
  }

  if (path.isAbsolute(importPath) && isFileExists(importPath)) {
    return importPath
  }

  const resolvedPath = importPath.startsWith('..')
    ? path.resolve(path.dirname(parentPath), importPath)
    : path.resolve(rootDir, importPath)

  if (isFileExists(resolvedPath)) {
    return resolvedPath
  }

  for (const ext of extensionsToResolve) {
    const filePath = `${resolvedPath}.${ext}`
    if (isFileExists(filePath)) {
      return filePath
    }
  }

  return importPath
}

function isFileExists(filePath) {
  try {
    fs.readFileSync(filePath)
    return filePath
  } catch (err) {
    return null
  }
}
