#!/bin/bash -l

echo "Precompiling assets..."
bundle exec rake assets:precompile --trace
echo "Completed precompiling assets!"

echo "Updating version control with latest asset builds..."
git add . && git ci -m "Update version control with latest asset builds"
echo "Updated version control with latest assets."

echo "Pushing to Heroku production environment..."
git push heroku master
echo "Completed deployment to Heroku production environment!"
