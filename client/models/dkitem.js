/**
 * 状态
 * 0:new
 * 1:上传成功
 * -1:上传失败
 */
class DkItem {
	constructor(duration, date, content, state, tsDuration, tsDate) {
		this.duration = duration
		this.date = date
		this.content = content || '修行打卡，滴！'
		this.state = state || 0
		this.tsDuration = tsDuration
		this.tsDate = tsDate
	}
}


module.exports = DkItem 