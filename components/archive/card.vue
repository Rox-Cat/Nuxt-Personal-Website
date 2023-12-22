<template>
	<article class="article">
		<NuxtLink :to="path" class="card">
			<div class="card-img">
				<NuxtImg class="img" width="300" :src="image" :alt="alt" />
			</div>
			<div class="content">
				<h2 class="title">{{ title }}</h2>
				<p class="description">{{ description }}</p>
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

<script lang="ts" setup>
interface Props {
	path?: string
	title?: string
	date?: string
	description?: string
	image?: string
	alt?: string
	ogImage?: string
	tags?: Array<string>
	published?: boolean
}

withDefaults(defineProps<Props>(), {
	path: '/',
	title: 'no-title',
	date: 'no-date',
	description: 'no-description',
	image: '/nuxt-blog/no-image_cyyits.png',
	alt: 'no-alt',
	ogImage: '/nuxt-blog/no-image_cyyits.png',
	tags: () => [],
	published: false,
})
</script>

<style lang="less" scoped>
.article {
	border: 1px solid;
	border-color: #d1d5db;
	margin: 0.5rem;
	border-radius: 0.5rem;
	// ?
	overflow: hidden;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

	.card {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 0.25rem;

		@media (min-width: @ipad) {
			grid-template-columns: repeat(10, minmax(0, 1fr));
		}

		.card-img {
			@media (min-width: 640px) {
				grid-column: span 3 / span 3;
			}

			.img {
				height: 100%;
				width: 100%;
				object-fit: cover;
				object-position: center;
				border-top-left-radius: 1rem;
				border-top-right-radius: 1rem;
				box-shadow:
					0 10px 15px -3px rgba(0, 0, 0, 0.1),
					0 4px 6px -2px rgba(0, 0, 0, 0.05);

				@media (min-width: 640px) {
					border-top-left-radius: 1rem;
					border-bottom-left-radius: 1rem;
					border-top-left-radius: 0;
					border-top-right-radius: 0;
				}

				&:hover {
					transform: scale(1.02);
					transition: all 0.5s;
				}
			}
		}

		.content {
			padding: 1.25rem;
			@media (min-width: 640px) {
				grid-column: span 7 / span 7;
			}

			.title {
				font-size: 1.125rem;
				font-weight: 600;
				margin-bottom: 0.25rem;
				padding-bottom: 0.25rem;
				&:hover {
					color: #0ea5e9;
				}
			}

			.description {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.info {
				font-size: 0.875rem;
				margin-top: 0.5rem;
				margin-bottom: 0.25rem;
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

.dark-mode {
	.article {
		border-color: @light-bg;
		color: @dark-text;
	}
	.title {
		color: #d1d5db;
	}
}

a {
	text-decoration: none;
}
</style>
