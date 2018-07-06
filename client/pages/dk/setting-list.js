const app = getApp()
Page({
  data: {
    dataSource: [],
    isMusicOn: false,
    isCircleOn: false,

  },

  onLoad() {
    this.setData({
      dataSource: app.dataSource,
      isMusicOn: app.dkOptions.isMusicOn,
      isCircleOn: app.dkOptions.isCircleOn,
    })
  },

	onUnload(){
		wx.setStorageSync('dkOptions', app.dkOptions)
	},

  bindMusic(event) {
    this.setData({
      isMusicOn: event.detail.value
    })
    app.dkOptions.isMusicOn = event.detail.value
  },
  bindCircle(event) {
    this.setData({
      isCircleOn: event.detail.value
    })
		app.dkOptions.isCircleOn = event.detail.value
  },

  bindDatasource(event) {
    const {
      dataSource
    } = event.detail
    app.dataSource = dataSource
    wx.setStorageSync('dataSource', dataSource)
  }
})