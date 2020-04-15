# Chrome extension
rm -rf build/*
cp -r chrome build/chrome
cp grid.user.js build/chrome/grid.user.js
rm build/chrome/screenshot.jpg
rm build/chrome/small-promo.png
rm build/chrome/large-promo.png
rm build/chrome/marquee-promo.png
zip -r -j build/chrome.zip build/chrome
