// components/kl-audio-list/kl-audio-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * {
     * 	idx:number序号从0开始
     * 	src:String地址
     * 	title:String标题
     * 	isPlaying:Boolean正在播放,
     * selected:是否选中
     * }
     */
    dataSource: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  detached() {
    const dataSource = this.data.dataSource
    dataSource.forEach(item => {
      item.isPlaying = false
    })
    this.setData({
      dataSource
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //选中
    onClickItem(event) {
      const {
        idx
      } = event.detail
      const dataSource = this.data.dataSource
      dataSource.forEach((item, index) => {
        item.selected = idx == index ? true : false
      })
			this.setData({dataSource})
			this.triggerEvent('datasource',{dataSource:this.data.dataSource},{})
    },

    //audio
    bindAudio(event) {
      const {
        idx,
        isPlaying
      } = event.detail

      this.data.dataSource.forEach(item => {
        if (item.idx == idx) {
          const param = `dataSource[${idx}].isPlaying`
          this.setData({
            [param]: isPlaying
          })
        } else {
          const param = `dataSource[${item.idx}].isPlaying`
          this.setData({
            [param]: false
          })
        }
      })

    }

  }
})