# Chrome extension
rm -rf build/*
cp -r chrome build/chrome
cp grid.user.js build/chrome/grid.user.js
rm build/chrome/screenshot.jpg
zip -r -j build/chrome.zip build/chrome
