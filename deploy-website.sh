#!/bin/bash

# If there are any errors, fail Travis
set -e

# Set a default API environment for other branches/pull requests
APIENVIRONMENT=1

# Define variables depending on the branch
if [[ $TRAVIS_BRANCH == 'develop' ]]
  then
    GH_REPO="github.com/StreetSupport/dev-charter.streetsupport.net.git"
    DOMAIN="charter-dev.streetsupport.net"
    APIENVIRONMENT=1
fi

# Get the commit details
THE_COMMIT=`git rev-parse HEAD`

# Set git details
git config --global user.email "enquiry@streetsupport.net"
git config --global user.name "Travis CI"

# Set environment
cd src/js
rm env.js
cat > env.js << EOF
module.exports = $APIENVIRONMENT
EOF

echo "env file rewritten to:"
cat env.js

cd ../../

# Run gulp
gulp deploy --debug --production

# Move to created directory
cd _dist

# Create CNAME file and populate with domain depending on branch
cat > CNAME << EOF
$DOMAIN
EOF

# Push to git by overriding previous commits
# IMPORTANT: Supress messages so nothing appears in logs
if [[ $TRAVIS_BRANCH == 'develop' ]]
  then
    git init
    git add -A
    git commit -m "Travis CI automatic build for $THE_COMMIT"
    git push --force --quiet "https://${GH_TOKEN}@${GH_REPO}" master:gh-pages > /dev/null 2>&1
  else
    echo "Not on a build branch so don't push the changes to GitHub Pages"
fi
