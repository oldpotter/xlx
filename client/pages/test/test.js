import qqVideo from '../../utils/qqVideo.js'
const moment = require('moment')
const parse = require('url-parse');
var HTML = require('html-parse-stringify2')




Page({
  data: {
    src: undefined
  },

  onLoad() {
    const _this = this
		/*
    let url = parse('https://v.qq.com/iframe/player.html?vid=g0556n3nzhg&amp;tiny=0&amp;auto=0', true)
    const vid = url.query.vid
    qqVideo.getVideoes(vid)
      .then(res => {
        console.log('length:', res.length)
        if (res.length > 0) {
          _this.setData({
            src: res[0]
          })
          console.log('src:', _this.data.src)
        }
      })*/

		const text = '<iframe width="640" height="498" src="https://v.qq.com/iframe/player.html?vid=g0556n3nzhg&amp;tiny=0&amp;auto=0" frameborder="0" ></iframe>'
		let url = HTML.parse(text)
		console.log(url)
		if(url[0].name == 'iframe'){
			console.log('src是：', url[0].attrs.src)
		}
  },
})