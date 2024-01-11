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
					preview-theme="vuepress"
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
import 'md-editor-v3/lib/style.css';
import '@/style/rox7.css'
/* markdown主题 */
const colorMode = useColorMode()
const theme = computed(() => {
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
	box-sizing: border-box;
	max-width: 80rem;
	display: flex;

	.blog-body {
		width: 100%;
		max-width: 64rem;
		margin-left: auto;
		margin-right: auto;
	}

	.blog-toc {
		height: 100vh - 10rem;
		position: sticky;
		top: 7rem;
		padding-left: 2rem;
		@media (max-width: 1024px) {
			display: none;
		}
	}
}
</style>
