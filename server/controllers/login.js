const request = require('request')
const config = require('../config.js')
module.exports = async (ctx, next) => {
	const { code } = ctx.request.body

	await request(`https://api.weixin.qq.com/sns/jscode2session?appid=${config.appId}&secret=${config.appSecret}&js_code=${code}&grant_type=authorization_code`, function (err, res, body) {
		ctx.state.code = 1
		ctx.state.data = body
	})
}
