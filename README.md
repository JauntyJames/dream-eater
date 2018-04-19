[ ![Codeship Status for JauntyJames/dream-eater](https://app.codeship.com/projects/ec91e9b0-e5d4-0135-17f2-2ec73a7d7c76/status?branch=master)](https://app.codeship.com/projects/268982)
[![Code Climate](https://codeclimate.com/github/JauntyJames/dream-eater/badges/gpa.svg)](https://codeclimate.com/github/JauntyJames/dream-eater)
[![Coverage Status](https://coveralls.io/repos/github/JauntyJames/dream-eater/badge.svg?branch=moar-tests)](https://coveralls.io/github/JauntyJames/dream-eater?branch=moar-tests)
# Dream-Eater Comicbook Library

### Intro

This website is a comicbook library and e-reader. The production website can be found [here](http://dream-eater.herokuapp.com). Comicbook PDF files are stored on Cloudinary and persisted into a PostgreSQL database, and displayed using a custom e-reader built upon Mozilla's PDF.js

### To Run

 - Clone down the repo
 - `bundle install`
 - `npm install`
 - `rake db:setup`
 - `rails server`
 - `npm start`
 - navigate your browser to `localhost:3000`
 - to run the testing suite, run `rake spec`
 - to test React components, run `npm test`

### Neat Features

- Visitors are able to sign in using either a Facebook or Goodreads omniauth, or make their own account with Devise.
- Using React-Dropzone, the entire index page is a target for drag-and-drop file uploading. In addition to visiting the New Comic form page direcly, authenticated visitors can simply drag a valid PDF into the window and will be redirected to the New Comic form.
- The e-reader, which can be loaded using the 'Read Me!' button, allows full-screen viewing.
- Pages can be turned using the nav bar, arrow keys, or by clicking directly on the left or right page.
- The trackpad can be used in full-screen to zoom in and out of the page or to pan around the page.
- Authenticated visitors can bookmark a page which will load the next time they view the comic, or add a comic to a favorites list.

### Libraries used:
* Devise
* Omniauth Facebook
* Omniauth Goodreads
* Carrierwave
* Fog-AWS
* Font Awesome Rails
* Cloudinary
* React Dropzone
* React Full-screen
* React PDF
* React HammerJs

* Ruby version - 2.3.3
