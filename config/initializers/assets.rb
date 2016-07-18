# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w( logo.png background_light.jpg fonts/stylesheet.css base.css)

# add all image subdirectories in vendor folder
Dir.glob("#{Rails.root}/vendor/assets/images/**/").each do |path|
  Rails.application.config.assets.paths << path
end
