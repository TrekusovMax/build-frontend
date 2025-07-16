import fs from 'node:fs'

import { bundle } from './bundle.js'

const output = bundle(process.argv[2])

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
}
fs.writeFileSync(`./dist/main.js`, output)
