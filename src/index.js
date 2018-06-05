// Synchronously load TTF fonts.
// First, have Webpack load their data as Base 64 strings.
/* eslint-disable global-require */
const FONTS = {
	'Sans Serif': require('base64-loader!./NotoSans-Medium.ttf'),
	'Serif': require('base64-loader!./SourceSerifPro-Regular.otf'),
	'Handwriting': require('base64-loader!./handlee-regular.ttf'),
	'Marker': require('base64-loader!./knewave.ttf'),
	'Curly': require('base64-loader!./Griffy-Regular.ttf'),
	'Pixel': require('base64-loader!./Grand9K-Pixel.ttf'),
	// @todo remove fonts below when font conversion on import is done
    'Donegal': require('base64-loader!./DonegalOne-Regular.ttf'),
    'Gloria': require('base64-loader!./GloriaHallelujah.ttf'),
    'Mystery': require('base64-loader!./MysteryQuest-Regular.ttf'),
    'Scratch': require('base64-loader!./Scratch.ttf')
};
/* eslint-enable global-require */

// For each Base 64 string,
// 1. Replace each with a usable @font-face tag that points to a Data URI.
// 2. Inject the font into a style on `document.body`, so measurements
//    can be accurately taken in SvgRenderer._transformMeasurements.
for (const fontName in FONTS) {
    const fontData = FONTS[fontName];
    FONTS[fontName] = '@font-face {' +
        `font-family: "${fontName}";src: url("data:application/x-font-ttf;charset=utf-8;base64,${fontData}");}`;
}

if (!document.getElementById('scratch-font-styles')) {
	const documentStyleTag = document.createElement('style');
	documentStyleTag.id = 'scratch-font-styles';
	for (const fontName in FONTS) {
	    documentStyleTag.textContent += FONTS[fontName];
	}
	document.body.insertBefore(documentStyleTag, document.body.firstChild);
}

module.exports = {
	FONTS: FONTS
};