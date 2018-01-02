App({
	version: `v1.6.0`,

	onLaunch() {
		this.collections = wx.getStorageSync('collections') || []
		this.level = wx.getStorageSync('level') || 25
		// console.log('collections:',this.collections)
		Promise.prototype.finally = function (callback) {
			let P = this.constructor;
			return this.then(
				value => P.resolve(callback()).then(() => value),
				reason => P.resolve(callback()).then(() => { throw reason })
			);
		}
	},

	article: null,//显示的文章
	collections: null,//收藏的文章ids
	level: null,//字体大小标示值
})