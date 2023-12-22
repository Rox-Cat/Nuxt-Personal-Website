<template>
	<div>
		<p class="title">About This Site</p>
		<p class="description">
			This is a personal blog site built with Nuxt3, TailwindCSS, NuxtContent, Nuxt
			Icon. Currently it's deployed in Vercel.
		</p>
	</div>
</template>

<style scoped lang="less">
.title {
	font-size: 1rem;
	padding: 0.25rem 0;
	font-weight: 600;
	color: @light-title;
}

.description {
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
}

.dark-mode .title {
	color: @dark-title;
}
</style>
