const config = require('../../config.js')
const util = require('../../utils/util.js')
Page({

	data: {
		url: undefined
	},

	onLoad() {
		// util.pRequest('https://ys2wqql1.qcloud.la/source.jpg',{},'GET')
		// .then(res=>console.log(res))
		// const _this = this
		// wx.downloadFile({
		// 	url: 'https://ys2wqql1.qcloud.la/source.jpg',
		// 	header: {},
		// 	success: function(res) {
		// 		console.log(res)
		// 		_this.setData({
		// 			url:res.tempFilePath
		// 		})
		// 	},
		// 	fail: function(res) {
		// 		console.error(res)
		// 	},
		// 	complete: function(res) {},
		// })
	},

	btn1() {
		const _this = this
		// const url = 'https://kl-1255829748.cos.ap-shanghai.myqcloud.com/ring.mp3&a=.mp3'
		// const url = 'http://owxe4dwj9.bkt.clouddn.com/xlx/audio/blog/B02.mp3'
		// this.setData({url})
		const url = 'https://ys2wqql1.qcloud.la/ring.mp3'
		wx.downloadFile({
			url: url,
			header: {},
			success: function (res) {
				console.log(res)
				const path = res.tempFilePath
				wx.setStorageSync('usingRing', path)
				console.log('下载地址:', wx.getStorageSync('usingRing', path))
				_this.setData({
					url: path
				})
				// wx.saveFile({
				// 	tempFilePath: res.tempFilePath,
				// 	success: function (res) {
				// 		const path = res.savedFilePath.replace(/.unknown/,'.mp3')
				// 		wx.setStorageSync('usingRing', path)
				// 		console.log('保存地址:', path)
				// 		_this.setData({
				// 			url:path
				// 		})
				// 	},
				// 	fail: function (res) { },
				// 	complete: function (res) { },
				// })


			},
			fail: function (res) { },
			complete: function (res) { },
		})
	},

	btn2() {

		// const backgroundAudioManager = wx.getBackgroundAudioManager()
		// backgroundAudioManager.src = wx.getStorageSync('usingRing')
		// console.log(backgroundAudioManager.src)
		// wx.playBackgroundAudio({
		// 	dataUrl: wx.getStorageSync('usingRing'),
		// 	title: '',
		// 	coverImgUrl: '',
		// 	success: function(res) {},
		// 	fail: function(res) {},
		// 	complete: function(res) {},
		// })
		const innerAudioContext = wx.createInnerAudioContext()
		innerAudioContext.autoplay = true
		innerAudioContext.src = wx.getStorageSync('usingRing')
		
	},


})