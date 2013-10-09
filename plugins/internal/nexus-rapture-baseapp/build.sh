#!/bin/sh
basedir=`dirname $0`
basedir=`cd $basedir && pwd`

cd "$basedir/src/main/baseapp"

rm -rf build/
sencha ant clean

mkdir ../resources/static/rapture
mkdir ../resources/static/rapture/resources
mkdir ../resources/static/rapture/resources/images

# generate non-debug
sencha app build production
cp build/production/BaseApp/app.js ../resources/static/rapture/baseapp.js
cp build/production/BaseApp/resources/BaseApp-all.css ../resources/static/rapture/resources/baseapp.css

# generate debug
sencha app build testing
cp build/testing/BaseApp/app.js ../resources/static/rapture/baseapp-debug.js
cp build/testing/BaseApp/resources/BaseApp-all.css ../resources/static/rapture/resources/baseapp-debug.css

# use production images
cp -r build/production/BaseApp/resources/images/* ../resources/static/rapture/resources/images/
