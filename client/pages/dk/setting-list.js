const app = getApp()
Page({

	idx:0,	
  data: {
    dataSource:[]
  },

  onLoad() {
		this.setData({dataSource:app.dataSource})
  },

	onUnload(){
		
	},
	bindDatasource(event){
		const {dataSource} = event.detail
		app.dataSource = dataSource
		wx.setStorageSync('dataSource', dataSource)
	}
})