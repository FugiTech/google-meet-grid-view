# Chrome extension
rm -rf build/*
cp -r extension build/extension
rm build/extension/screenshot.png
rm build/extension/small-promo.png
rm build/extension/large-promo.png
rm build/extension/marquee-promo.png
zip -r -j build/extension.zip build/extension

cp -r build/extension build/dev-extension
cp grid.user.js build/dev-extension
cp extension.js build/dev-extension
cp extension.css build/dev-extension
sed -i "s|'https://cdn.jsdelivr.net/gh/Fugiman/google-meet-grid-view/grid.user.min.js'|chrome.extension.getURL('grid.user.js')|g" build/dev-extension/content.js
sed -i 's|https://cdn.jsdelivr.net/gh/Fugiman/google-meet-grid-view/extension.min.js|extension.js|g' build/dev-extension/popup.html
sed -i 's|https://cdn.jsdelivr.net/gh/Fugiman/google-meet-grid-view/extension.min.css|extension.css|g' build/dev-extension/popup.html
zip -r -j build/dev-extension.zip build/dev-extension
