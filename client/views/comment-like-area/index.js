module.exports = {

	//点击评论
	onClickComment() {

	},

	//点赞
	onClickLike() {

	},

	//点赞动画
	showLikeAnimation() {
		console.log('tap liked')
		this.setData({
			liked: !this.data.liked,
		})
		
		this.setData({
			likeImageUrl: `../../resources/like-${this.data.liked ? "on" : "off"}.png`
		})
	}
}