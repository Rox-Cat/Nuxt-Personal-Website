<template>
	<div class="toc-container">
		<div class="toc">
			<h1>Table Of Content</h1>
			<div class="content">
				<template
					v-for="(title, index) in catalogue"
					:key="index"
				>
					<NuxtLink
						v-if="title.level === 2 || title.level === 3"
						:to="`#${title.text}`"
						class="toc-link"
						:class="title.level === 2 ? 'level2' : 'level3'"
					>
						{{ title.text }}
					</NuxtLink>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps(['catalogue'])
console.log(props.catalogue)
</script>

<style scoped lang="less">
.toc-container {
	overflow: auto;
	display: flex;
	position: sticky;
	top: 7rem;
	justify-self: end;
	height: 100vh - 10rem;
	// background-color: @light-bg;
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
			font-size: 1.2rem;
			line-height: 1.25rem;
			font-weight: 700;
			border-bottom-width: 1px;
		}

		.content {
			
			border-left: 2px solid #e2e2e3;
			.toc-link {
				display: block;
				padding: 0.25rem 1rem;
				margin-bottom: 0.75rem;
				font-size: 1rem;
				line-height: 1rem;
				text-decoration: none;
				&:hover {
					color: brown;
				}
			}

			.level3 {
				margin-left: 1.5rem;
			}
		}
	}
}
</style>
