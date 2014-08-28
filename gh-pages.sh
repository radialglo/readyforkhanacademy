#!/bin/bash


GH=gh-pages
M=master
OUTDIR="."
ORIGIN="github"
DATE=$(date)

if [ ! -d "node_modules" ]; then
    npm i
fi

./node_modules/.bin/jade -o $OUTDIR views/index.jade
# If -B is given, <new_branch> is created if it doesn’t exist; otherwise, it is reset. This is the transactional equivalent of

# $ git branch -f <branch> [<start point>]
# $ git checkout <branch>
# that is to say, the branch is not reset/created unless "git checkout" is successful.
git checkout -B $GH
# git merge $M 
rm -rf Procfile app.js package.json Gruntfile.js README.md node_modules views
mv assets/* .
# rmdir assets
git add --all .
git commit -m "$DATE"
git push --force $ORIGIN $GH

git checkout $M
