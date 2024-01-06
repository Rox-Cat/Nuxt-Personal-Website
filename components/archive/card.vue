<template>
	<article class="article">
		<NuxtLink :to="path" class="card">
			<div class="card-img">
				<NuxtImg class="img" width="300px" :src="image" />
			</div>
			<div class="content">
				<h2 class="title">{{ title }}</h2>
				<p class="description">
					这个是一个CSS属性，用来定义网格布局中的列的数量和大小。1
					这个属性的值是一个空格分隔的列表，每个值表示一个列的大小。1
					这个属性的值中，有一个函数repeat()，它可以让你重复一个或多个值，而不用写很多次。1
					这个属性的值中，有一个函数minmax()，它可以让你设置一个列的最小和最大大小。1
					这个属性的值中，有一个单位fr，它表示可用空间的剩余部分的比例。1
					所以，这个属性的值repeat(1, minmax(0, 1fr))的意思是：
					{{ description }}
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

<style lang="less" scoped>
.article {
	border: 1px solid #d1d5db;
	margin: 0.5rem;
	border-radius: 1rem;
	// ?
	overflow: hidden;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

	.card {
		&:hover {
			transform: scale(1.05);
			transition: all 0.5s;
		}
		transition: all 0.5s;
		display: grid;
		gap: 0.25rem;
		@media screen and (max-width: (@ipad - 1px)) {
			grid-template-columns: repeat(1, minmax(0, 1fr));
			grid-template-rows: 50% 50%;
			height: 28rem;
		}

		@media (min-width: @ipad) {
			grid-template-columns: repeat(10, minmax(0, 1fr));
			height: 18.75rem;
		}

		.card-img {
			overflow: hidden;
			@media (min-width: @ipad) {
				grid-column: span 3 / span 3;
			}

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
					border-bottom-left-radius: 1rem;
					border-top-left-radius: 0;
					border-top-right-radius: 0;
				}
			}
		}

		.content {
			padding: 1.25rem;
			@media (min-width: @ipad) {
				grid-column: span 7 / span 7;
			}
			display: grid;

			.title {
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
				-webkit-line-clamp: 2;
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
