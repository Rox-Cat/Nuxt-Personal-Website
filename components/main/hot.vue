<template>
	<div class="container">
		<div class="title">
			<Icon name="noto:hot-pepper" size="2.5rem"/>
			<h1>热门博客</h1>
		</div>

		<div class="blogs">
			<template v-for="post in blogsList" :key="post.id">
				<ArchiveCard
					:path="'/blogs/' + post.id"
					:title="post.title"
					:date="post.createdAt"
					:description="post.description"
					:image="post.coverImg"
					:tags="post.tags"
				/>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { getBlogsFetch } from '@/composables/useHttpFetch'

const page = ref(1)
const pageSize = ref(5)
let blogsList = ref<any>([])
const { data } = await getBlogsFetch(page.value, pageSize.value)
if (data.value === null) {
	alert('No data found')
} else {
	// @ts-ignore
	blogsList.value = data.value?.data.blogList || []
}

useHead({
	title: 'Home',
	meta: [
		{
			name: 'description',
			content:
				'Welcome To My Blog Site. Get Web Development, Javascript, Typescript, NodeJs, Vue, and Nuxt, Related Articles, Tips, Learning resources and more.',
		},
	],
	titleTemplate: "Rox7的博客 - %s",
})
</script>

<style scoped lang="less">
.container {
	padding-bottom: 2.5rem;

	.title {
		display: flex;
		padding: 1.5rem 1.5rem;
		flex-direction: row;
		align-items: center;

		h1 {
			padding-left: 1rem;
			color: #000000;
			font-size: 2.25rem;
			line-height: 2.5rem;
			font-weight: 600;
		}
	}

	.blogs {
		display: grid;
		grid-template-columns: 1fr;
	}
}

.dark-mode {
	.container .title h1{
		color: @dark-title;
	}
}
</style>
