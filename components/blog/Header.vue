<template>
	<header>
		<h1 class="title">{{ title }}</h1>
	</header>
	<NuxtImg class="img" :src="coverImg" :alt="alt || ''" width="600"> </NuxtImg>
	<div class="info">
		<div class="tips">
			<div class="date">
				<LogoDate />
				<p>{{ createdAt }}</p>
			</div>
			<div class="tags">
				<LogoTag />
				<template v-for="tag in tags" :key="tag">
					<span class="tag">{{ tag }}</span>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	title: string
	coverImg: string
	alt: string
	createdAt: string
	tags: Array<string>
}

withDefaults(defineProps<Props>(), {
	title: 'no-title',
	coverImg: '#',
	alt: 'no-img',
	date: 'no-date',
	tags: () => [],
})
</script>

<style lang="less" scoped>
.title {
	font-size: 1.25rem;
	line-height: 1.75rem;
	text-align: center;
	margin: 1.75rem;
	@media (min-width: @ipad) {
		font-size: 1.875rem;
		line-height: 2.25rem;
	}
	@media (min-width: 1024px) {
		font-size: 2.25rem;
		line-height: 2.5rem;
	}
}

.img {
	display: block;
	margin: 0 auto;
	object-fit: cover;
	align-content: center;
	width: 66.7%;
	height: 8rem;
	border-radius: 1rem;
	box-shadow:
		0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);

	@media (min-width: 768px) {
		width: 80%;
		height: 18rem;
	}
}


.info {
	display: flex;
	width: 100%;
	justify-content: center;
	font-size: 0.75rem;
	line-height: 1rem;

	@media (min-width: 768px) {
		font-size: 1rem;
		line-height: 1.5rem;
	}

	.tips {
		font-size: 0.75rem;
		line-height: 1rem;
		align-content: center;
		gap: 2rem;

		@media (min-width: 640px) {
			font-size: 0.875rem;
			line-height: 1.25rem;
		}
		@media (min-width: 768px) {
			display: flex;
		}

		.date {
			display: flex;
			font-weight: 600;
			align-items: center;
		}

		.tags {
			display: flex;
			margin-top: 1.25rem;
			margin-bottom: 1.25rem;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.5rem;

			.tag {
				padding-top: 0.25rem;
				padding-bottom: 0.25rem;
				padding-left: 0.5rem;
				padding-right: 0.5rem;
				font-weight: 600;
				border-radius: 0.375rem;
			}
		}
	}
}
</style>
