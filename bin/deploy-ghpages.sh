#!/usr/bin/env bash

cd dist
git init
git add -A
git commit -m 'deploy new version'
git push -f git@github.com:wangwii/shuili-web-pages.git master:gh-pages

cd -