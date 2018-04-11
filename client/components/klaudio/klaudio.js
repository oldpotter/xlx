const moment = require('../../plugins/moment.min.js')
Component({

	properties: {
		idx: Number,
		title: {
			type: String,
			value: '默认标题'
		},
		src: String,
		isPlaying: {
			type: Boolean,
			observer: '_bindPlaying'
		},

	},

	data: {
		audioCtx: undefined,
		totalTime: '00:00',
		currentTime: '00:00',
		progress: 0,
	},

	methods: {
		_bindPlaying() {
			const _this = this
			const backAudio = wx.getBackgroundAudioManager()
			let interval
			if (this.data.isPlaying) {
				backAudio.onPlay(() => wx.showLoading({
					title: '',
					mask: true,
					success: function (res) {
						// console.log(res)
					},
					fail: function (res) {
						// console.error(res)
					},
					complete: function (res) { },
				}))
				backAudio.title = this.data.title
				backAudio.src = this.data.src
				backAudio.startTime = this.startTime
				interval = setInterval(() => {
					wx.hideLoading()
					const progress = backAudio.currentTime / backAudio.duration * 100
					const totalTime = moment.unix(backAudio.duration).format('mm:ss')
					const currentTime = moment.unix(backAudio.currentTime).format('mm:ss')
					this.setData({ totalTime, currentTime, progress })
				}, 1000)
				backAudio.onEnded(() => {
					_this.setData({
						isPlaying: !_this.data.isPlaying,
						totalTime: '00:00',
						currentTime: '00:00',
						progress: 0,
					})
				})
			} else {
				this.startTime = backAudio.currentTime
				backAudio.stop()
				clearInterval(interval)
			}
		},
		onChange(event) {
			const backAudio = wx.getBackgroundAudioManager()
			const time = event.detail.value / 100 * backAudio.duration
			backAudio.seek(time)
		},


		onTap() {
			this.triggerEvent('klaudio', {
				idx: this.data.idx,
				isPlaying: !this.data.isPlaying
			}, {})
		},
	},
})