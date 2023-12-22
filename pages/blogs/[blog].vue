<template>
	<div class="container">
		<!-- 博客主体 -->
		<div class="blog-body">
			<BlogHeader
				:title="data.title"
				:image="data.image"
				:alt="data.alt"
				:date="data.date"
				:description="data.description"
				:tags="data.tags"
			/>
			<!-- 博客主体 -->
			<div class="blog-content">
				<ContentRenderer v-if="articles" :value="articles" class="cyanosis-theme">
					<template #empty>
						<p>No content found.</p>
					</template>
				</ContentRenderer>
			</div>
		</div>

		<!-- 博客目录table of contents -->

			<BlogToc />

	</div>pnpm add @nuxt/content
</template>

<script setup lang="ts">
import 'md-editor-v3/lib/style.css';
import type { BlogPost } from '@/types/blog'
const { path } = useRoute()
const { data: articles, error } = await useAsyncData(`blog-post-${path}`, () =>
	queryContent(path).findOne(),
)
console.log(articles.value)

if (error.value) navigateTo('/404')

const data = computed<BlogPost>(() => {
	return {
		title: articles.value?.title || 'no-title available',
		description: articles.value?.description || 'no-descriptoin available',
		image: articles.value?.image || '/nuxt-blog/no-image_cyyits.png',
		alt: articles.value?.alt || 'no alter data available',
		ogImage: articles.value?.ogImage || '/nuxt-blog/no-image_cyyits.png',
		date: articles.value?.date || 'not-date-available',
		tags: articles.value?.tags || [],
		published: articles.value?.published || false,
	}
})
// defineOgImage({
// 	title: data.value.title,
// 	description: data.value.description,
// })
</script>

<style lang="less" scoped>
.container {

	// 设置宽度，水平居中，边距
	width: 100%;
	padding: 0 1.5rem;
	margin: 0 auto;
	max-width: 64rem;

	// 如果宽度大于640px，使用网格布局
	@media (min-width: 640px) {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: 3rem;
	}

	.blog-body {
		grid-column: span 12 / span 12;

		@media (min-width: 1024px) {
			grid-column: span 9 / span 9;
		}

		.blog-content {
			margin-left: auto;
			margin-right: auto;
			max-width: 64rem;
		}
	}
}
</style>

