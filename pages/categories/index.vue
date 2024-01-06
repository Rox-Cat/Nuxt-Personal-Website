<template>
	<main class="container">
		<CategoryHero></CategoryHero>
		<div class="category-list">
			<CategoryCard
				v-for="tag in tags"
				:key="tag.tagName"
				:tag="tag.tagName"
				@click="showBlogsByTag(tag.tagName)"
			></CategoryCard>
		</div>
		<div class="show-category" v-show="curTag">
			{{ curTag }}
		</div>
		<div class="blog-list">
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
		<!-- 分页功能 -->
		<div class="paginate" v-if="totalPage !== 0">
			<button :class="{ disabled: page === 1 }" @click="getPrePageBlogs">
				<Icon name="mdi:code-less-than" size="30"></Icon>
			</button>
			<p>{{ page }} / {{ totalPage }}</p>
			<button :class="{ disabled: page === totalPage }" @click="getPostPageBlogs">
				<Icon name="mdi:code-greater-than" size="30"></Icon>
			</button>
		</div>
	</main>
</template>

<script setup lang="ts">
/* 
	1. 获取网站的所有tag
	2. 点击过后，请求该tag下的所有blogs
	3. 渲染blogs列表
	4. 实现分页功能
*/

import { getTagsFetch, getBlogsByTagFetch } from '@/composables/useHttpFetch'

// 1. 获取网站的所有tag
type Tag = {
	tagName: string
}
const tags = ref<Tag[]>([])
// 是否合适？
const { data: tagsTmp } = await getTagsFetch()
// @ts-ignore
tags.value = tagsTmp.value.data

// 2. 点击过后，请求该tag下的所有blogs
let blogsList = ref<any>([])
const page = ref(1)
const pageSize = ref(2)
const totalPage = ref(0)
const route = useRoute()
const queryTag = route.query.tag
const curTag = ref('')
const getBlog = async () => {
	const { data } = await getBlogsByTagFetch(curTag.value, page.value, pageSize.value)
	if (data.value === null) {
		alert('No data found')
	} else {
		// @ts-ignore
		blogsList.value = data.value.data.blogList
	}
}

const showBlogsByTag = async (tagName: string) => {
	curTag.value = tagName
	page.value = 1
	await getBlog()
	const { data } = await getBlogsCountByTagFetch(tagName)
	// @ts-ignore
	totalPage.value = Math.ceil(data.value.data.totalCount / pageSize.value)
}
if (queryTag) {
	await showBlogsByTag(queryTag as string)
}
// 分页功能
// 获取总页数

const getPrePageBlogs = async () => {
	page.value--
	const { data } = await getBlogsByTagFetch(curTag.value, page.value, pageSize.value)
	// @ts-ignore
	blogsList.value = data.value.data.blogList
}
const getPostPageBlogs = async () => {
	page.value++
	const { data } = await getBlogsByTagFetch(curTag.value, page.value, pageSize.value)

	// @ts-ignore
	blogsList.value = data.value.data.blogList
}
</script>

<style scoped lang="less">
.container {
	max-width: 80rem;
	margin: 0 auto;
	padding: 0 2rem;
	.category-list {
		display: flex;
		flex-wrap: wrap;
	}

	.show-category {
		height: 5rem;
		margin: 3rem 0;
		font-size: @big-title-2-size;
		font-weight: 600;
		background-color: #e5e7eb;
		line-height: 5rem;
		text-align: center;
	}
	.blog-list {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));

		@media (min-width: 768px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		@media (min-width: 1024px) {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.paginate {
		display: flex;
		justify-content: center;
		align-items: center;

		button {
			outline: none;
			border: none;

			&:hover:not(.disabled) {
				cursor: pointer;
				svg {
					color: gold;
				}
			}
			&.disabled {
				pointer-events: none;
			}
			svg {
				background-color: @bg-color;
				color: powderblue;
			}
		}

		p {
			margin: 0 1rem;
		}
	}
}
.dark-mode {
	.show-category {
		background-color: cornsilk;
		color: #000;
	}
}
</style>
