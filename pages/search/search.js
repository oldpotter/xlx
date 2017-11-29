const config = require('../../config.js')
const app = getApp()
const Zan = require('../../plugins/zanui-weapp/dist/index.js')
const wxParse = require('../../plugins/wxParse/wxParse.js')
const util = require('../../utils/util.js')

Page(Object.assign({}, Zan.TopTips, {
	data: {
		tags: null,//显示的tag
		allTags: null,//所有tag
		isAllTags: false,//是否显示全部tags,
		selectedTagIndex: -1,//选中的tag index
		isLoading: false,//正在加载数据
		page: 1,//页
		list: [],//parse后的数据
		noMoreData: false,
		originalList: [],//原始数据
		url: null,//请求数据url,不包含page
		parseContent:true,
	},

	onLoad() {
		this.getTags()
	},

	onReachBottom() {
		if (!this.data.url) {
			return
		}
		this.setData({
			page: ++this.data.page
		})
		this.requestData()
	},

	//获取所有文章分类
	getTags() {
		wx.showLoading({
			title: '请稍后...',
		})
		const _this = this
		wx.request({
			url: config.service.getTagsUrl,
			success: function (res) {
				console.log('获取tags:', res)
				_this.setData({
					tags: res.data.HITS.slice(0, 10),
					allTags: res.data.HITS
				})
			},
			fail: function (res) {
				console.error('失败')
			},
			complete: function (res) {
				wx.hideLoading()
			},
		})
	},

	//显示所有tags
	onClickAll() {
		this.setData({
			isAllTags: !this.data.isAllTags
		})
		this.setData({
			tags: this.data.isAllTags ? this.data.allTags : this.data.allTags.slice(0, 10)
		})
	},

	//点击了一个tag
	onClickTag(event) {
		if (this.data.isLoading) {
			this.showZanTopTips('正在加载...请稍后')
			return
		}
		const index = event.currentTarget.dataset.index
		this.setData({
			selectedTagIndex: index,
			list: [],
			originalList: [],
			page: 1,
		})
		const url = `${config.service.getArticlesOfTagUrl}?id=${this.data.tags[index].ID}&format=JSON`
		this.setData({
			url: url
		})
		this.requestData()
	},

	//搜索
	onConfirm(event) {
		const keyword = event.detail.value
		this.setData({
			selectedTagIndex: -1,
			list: [],
			page: 1,
			noMoreData: false
		})
		const url = `${config.service.searchUrl}?text=${keyword}&format=JSON`
		this.setData({
			url: url
		})
		this.requestData()
	},

	//获取数据
	requestData() {
		wx.showLoading({
			title: '请稍后...',
		})
		this.setData({
			isLoading: true
		})
		const _this = this
		const url = `${_this.data.url}&page=${_this.data.page}`
		// console.log(`url:${url}`)
		wx.request({
			url: url,
			success: function (res) {
				const data = res.data.HITS
				if (data.length > 0) {
					// console.log('request url:', url)
					//parseList
					data.forEach((item, idx) => {
						console.log(item)
						wxParse.wxParse('content' + idx, 'html', item.content, _this)
						if (idx == data.length - 1) {
							wxParse.wxParseTemArray('list', 'content', data.length, _this, _this.data.list)
						}
					})
					//originalList
					_this.setData({
						originalList: _this.data.originalList.concat(data.map(item => {
							item.ctimeFormat = util.getTimeFromNow(item.ctime)
							item.replaytimeFormat = util.getFormatTime(item.replaytime)
							return item
						}))
					})

				} else {
					_this.setData({
						noMoreData: true
					})
				}
				wx.hideLoading()
				_this.setData({
					isLoading: false
				})
			},
			fail: function (res) {
				_this.showZanTopTips('遇到错误...')
				wx.hideLoading()
				_this.setData({
					isLoading: false
				})
			},
		})
	},

	//点击列表item
	onClickArticleItem(event) {
		// const articleId = event.currentTarget.dataset.articleId
		const index = event.currentTarget.dataset.index
		app.article = this.data.originalList[index]
		// console.log(`articleId:${articleId}`)
		wx.navigateTo({
			url: `../article/article?showAttachment=true`,
		})
	},

	showInput: function () {
		this.setData({
			inputShowed: true
		});
	},
	hideInput: function () {
		this.setData({
			inputVal: "",
			inputShowed: false
		});
	},
	clearInput: function () {
		this.setData({
			inputVal: ""
		});
	},
	inputTyping: function (e) {
		this.setData({
			inputVal: e.detail.value
		});
	}
}))