<template>
	<div class="container">
		<div class="blog-body">
			<div class="blog-header">
				<BlogHeader
					:title="blogDate.title"
					:cover-img="blogDate.coverImg"
					:created-at="blogDate.createdAt"
					:tags="blogDate.tags"
					:alt="blogDate.title"
				></BlogHeader>
			</div>
			<div class="blog-content">
				<MdPreview
					:modelValue="blogDate.content"
					:editorId="editorId"
					preview-theme="rox7"
					@onGetCatalog="onGetCatelog"
				/>
			</div>
		</div>
		<ClientOnly>
			<div class="blog-toc">
				<BlogToc :catalogue="blogCatalogue"></BlogToc>
			</div>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
// 测试请求 -> 一会测试
import { getBlogFetch } from '@/composables/useHttpFetch'
import type { BlogData } from '@/types/blog'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css';
import '@/style/rox7.css'
/* markdown主题 */
const colorMode = useColorMode()
const theme = computed(() => {
	console.log(colorMode.value)
	if (colorMode.value === 'system') {
		return "github"
	}
	if (colorMode.value === 'light') {
		return 'github'
	} else {
		return "md-editor-dark"
	}
})
/* 博客内容相关 */
const editorId = ref('ed')
const { path } = useRoute()
const blogId = path.split('/')[2]

const { data } = await getBlogFetch(+blogId)
let blogDate: Ref<BlogData>
if (data.value !== null) {
	if (data.value.code === 200) {
		let createdAt = data.value.data.createdAt
		let updatedAt = data.value.data.updatedAt
		data.value.data.createdAt = new Date(createdAt).toLocaleString()
		data.value.data.updatedAt = new Date(updatedAt).toLocaleString()
		blogDate = ref(data.value.data)
	} else {
		console.log(data.value.msg)
	}
}

/* 博客目录 */
// const runtimeConfig = useRuntimeConfig()
const blogCatalogue = ref([])
const onGetCatelog = (catalog: []) => {
	blogCatalogue.value = catalog
}
</script>

<style scoped lang="less">
.container {
	
	// 设置宽度，水平居中，边距
	width: 100%;
	padding: 0 1.5rem;
	margin: 0 auto;
	max-width: 80rem;

	// 如果宽度大于640px，使用网格布局
	@media (min-width: 640px) {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: 3rem;
	}
	.blog-body {
		grid-column: span 12 / span 12;

		@media (min-width: 1024px) {
			grid-column: span 10 / span 10;
		}

		.blog-content {
			max-width: 64rem;
			margin-left: auto;
			margin-right: auto;
		}
	}

	.blog-toc {
		display: none;
		position: sticky;
		top: 7rem;
		justify-self: end;
		@media (min-width: 1024px) {
			display: block;
			grid-column: span 2 / span 2;
		}
	}
}
</style>
