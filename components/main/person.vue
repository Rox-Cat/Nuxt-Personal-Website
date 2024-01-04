<template>
	<div class="container">
		<div class="person">
			<div class="avatar">
				<img src="@/avatar.jpg" width="150px" height="150px" />
			</div>

			<div class="nickname">Rox7</div>

			<div class="data">
				<div class="data-item">
					<span>博客</span>
					<span>30</span>
				</div>
				<div class="data-item">
					<span>小册</span>
					<span>30</span>
				</div>
				<div class="data-item">
					<span>评论</span>
					<span>30</span>
				</div>
				<div class="data-item">
					<span>访客</span>
					<span>30</span>
				</div>
			</div>

			<div class="media">
				<Icon name="devicon:github" size="30" />
				<Icon name="fa6-brands:bilibili" size="30" color="rgb(241, 132, 160)" />
				<Icon name="simple-icons:leetcode" size="30" />
			</div>
		</div>

		<div class="category">
			<div class="title">
				<Icon name="ic:round-category" size="30" />
				分类
			</div>

			<div class="category-list">
				<p class="category-item">Vue ------ ({{ count }}篇)</p>
				<p class="category-item">Vue</p>
				<p class="category-item">Vue</p>
				<p class="category-item">Vue</p>
				<p class="category-item">Vue</p>
				<p class="category-item">Vue</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const count = ref(10)
</script>

<style scoped lang="less">
.container {
	min-width: 15rem;
	padding: 1.25rem;
	height: 100%;
	.person {
		padding: 1.25rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 0.7rem;
		background-size: 200% 300%; // ?
		background: linear-gradient(-45deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);

		.avatar img {
			border-radius: 50%;
		}

		.nickname {
			font-size: 2.5rem;
			color: @light-title;
			font-weight: 600;
			margin: 1.25rem 0;
		}

		.data {
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-around;
			padding: 0 2rem;

			.data-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 1.25rem;
				color: @light-title;
			}
		}

		.media {
			width: 100%;
			display: flex;
			justify-content: space-evenly;
			padding: 2rem 2rem;
		}
	}

	.category {
		border-radius: 10px;
		margin: 2.5rem 0;
		padding: 1.25rem 1rem;
		background: linear-gradient(-45deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);
		.title {
			text-align: center;
			font-size: 1.5rem;
			color: @light-title;
			font-weight: 600;
		}


		.category-list {
			padding:1.25rem 1rem;
			padding-top: 1.25rem;
			.category-item {
				padding: 0.5rem 0;
				font-size: 1.25rem;
				font-weight: 600;
			}
		}
	}
}
</style>
