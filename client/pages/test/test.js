import qqVideo from '../../utils/qqVideo.js'
const util = require('../../utils/util.js')
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

    const text = '<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=j03326o12dk" allowFullScreen="true"></iframe>'
    const text2 = '<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=m03247hg03c" allowFullScreen="true"></iframe>'
    let url = HTML.parse(text)
    if (url[0].name == 'iframe') {
      let src = url[0].attrs.src
      let vid = parse(src, true).query.vid
      util.getTencentVideoUrl(vid)
        .then(res => {
						_this.setData({src: res})
        })
    }
  },
})