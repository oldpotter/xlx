'use strict';
const path = require('path')
const fs = require('fs')
const images = require('images')
const TextToSVG = require('text-to-svg')
const svg2png = require("svg2png")
const Promise = require('bluebird')


module.exports = async (ctx, next) => {

	Promise.promisifyAll(fs)

	const textToSVG = TextToSVG.loadSync(path.resolve(__dirname, '../resources/WenQuanYi Micro Hei.ttf'))

	const sourceImg = images(path.resolve(__dirname, '../resources/share-bg.png'))
	const sWidth = sourceImg.width()
	const sHeight = sourceImg.height()

	const svg1 = textToSVG.getSVG('打卡分享打卡分享打卡', {
		x: 0,
		y: 0,
		fontSize: 15,
		anchor: 'top',
	})

	const svg2 = textToSVG.getSVG('腿酸腿酸腿酸腿酸', {
		x: 0,
		y: 0,
		fontSize: 16,
		anchor: 'top',
	})

	const svg3 = textToSVG.getSVG('有点爽有点爽有点爽有点爽', {
		x: 0,
		y: 0,
		fontSize: 32,
		anchor: 'top',
	})

	await Promise.coroutine(function* generateInvitationCard() {
		const targetImg1Path = path.resolve(__dirname, '../resources/1.png')
		const targetImg2Path = path.resolve(__dirname, '../resources/2.png')
		const targetImg3Path = path.resolve(__dirname, '../resources/3.png')
		// const targetImg4Path = './i/qrcode.png';
		const [buffer1, buffer2, buffer3] = yield Promise.all([
			svg2png(svg1),
			svg2png(svg2),
			svg2png(svg3),
		]);

		yield Promise.all([
			fs.writeFileAsync(targetImg1Path, buffer1),
			fs.writeFileAsync(targetImg2Path, buffer2),
			fs.writeFileAsync(targetImg3Path, buffer3),
		]);

		const target1Img = images(targetImg1Path);
		const t1Width = target1Img.width();
		const t1Height = target1Img.height();
		const offsetX1 = (sWidth - t1Width) / 2;
		const offsetY1 = 200;

		const target2Img = images(targetImg2Path);
		const t2Width = target2Img.width();
		const t2Height = target2Img.height();
		const offsetX2 = (sWidth - t2Width) / 2;
		const offsetY2 = 240;

		const target3Img = images(targetImg3Path);
		const t3Width = target3Img.width();
		const t3Height = target3Img.height();
		const offsetX3 = (sWidth - t3Width) / 2;
		const offsetY3 = 270;

		// const target4Img = images(targetImg4Path);
		// const t4Width = target4Img.width();
		// const t4Height = target4Img.height();
		// const offsetX4 = (sWidth - t4Width) / 2;
		// const offsetY4 = 400;


		images(sourceImg)
			.draw(target1Img, offsetX1, offsetY1)
			.draw(target2Img, offsetX2, offsetY2)
			.draw(target3Img, offsetX3, offsetY3)
			// .draw(target4Img, offsetX4, offsetY4)
			.save(path.resolve(__dirname, '../static/pic.png'), { quality: 90 })
		ctx.state.code = 1985
		ctx.state.data = {path:'../static/pic.png'}
	})()
		.catch(e => console.error(e));
}
