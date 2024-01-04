<template>
	<div class="categories">
		<h1 class="tag-link">{{ tag }}</h1>
	</div>
</template>

<script setup lang="ts">
interface Props {
	tag: string
}

withDefaults(defineProps<Props>(), {
	tag: 'No tag available',
})

// some random color for tags
const color = [
	'#dc2626',
	'#d97706',
	'#65a30d',
	'#059669',
	'#0891b2',
	'#0284c7',
	'#4f46e5',
	'#7c3aed',
	'#c026d3',
	'#db2777',
]

// get a random number
function getRandomInt(min: number, max: number) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const picAColor = ref(`${color.at(getRandomInt(0, 8))}`)
</script>

<style scoped lang="less">
.categories {
	padding: 0.75rem 1.25rem;
	margin: 1rem;
	border-radius: 0.25rem;
	transition-property: all;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 500ms;
	background-color: v-bind(picAColor);

	&:hover {
		cursor: pointer;
		transform: scale(1.05);
	}

	.tag-link {
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 800;
		color: #fff;
	}
}
</style>
