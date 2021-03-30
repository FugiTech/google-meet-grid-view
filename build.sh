rm -rf build/*
cp -r extension build/extension
cp grid.user.js build/extension
cp extension.js build/extension
cp extension.css build/extension
rm build/extension/screenshot.png
rm build/extension/small-promo.png
rm build/extension/large-promo.png
rm build/extension/marquee-promo.png
zip -r -j build/extension.zip build/extension
