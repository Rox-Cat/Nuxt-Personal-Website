<template>
	<div class="container">
		<div class="title">
			<Icon name="carbon:recently-viewed" size="2.5rem" color="#00000" />
			<h1>最近博客</h1>
		</div>

		<div class="blogs">
			<template v-for="post in blogsList" :key="post.id">
				<BlogCard
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
const pageSize = ref(6)
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
	titleTemplate: "Riyad's Blog - %s",
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
			color: @title-color;
			font-size: 2.25rem;
			line-height: 2.5rem;
			font-weight: 600;
		}
	}

	.blogs {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));

		@media (min-width: 768px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		@media (min-width: 1024px) {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
}
</style>
