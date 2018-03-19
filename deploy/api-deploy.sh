#
# This Script will be run by a jenkin task to deploy the API express app on heroku. 
# If the target environment is prod or devHeroku, we use the existing apps api-unik-mtl and dev-api-unik-mtl.
# If it's a canary deploy we create a new app named after the branch to deploy.
#
# Script invocation example:
#   PROD: `api-deploy.sh -a api-unik-mtl -e prod`
#   DEV: `api-deploy.sh -a dev-api-unik-mtl -e devheroku`
#   CANARY: `api-deploy.sh -a canary-test-feature -e canary`  (assuming the branch name to deploy as a canary is canary-test-feature)
#

#!/bin/bash
set -e
 
while getopts ":a:e:" opt; do
  case $opt in
    a)
      HEROKU_APP=$OPTARG
      ;;
    e)
      HEROKU_ENV=$OPTARG
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

if [ -z ${HEROKU_APP+x} ]; then echo "You need to provide the Heroku APP (ex: -a <heroku_app_name>)"; exit 1; else echo "Express is going to be deploy on '$HEROKU_APP'"; fi
if [ -z ${HEROKU_ENV+x} ]; then echo "You need to provide the environment prod, dev or canary (ex: -e <env_name>)"; exit 1; else echo "The deployment is going to happend on $HEROKU_ENV"; fi

# Case if we are deploying a canary
if [ $HEROKU_ENV = "canary" ]; then
  HEROKU_APP="i-$HEROKU_APP-unik"
  # I retreive the list of my apps and check if the canary is already deployed
  allApps=`heroku apps`
  if [[ $allApps = *"$HEROKU_APP"* ]]; then
    echo "Canary app already created. No need to create a new one!"
  else
    echo "Creating Canary $HEROKU_APP..."
    heroku apps:create $HEROKU_APP
    echo "Setting environment variables..."
    heroku config:set MASTER_KEY=masterKey --app $HEROKU_APP
    heroku config:set JWT_SECRET=jwtSecret --app $HEROKU_APP
  fi
fi

# Update the Procfile to run the app with the right environment
echo "Generating the Procfile to run the right environment..."
cat << EOF > Procfile
  web: npm run $HEROKU_ENV
EOF

# Delete an existing api-deploy folder from a previous deploy
echo "Delete existing api-deploy folder..."
rm -rf ../api-deploy
# Creating a new api-deply folder to isolate the express server code
echo "Create a new api-deploy folder..."
mkdir ../api-deploy
# Copy the express server code to api-deploy
echo "Copy express server code to api-deploy..."
cp -a express-server/. ../api-deploy
cd ../api-deploy

# Init a new git repo and push all the files to master
echo "Creating a new git repo..."
git init
git add -A
git commit -m "Ready to deploy Unik API!"

# deal with remote
echo "Checking if remote exists..."
if ! git ls-remote heroku; then
  echo "Adding heroku remote..."
  git remote add heroku git@heroku.com:$HEROKU_APP.git
fi

# push only origin/master to heroku/master - will do nothing if
# master doesn't change.
echo "Updating heroku master branch..."
git push -f heroku master:master

echo "Unik API Deployed !!"