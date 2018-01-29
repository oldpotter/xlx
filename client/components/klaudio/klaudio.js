const moment = require('../../plugins/moment.min.js')
Component({

	properties: {
		title: {
			type: String,
			value: '默认标题'
		},
		src: String
	},

	data: {
		isPlaying: false,
		audioCtx: undefined,
		totalTime: '00:00',
		currentTime: '00:00',
		progress: 0,
	},

	methods: {
		onChange(event) {
			const time = event.detail.value/100 * this.data.audioCtx.duration
			this.data.audioCtx.seek(time)
		},
		onTap() {
			this.setData({
				isPlaying: !this.data.isPlaying
			})
			this.data.isPlaying ? this.data.audioCtx.play() : this.data.audioCtx.pause()
		},
	},

	ready() {
		const _this = this
		this.data.audioCtx = wx.createInnerAudioContext()
		this.data.audioCtx.src = this.data.src

		this.data.audioCtx.onPlay(() => {
			const interval = setInterval(() => {
				const progress = this.data.audioCtx.currentTime / this.data.audioCtx.duration * 100
				const totalTime = moment.unix(this.data.audioCtx.duration).format('mm:ss')
				const currentTime = moment.unix(this.data.audioCtx.currentTime).format('mm:ss')
				this.setData({ totalTime, currentTime, progress })
				// console.log(progress)
			}, 1000)
			// console.log(this.data.src)
		})

		this.data.audioCtx.onError((res) => {
			console.log(res.errMsg)
			console.log(res.errCode)
		})

	}
})