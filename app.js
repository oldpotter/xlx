App({
	onLaunch() {
		this.collections = wx.getStorageSync('collections') || []
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

})