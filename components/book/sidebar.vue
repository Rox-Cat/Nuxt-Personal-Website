<template>
	<aside class="sidebar">
		<section v-for="(chapter, index) of chapters" :key="index">
			<div class="title" @click="toggle(index)">
				<h3>{{ chapter.title }}</h3>
				<div class="button">
					<Icon name="material-symbols:arrow-drop-down" size="2rem" v-show="showItems[index]"></Icon>
					<Icon name="ic:outline-arrow-right" size="2rem" v-show="!showItems[index]"></Icon>
				</div>
			</div>
			<div class="items" v-show="showItems[index]">
				<div class="item" v-for="section of chapter.sections">
					<NuxtLink
						:to="`/books/${$route.params.book}/${chapter.id}/${section.id}`"
					>
						{{ section.title }}
					</NuxtLink>
				</div>
			</div>
		</section>
	</aside>
</template>

<script setup lang="ts">
const props = defineProps(['chapters'])
const showItems = ref<any>([])
props.chapters.forEach((_, index) => {
	showItems.value[index] = true // set all items to be hidden initially
})
const toggle = (index: number) => {
	showItems.value[index] = !showItems.value[index]
}
</script>

<style scoped lang="less">
.sidebar {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	section {
		border-top: 1px solid #ccc;
		margin-bottom: 1rem;
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px;
			&:hover {
				cursor: pointer;
			}
		}
		.items {
			.item {
				padding: 10px;
			}
		}
	}
}

</style>
