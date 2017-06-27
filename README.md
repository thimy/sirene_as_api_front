# sirene_as_api_front

> Front-end pour l'API sirene

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
## Run in dev mode :

``` bash

# Launch back-end : in sirene_as_api folder, run
rails s

# Back-end is launched on localhost:3000
# Launch SOLR server :
rake sunspot:solr:start

# Finally, go to sirene_as_api_front folder and start npm :
npm run dev
# Front-end load automatically on localhost:8080
