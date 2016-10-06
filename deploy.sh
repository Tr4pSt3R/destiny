#!/bin/bash -l

printf "Precompiling assets..."
bundle exec rake assets:precompile --trace
printf "Completed precompiling assets!\n"

printf "Updating version control with latest asset builds..."
git add . && git ci -m "Update version control with latest asset builds"
printf "Updated version control with latest assets.\n"

printf "Pushing to Heroku production environment..."
git push heroku master
printf "Completed deployment to Heroku production environment!\n"
