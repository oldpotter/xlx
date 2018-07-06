const moment = require('./plugins/moment.min.js')
const util = require('./utils/util.js')
const config = require('./config.js')
App({

  onLaunch() {
    if (wx.canIUse('getUpdateManager')) {
      // wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
      const updateManager = wx.getUpdateManager()

      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate)
      })

      updateManager.onUpdateReady(function() {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否马上重启小程序？',
          success: function(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })

      updateManager.onUpdateFailed(function() {
        // 新的版本下载失败
      })
    }

    moment.locale('zh', {
      relativeTime: {
        past: "%s前",
      }
    });
    this.collections = wx.getStorageSync('collections') || []
    this.level = wx.getStorageSync('level') || 25
    this.dataSource = wx.getStorageSync('dataSource')
    if (!this.dataSource) {
      this.dataSource = [
        {
          idx: 0,

          title: '纯音乐——朝颜（水晶）',
          src: 'http://s.xuelingxiu.com/xlx/audio/seeding/%E7%BA%AF%E9%9F%B3%E4%B9%90%E2%80%94%E2%80%94%E6%9C%9D%E9%A2%9C%EF%BC%88%E6%B0%B4%E6%99%B6%E9%92%B5%EF%BC%89.mp3',
          isPlaying: false,
					selected:true
        },
        {
          idx: 1,
          isPlaying: false,
          title: '纯音乐——水晶湖（水晶钵）',
          src: 'http://s.xuelingxiu.com/xlx/audio/seeding/%E7%BA%AF%E9%9F%B3%E4%B9%90%E2%80%94%E2%80%94%E6%B0%B4%E6%99%B6%E6%B9%96%EF%BC%88%E6%B0%B4%E6%99%B6%E9%92%B5%EF%BC%89.mp3'
        },
        {
          idx: 2,
          isPlaying: false,
          title: '辅助音频——21诀前16诀（水晶钵背景）',
          src: 'http://s.xuelingxiu.com/xlx/audio/seeding/%E8%BE%85%E5%8A%A9%E9%9F%B3%E9%A2%91%E2%80%94%E2%80%9421%E8%AF%80%E5%89%8D16%E8%AF%80%EF%BC%88%E6%B0%B4%E6%99%B6%E9%92%B5%E8%83%8C%E6%99%AF%EF%BC%89%20.mp3'
        },
        {
          idx: 3,
          isPlaying: false,
          title: '辅助音频——内观法（水晶钵）',
          src: 'http://s.xuelingxiu.com/xlx/audio/seeding/%E8%BE%85%E5%8A%A9%E9%9F%B3%E9%A2%91%E2%80%94%E2%80%94%E5%86%85%E8%A7%82%E6%B3%95%EF%BC%88%E6%B0%B4%E6%99%B6%E9%92%B5%EF%BC%89.mp3'
        },
        {
          idx: 4,
          isPlaying: false,
          title: '辅助音频——我在做梦音频提醒（带背景音乐）',
          src: 'http://s.xuelingxiu.com/xlx/audio/seeding/%E8%BE%85%E5%8A%A9%E9%9F%B3%E9%A2%91%E2%80%94%E2%80%94%E6%88%91%E5%9C%A8%E5%81%9A%E6%A2%A6%E9%9F%B3%E9%A2%91%E6%8F%90%E9%86%92%EF%BC%88%E5%B8%A6%E8%83%8C%E6%99%AF%E9%9F%B3%E4%B9%90%EF%BC%89.mp3'
        },
				// {
				// 	idx:5,
				// 	title:'真的爱你',
				// 	src:'https://lg-3j37zias-1255829748.cos.ap-shanghai.myqcloud.com/真的爱你.mp3'
				// }
      ]
    }

		this.dkOptions = wx.getStorageSync('dkOptions')
		if(!this.dkOptions){
			this.dkOptions = {
				isMusicOn:false,//是否开启音频
				isCircleOn:false,//是否循环播放
				musicSrc:''//音频地址
			}
		}
    Promise.prototype.finally = function(callback) {
      let P = this.constructor;
      return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
          throw reason
        })
      );
    }

    this.screenWidth = wx.getSystemInfoSync().screenWidth
    this.screenHeight = wx.getSystemInfoSync().screenHeight
  },


  article: null, //显示的文章
  collections: null, //收藏的文章ids
  level: null, //字体大小标示值
  screenWidth: undefined,
  screenHeight: undefined,
  dataSource: [],
	dkOptions:{},
})