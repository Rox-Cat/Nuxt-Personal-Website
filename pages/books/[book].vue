<template>
	<div class="container">
		<div class="aside">
			<BookSidebar
				:chapters="chapters"
				:bookTitle="$route.params.book"
			></BookSidebar>
		</div>
		<div class="body">
			<NuxtPage></NuxtPage>
		</div>
	</div>
</template>

<script setup lang="ts">
/* 1. 请求该书籍的所有章节以及所有文章名称 */
const { data: book } = await getBookFetch('Leetcode')
const chapters = ref([])
if (book.value) {
	/* 2. 处理该书籍的信息 */
	chapters.value = book.value.data.chapters.map((chapter: any) => {
		return {
			id: chapter.id,
			title: chapter.title,
			sections: chapter.sections,
		}
	})
	console.log(chapters.value)
} else {
	// 应该有一个页面提示
	alert('书籍不存在')
}
</script>

<style scoped lang="less">
.container {
	width: 100%;
	padding: 0 1.5rem;
	margin: 0 auto;
	box-sizing: border-box;
	max-width: 100rem;
	display: flex;

	.aside {
		width: 20rem;
		padding: 0 1rem;
		height: 100vh - 10rem;
		position: sticky;
		top: 7rem;
		box-sizing: border-box;
		flex: none;
		@media (max-width: @ipad) {
			display: none;
		}
	}
	.body {
		min-width: 0;
	}
}
</style>
