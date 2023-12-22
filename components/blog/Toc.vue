<template>
	<div class="toc-container">
		<div class="toc">
			<h1>Table Of Content</h1>
			<NuxtLink
				v-for="link in links"
				:key="link.id"
				:to="`#${link.id}`"
				class="subtitle"
			>
				{{ link.text }}
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
const { path } = useRoute()
const articles = await queryContent(path).findOne()

const links = articles?.body?.toc?.links || []
</script>

<style scoped lang="less">
.toc-container {
	display: none;
	position: sticky;
	top: 7rem;
	justify-self: end;
	height: 24rem;

	@media (min-width: 1024px) {
		display: block;
		grid-column: span 3 / span 3;
	}

	.toc {
		padding: 0.75rem;
		border-radius: 0.375rem;
		border-width: 1px;
		min-width: 200px;

		h1 {
			padding-bottom: 0.5rem;
			margin-bottom: 0.75rem;
			font-size: 0.875rem;
			line-height: 1.25rem;
			font-weight: 700;
			border-bottom-width: 1px;
		}

		.subtitle {
			display: block;
			margin-bottom: 0.75rem;
			font-size: 0.75rem;
			line-height: 1rem;

			&:hover {
				text-decoration-line: underline;
			}
		}
	}
}
</style>
