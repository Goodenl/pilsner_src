#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# copy dist
rsync -avr ./dist/* /home/gooden/temp/git/pilsner/

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

cd /home/gooden/temp/git/pilsner/

git config --global user.email "denmatyash522@gmail.com"
git config --global user.name "Goodenl"

git add * && git commit -am "deploy" && git push -u origin gh-pages


# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:Goodenl/applk2.git main:gh-pages
