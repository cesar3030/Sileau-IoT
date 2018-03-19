#
# This Script will be run by a jenkin task to deploy the angular app on an heroku app. 
# If the target environment is prod or dev, we use the existing apps unik-mtl and dev-unik-mtl.
# If it's a canary deploy we create a new app named after the branch name to deploy.
#
# Script invocation example:
#   PROD: `angular-deploy.sh -a unik-mtl -e prod -r api-unik-mtl`
#   DEV: `angular-deploy.sh -a dev-unik-mtl -e dev -r dev-api-unik-mtl`
#   CANARY: `angular-deploy.sh -a canary-test-feature -e canary -r api-canary-test-feature `  (assuming the branch name to deploy as a canary is canary-test-feature)
#

#!/bin/bash
set -e
 
while getopts ":a:e:r:" opt; do
  case $opt in
    a)
      HEROKU_APP=$OPTARG
      ;;
    e)
      HEROKU_ENV=$OPTARG
      ;;
    r)
      HEROKU_API_APP=$OPTARG
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

if [ -z ${HEROKU_APP+x} ]; then echo "You need to provide the Heroku APP (ex: -a unik-mtl)"; exit 1; else echo "The Angular app is going to be deploy on $HEROKU_APP"; fi
if [ -z ${HEROKU_ENV+x} ]; then echo "You need to provide the environment prod, dev or canary (ex: -e prod)"; exit 1; else echo "The deployment is going to happend on $HEROKU_ENV"; fi
if [ -z ${HEROKU_API_APP+x} ]; then echo "You need to provide the Heroku API APP(ex: -r api-unik-mtl)"; exit 1; else echo "The Angular app will use the $HEROKU_API_APP API"; fi

# Case if we are deploying a canary
if [ $HEROKU_ENV = "canary" ]; then
  HEROKU_APP="r-$HEROKU_APP-unik"
  # I retreive the list of my apps and check if the canary is already deployed
  allApps=`heroku apps`
  if [[ $allApps = *"$HEROKU_APP"* ]]; then
    echo "Canary app already created. No need to create a new one!"
  else
    echo "Creating Canary $HEROKU_APP..."
    heroku apps:create $HEROKU_APP
  fi
fi

# Delete an existing angular-deploy folder from a previous deploy
echo "Delete existing angular-deploy folder..."
rm -rf ../angular-deploy
# Creating a new angular-deploy folder to isolate the angular app
echo "Create a new angular-deploy folder..."
mkdir ../angular-deploy
# Copy the angular app code to angular-deploy
echo "Copy angular-client content to angular-deploy..."
cp -a angular-client/. ../angular-deploy
cd ../angular-deploy

# We update the content of the angular environment to have the app requesting the right Heroku API APP 
echo "Generating the environment.prod.ts file..."
cat << EOF > src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://$HEROKU_API_APP.herokuapp.com'
};
EOF

# Init a new git repo and push all the files to master
echo "Creating a new git repo..."
git init
git add -A
git commit -m "Ready to deploy angular!"

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

echo "Angular Deployed !!"