import fs from 'node:fs'
import { transformer } from './transformer.js'
import * as astring from 'astring'
import { parse } from 'acorn'

// read file with source code
const source = fs.readFileSync('./entry.js', 'utf-8')
// get ast from source code
const ast = parse(source, { ecmaVersion: 2020, sourceType: 'module' })
// transform ast
const transformedAST = transformer(ast)
// convert ast to source code
const result = astring.generate(transformedAST)
// write source code to file
fs.writeFileSync('./result.js', result)
