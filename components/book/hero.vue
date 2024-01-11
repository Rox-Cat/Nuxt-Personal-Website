<template>
	<div class="container">
		<div class="content">
			<div class="description">
				<h1 class="title">知识小册</h1>
				<p class="text">一门技能的全面总结</p>
			</div>
			<div class="logo">
				<NuxtImg src="https://zerdocs.oss-cn-shanghai.aliyuncs.com/202302041807975.svg"/>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.container {
	width: 100%;
	margin: 0 auto;
	margin-bottom: 1.25rem;
}

.content {
	display: grid;
	grid-template-columns: repeat(1, minmax(0, 1fr));
	align-items: center;
    justify-items: center;
	@media (min-width: 640px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
}

.description {
	padding: 0 1.5rem;

	.title {
		color: @title-color;
		font-weight: 600;
		line-height: 1.2;
		font-size: 2.25rem;
		margin-top: 1.25rem;
		margin-bottom: 1.25rem;

		@media (min-width: 768px) {
			font-size: 3rem;
		}
	}

	.text {
		font-size: 2rem;
	}
}
.logo {
	justify-self: center;
	height: 20rem;
    img {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
}


</style>
