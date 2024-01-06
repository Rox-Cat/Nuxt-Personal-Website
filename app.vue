<template>
	<div>
		<NuxtLayout>
			<NuxtLoadingIndicator />
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script lang="ts" setup>
const description =
	'Rox7的个人网站，主要内容包括前端学习笔记、个人博客、学习资料分享、技术总结、技术博客、个人简历等。'

useHead({
	meta: [{ name: 'description', content: description }],
	titleTemplate: (_title) => {
		return _title ? _title + ' - Rox7的个人网站' : 'Rox7的个人网站'
	},
})
</script>

<style lang="less">


/* 动画效果？ */
.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
	transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>
