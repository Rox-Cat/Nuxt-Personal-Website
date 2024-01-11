<script setup lang="ts">
const route = useRoute()
const path = computed(() => route.fullPath.replace('/', ''))

const colorMode = useColorMode()
function onClick(val: string) {
	colorMode.preference = val
}
</script>

<template>
	<!-- 导航栏 -->
	<div class="navbar">
		<!-- 容器 -->
		<div class="container">
			<!-- 网站标题 -->
			<div class="title">
				<NuxtLink to="/" :class="{ underline: path === '' }">
					Rox7的博客😁
				</NuxtLink>
			</div>

			<!-- 网站菜单 -->
			<div class="menu">
				<div>
					<NuxtLink to="/write" :class="{ underline: path === 'write' }">
						写作
					</NuxtLink>
				</div>
				<div>
					<NuxtLink to="/blogs" :class="{ underline: path === 'blogs' }">
						博客
					</NuxtLink>
				</div>
				<div>
					<NuxtLink to="/books" :class="{ underline: path === 'books' }">
						文档
					</NuxtLink>
				</div>
				<div>
					<NuxtLink
						to="/categories"
						:class="{ underline: path === 'categories' }"
					>
						分类
					</NuxtLink>
				</div>
				<div>
					<NuxtLink
						to="/about"
						aria-label="About me"
						:class="{ underline: path === 'about' }"
					>
						关于我
					</NuxtLink>
				</div>
				<div>
					<NuxtLink to="/data" :class="{ underline: path === 'data' }">
						数据
					</NuxtLink>
				</div>
				<div>
					<ClientOnly>
						<button
							v-if="colorMode.value === 'light'"
							@click="onClick('dark')"
						>
							<Icon name="icon-park:moon" size="22" />
						</button>
						<button
							v-if="colorMode.value === 'dark'"
							@click="onClick('light')"
						>
							<Icon name="noto:sun" size="22" />
						</button>
						<template #fallback>
							<!-- this will be rendered on server side -->
							<Icon name="svg-spinners:180-ring" size="22" />
						</template>
					</ClientOnly>
				</div>
			</div>

			<div class="mobile-menu">
				<Icon name="ep:operation" size="25" color="#ffffff"></Icon>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.navbar {
	padding: 1.25rem 2.5rem;
	font-weight: 600;
	border-bottom: 1px solid @title-color;
	background-color: @bg-color;
	.container {
		display: flex;
		max-width: 100rem;
		margin: 0 auto; // 水平居中

		// flex布局设置
		justify-content: space-between;
		align-items: center;

		.title {
			font-weight: 700;
			font-size: 1.5rem;
			letter-spacing: 0.1rem;
			color: @title-color;
			min-width: 6.25rem;
			@media (max-width: @ipad) {
				font-size: 1rem;
			}
		}

		.menu {
			align-items: center;
			gap: 0.75rem;
			font-size: 0.875rem;
			display: none;
			@media (min-width: @ipad) {
				gap: 1.5rem;
				font-size: 1.125rem;
				display: flex;
			}
		}

		.mobile-menu {
			display: block;
			@media screen and (min-width: @ipad) {
				display: none;
			}
		}
		.underline {
			text-underline-offset: 5px; /* 调整下划线与文字之间的距离 */
			text-decoration: underline;
			text-decoration-thickness: 3px; /* 调整下划线粗细 */
		}
	}
}

button {
	border: none;
	transition: all 0.5s;
	background-color: @bg-color;
	&:hover {
		transform: scale(1.1);
		cursor: pointer;
	}
}
// dark-mode不能放在里面


a {
	text-decoration: none;
}
</style>
