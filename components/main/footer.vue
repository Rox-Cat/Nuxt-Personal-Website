<template>
	<div class="footer">
		<div class="container">
			<div class="content">
				<FooterSite></FooterSite>
				<FooterSite></FooterSite>
				<FooterSite></FooterSite>
			</div>

			<div class="bottom">
				© 2020-2023 No Right is reserved. Who cares 🤷‍♂️? It's
				<a href="https://github.com/nurriyad/blog" target="_blank" rel="nofollow"
					>open source</a
				>
				anyway.
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const route = useRoute()

const path = computed(() => route.fullPath.replace('/', ''))
</script>

<style lang="less" scoped>
.footer {
	padding: 1.25rem 1.25rem;
	border-top: 1px solid;
	margin-top: 1.25rem;

	.container {
		max-width: 64rem;
		margin: 0 auto;
		.content {
			display: grid;
			// 通过将 grid-auto-columns 设置为 minmax(0, 1fr)，
			// 你告诉网格容器的列使用自动大小，并且其大小范围是从最小值 0 到最大值 1fr。
			// 创建一个自适应的列，它会根据网格容器的宽度自动调整大小，以填充所有可用的空间。
			grid-template-columns: repeat(1, minmax(0, 1fr));
			@media (min-width: @ipad) {
				grid-template-columns: repeat(3, minmax(0, 1fr));
			}
		}
	}

	.bottom {
		padding: 0.5rem;
		text-align: center;
		text-decoration: underline;
	}
}
/* 没搞懂 */
.v-enter-active,
.v-leave-active {
	transition: all 0.4s;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>
