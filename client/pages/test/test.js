const config = require('../../config.js')
const util = require('../../utils/util.js')
const app = getApp()
Page({

	onLoad() {
		setTimeout(() => {
			wx.playBackgroundAudio({
				dataUrl: 'https://kl-1255829748.cos.ap-shanghai.myqcloud.com/ring.mp3',
				title: '',
				coverImgUrl: '',
				success: function (res) { },
				fail: function (res) { },
				complete: function (res) { },
			})
		}, 3000)
	},

})