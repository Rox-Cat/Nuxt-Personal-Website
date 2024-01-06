<template>
	<main class="container">
		<!-- logo -->
		<ArchiveHero />

		<!-- 搜索框 -->
		<div class="search">
			<input type="text" placeholder="search" />
		</div>

		<!--  -->
		<ClientOnly>
			<div class="blog-cards">
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

			<ArchiveCard
				v-if="blogsList.length <= 0"
				title="No Post Found"
				image="/not-found.jpg"
			/>
		</ClientOnly>
	</main>
</template>

<script lang="ts" setup>
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

// console.log(blogsList.value)
/* 搜索功能一会再写 */
// const searchTest = ref('')

// const searchData = computed(() => {
// 	return (
// 		blogsList.value.filter((data) => {
// 			const lowerTitle = data.title.toLocaleLowerCase()
// 			if (lowerTitle.search(searchTest.value) !== -1) return true
// 			else return false
// 		}) || []
// 	)
// })

useHead({
	title: 'Archive',
	meta: [
		{
			name: 'description',
			content:
				'Here you will find all the blog posts I have written & published on this site.',
		},
	],
	titleTemplate: "Riyad's Blog - %s",
})

// defineOgImage()
</script>

<style lang="less" scoped>

.container {
	width: 100%;
	margin: 0 auto;
	max-width: 64rem;
	// text-color: #6b7280;

	.search {
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		input {
			box-sizing: border-box;
			display: block;
			width: 100%;
			background-color: @bg-color;
			color: #9ca3af;
			border-radius: 0.375rem;
			border-width: 1px;
			border-color: #d1d5db;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
			padding-top: 0.5rem;
			padding-right: 0.75rem;
			padding-bottom: 0.5rem;
			padding-left: 0.75rem;
			font-size: 1rem;
			line-height: 1.5rem;

			&:focus {
				outline: 2px solid transparent;
				outline-offset: 2px;
				border-color: #a5b4fc;
				box-shadow: 0 0 0 3px rgba(164, 180, 252, 0.45);
			}
		}
	}

	.blog-cards {
		margin-top: 1.25rem;
		margin-bottom: 1.25rem;
	}
}

.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: -1.5rem;
	margin-right: -1.5rem;
}

.flex-center > :not([hidden]) ~ :not([hidden]) {
	margin-left: 1.5rem;
	margin-right: 1.5rem;
}

.icon {
	color: #0ea5e9;
}
</style>
