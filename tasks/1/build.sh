#!/bin/bash
if ! [ -d "dist" ]; then
  mkdir "dist"
fi

cat src/jquery.js src/index.js | tr -d '\n'| tr -d '\r' | tr -s '[:space:]'> dist/entry.js
