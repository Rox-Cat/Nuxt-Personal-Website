<script lang="ts" setup>
interface Props {
	path?: string
	title?: string
	date?: string
	description?: string
	image?: string
	tags?: Array<string>
}

withDefaults(defineProps<Props>(), {
	path: '/',
	title: 'no-title',
	date: 'no-date',
	description: 'no-description',
	image: '/nuxt-blog/no-image_cyyits.png',
	alt: 'no-alt',
	tags: () => [],
})
</script>

<template>
	<article class="article">
		<NuxtLink :to="path" class="card">
			<!-- 图片 -->
			<div class="card-img">
				<NuxtImg class="img" width="300px" :src="image" />
			</div>

			<!-- 内容 -->
			<div class="content">
				<h2 class="title">{{ title }}</h2>
				<p class="description">
					{{ description || "no-description"}}
				</p>
				<div class="info">
					<div class="date">
						<LogoDate />
						<p>{{ date }}</p>
					</div>
					<div class="tags">
						<LogoTag />
						<p v-for="tag in tags" :key="tag">
							{{ tag }}
						</p>
					</div>
				</div>
				<div class="more">
					<p>Read More</p>
					<LogoArrow />
				</div>
			</div>
		</NuxtLink>
	</article>
</template>
<style lang="less" scoped>
.article {
	border: 1px solid #d1d5db;
	margin: 0.5rem;
	border-radius:1rem;
	overflow: hidden;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

	.card {
		&:hover {
			transform: scale(1.02);
			transition: all 0.5s;
		}
		height: 100%;
		display: grid;
		grid-template-rows: 1fr 1fr;
		gap: 0.25rem;

		.card-img {
			overflow: hidden;
			max-height: 15rem;
			.img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				max-width: 100%;
				object-position: center;
				border-top-left-radius: 1rem;
				border-top-right-radius: 1rem;
				box-shadow:
					0 10px 15px -3px rgba(0, 0, 0, 0.1),
					0 4px 6px -2px rgba(0, 0, 0, 0.05);

				@media (min-width: @ipad) {
					border-top-left-radius: 1rem;
					border-top-right-radius: 1rem;
				}
			}
		}

		.content {
			padding: 1.25rem;
			display: grid;
			align-items: center;
			.title {
				.light-title-3;
				text-align: center;
				&:hover {
					color: #0ea5e9;
				}
			}

			.description {
				margin: 1rem 0;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}

			.info {
				font-size: 0.875rem;
				padding: 0.25rem 0;
				display: flex;
				flex-wrap: wrap;
				gap: 1.5rem;

				.date {
					display: flex;
					align-items: center;
				}

				.tags {
					display: flex;
					align-items: center;
					gap: 0.25rem;
					flex-wrap: wrap;
				}
			}

			.more {
				display: flex;
				align-items: center;
				padding-top: 0.5rem;
				color: #0ea5e9;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
}


a {
	text-decoration: none;
}
</style>
