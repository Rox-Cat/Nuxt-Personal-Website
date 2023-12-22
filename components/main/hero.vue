<template>
	<div class="hero">
		<div class="content-grid">
			<div class="introduction">
				<h1 class="title">Welcome To My Blog Site</h1>
				<p class="text">
					Get Web Development, Javascript, Typescript, NodeJs, Vue, and Nuxt,
					Related Articles, Tips, Learning resources and more.
				</p>
			</div>
			<div class="logo">
				<LogoDog />
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.dark-mode .title {
	color: @dark-title !important;
}
.hero {
	max-width: 100%; // 子元素不会超出父元素，响应式布局
	margin: 0 auto;

	.content-grid {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		@media (min-width: @ipad) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		align-items: center;

		.introduction {
			padding: 0 1.5rem;

			.title {
				color: @light-title;
				font-weight: 600;
				line-height: 1.2;
				font-size: 2.25rem;
				@media (min-width: @ipad) {
					font-size: 3rem;
				}
				margin: 1.25rem 0;
			}

			// 暗黑模式所有的子元素的字体修改
		}

		.logo {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
			justify-self: center;
		}
	}
}
</style>
