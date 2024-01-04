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
				<template v-for="post in paginatedData" :key="post.title">
					<ArchiveCard
						:path="post.path"
						:title="post.title"
						:date="post.date"
						:description="post.description"
						:image="post.image"
						:alt="post.alt"
						:og-image="post.ogImage"
						:tags="post.tags"
						:published="post.published"
					/>
				</template>
			</div>

			<ArchiveCard
				v-if="paginatedData.length <= 0"
				title="No Post Found"
				image="/not-found.jpg"
			/>
		</ClientOnly>
	</main>
</template>

<script lang="ts" setup>
const { data } = await useAsyncData('home', () =>
	queryContent('/blogs').sort({ _id: -1 }).find(),
)

const elementPerPgae = ref(4)
const pageNumber = ref(1)
const searchTest = ref('')

const formatedData = computed(() => {
	return (
		data.value?.map((articles) => {
			return {
				description: articles.description || 'no-descriptoin available',
				title: articles.title || 'no-title available',
				path: articles._path,
				image: articles.image || '/nuxt-blog/no-image_cyyits.png',
				alt: articles.alt || 'no alter data available',
				ogImage: articles.ogImage || '/nuxt-blog/no-image_cyyits.png',
				date: articles.date || 'not-date-available',
				tags: articles.tags || [],
				published: articles.published || false,
			}
		}) || []
	)
})
const searchData = computed(() => {
	return (
		formatedData.value.filter((data) => {
			const lowerTitle = data.title.toLocaleLowerCase()
			if (lowerTitle.search(searchTest.value) !== -1) return true
			else return false
		}) || []
	)
})
const paginatedData = computed(() => {
	return (
		searchData.value.filter((data, idx) => {
			const startInd = (pageNumber.value - 1) * elementPerPgae.value
			const endInd = pageNumber.value * elementPerPgae.value - 1

			if (idx >= startInd && idx <= endInd) return true
			else return false
		}) || []
	)
})

function onPreviousPageClick() {
	if (pageNumber.value > 1) pageNumber.value -= 1
}

const totalPage = computed(() => {
	const ttlContent = searchData.value.length || 0
	const totalPage = Math.ceil(ttlContent / elementPerPgae.value)
	return totalPage
})

function onNextPageClick() {
	if (pageNumber.value < totalPage.value) pageNumber.value += 1
}

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
.dark-mode input {
	border-color: @light-title;
	background-color: @dark-bg;
}
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
			background-color: @light-bg;
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
