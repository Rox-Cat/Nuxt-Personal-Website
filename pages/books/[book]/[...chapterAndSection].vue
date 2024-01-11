<template>
	<article class="container">
		<MdPreview
			:modelValue="section.content"
			:editorId="editorId"
			@onGetCatalog="onGetCatelog"
            class="section-content"
		/>

		<ClientOnly>
			<div class="section-toc">
				<BlogToc :catalogue="sectionToc"></BlogToc>
			</div>
		</ClientOnly>
	</article>
</template>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

/* 1. 获取要查询的内容 */
const route = useRoute()
const [chapterID, sectionID] = route.params.chapterAndSection

/* 2. 通过seciontID获取文章内容 */
const section = ref({})
const { data } = await getSectionFetch(sectionID)
if (data.value) {
	section.value = data.value.data
} else {
	// alert('文章不存在')
}

/* 3. md-editor-v3 配置 */
const editorId = ref('book')
const sectionToc = ref([])
const onGetCatelog = (catalog: []) => {
	sectionToc.value = catalog
}
</script>

<style scoped lang="less">
.container {
	width: 100%;
	display: flex;
	justify-content: space-between;

	.section-content {
		width: 100%;
		max-width: 64rem;
		margin-left: auto;
		margin-right: auto;
	}

	.section-toc {
		box-sizing: border-box;
		width: 16rem;
		flex: none;
		height: 100vh - 10rem;
		position: sticky;
		top: 7rem;
		bottom: 0;
		padding-left: 2rem;
		@media (max-width: 1024px) {
			display: none;
		}
	}
}
</style>
