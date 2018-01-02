const config = require('../../config.js')
const wxParse = require('../../plugins/wxParse/wxParse.js')
const app = getApp()
const util = require('../../utils/util.js')

Page({

	data: {
		showAttachment: undefined,
		article: undefined,
		// titleHtml: undefined,
		asker: undefined,
		ctimeFormat: undefined,
		replaytimeFormat: undefined,
		isCollected: undefined,
		articleId: undefined,
		level: undefined
	},

	onLoad(options) {
		const _this = this
		//是否要显示附加信息
		this.setData({
			showAttachment: options.showAttachment,
			level: app.level
		})
		//加载文章
		if (options.articleId) {
			// console.log(`url:${options.url}`)
			this.setData({
				articleId: options.articleId
			})
			wx.showLoading({
				title: '请稍后...',
			})
			wx.request({
				url: `${config.service.getArticleUrl}?id=${_this.data.articleId}&format=JSON`,
				success: function (res) {
					// console.log(`contentHtml:`, res.data.contentHtml)
					let article = res.data
					article.ctimeFormat = util.getTimeFromNow(article.ctime)
					article.replaytimeFormat = util.getFormatTime(article.replaytime)
					app.article = article
					_this.parseArticle()
					wx.hideLoading()
					// console.log(article.articleId)
					wx.getStorage({
						key: `scrollTop_${article.id}`,
						success: function (res) {
							// console.log(`res:${res}`)
							setTimeout(() => {
								wx.pageScrollTo({
									scrollTop: res,
								})
							}, 100)
						},
						fail: function (res) { },
						complete: function (res) { },
					})

				},
				fail: function (res) {
					// console.error('请求失败。。。')
				},
			})
		} else {
			this.parseArticle()
			wx.getStorage({
				key: `scrollTop_${this.data.articleId}`,
				success: function (res) {
					setTimeout(() => {
						wx.pageScrollTo({
							scrollTop: res,
						})
					}, 100)
				},
				fail: function (res) { },
				complete: function (res) { },
			})
		}
		//收藏按钮
		const isCollected = app.collections.some(id => id == this.data.articleId)
		this.setData({
			isCollected: isCollected
		})
	},

	onUnload() {
		wx.setStorage({
			key: 'collections',
			data: app.collections,
		})
		wx.setStorage({
			key: `scrollTop_${this.data.articleId}`,
			data: this.scrollTop,
		})
	},

	onPageScroll(event) {
		this.scrollTop = event.scrollTop
	},

	parseArticle() {
		this.setData({
			articleId: app.article.id,
			article: app.article,
			// titleHtml: app.article.titleHtml,
			asker: app.article.asker,
			ctimeFormat: app.article.ctimeFormat,
			replaytimeFormat: app.article.replaytimeFormat,
		})

		let titleHtml = app.article.titleHtml
		wxParse.wxParse('title', 'html', titleHtml, this, 20)

		let contentHtml = this.data.article.contentHtml
			.replace(/\w*=?:?""/g, '')
			.replace(/<style>[\s\S]*<\/style>/, '')
			.replace(/<p class="dayiyinpin">/g, '')
			.replace(/<table>/g, '')
			.replace(/<\/table>/g, '')
			.replace(/<tbody>/g, '')
			.replace(/<\/tbody>/g, '')
			.replace(/<tr>/g, '')
			.replace(/<\/tr>/g, '')
			.replace(/<td>/g, '')
			.replace(/<\/td>/g, '')
			.replace(/<div class="qr-div">/g, '')
			.replace(/<\/div>/g, '')
			.replace(/table border="0" width="250" cellspacing="0" cellpadding="0">/g, '')

		// console.log(`contentHtml:${contentHtml}`)
		wxParse.wxParse('article', 'html', contentHtml, this, 20)
	},

	//点击收藏按钮
	onClickCollection() {
		//动画
		this.setData({
			isCollected: !this.data.isCollected,
		})
		if (this.data.isCollected) {
			app.collections.push(this.data.articleId)
		} else {
			app.collections = app.collections.filter(id => id != this.data.articleId)
		}
	},

	//点击链接
	wxParseTagATap(event) {
		const url = event.currentTarget.dataset.src
		let ifInnerUrl = /http:\/\/www.xuelingxiu.com\/yuanwushi\/[\w]+.html/.test(url)
		// console.log(`url:${url}result:${ifInnerUrl}`)
		if (ifInnerUrl) {
			const articleId = url.replace(/http:\/\/www.xuelingxiu.com\/yuanwushi\//, '')
				.replace(/.html/, '')
			wx.navigateTo({
				url: `./article?articleId=${articleId}&showAttachment=true`,
				success: function (res) { },
				fail: function (res) { },
				complete: function (res) { },
			})
		}

	},

})