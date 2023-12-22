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
					Rox7's Blog
				</NuxtLink>
			</div>

			<!-- 网站菜单 -->
			<div class="menu">
				<div>
					<NuxtLink to="/blogs" :class="{ underline: path === 'blogs' }">
						Blogs
					</NuxtLink>
				</div>
				<div>
					<NuxtLink
						to="/categories"
						:class="{ underline: path === 'categories' }"
					>
						Categories
					</NuxtLink>
				</div>
				<div>
					<NuxtLink
						to="/about"
						aria-label="About me"
						:class="{ underline: path === 'about' }"
					>
						About
					</NuxtLink>
				</div>
				<div>
					<ClientOnly>
						<button
							v-if="colorMode.value === 'light'"
							@click="onClick('dark')"
						>
							<Icon name="icon-park:moon" size="20" />
						</button>
						<button
							v-if="colorMode.value === 'dark'"
							@click="onClick('light')"
						>
							<Icon name="noto:sun" size="20" />
						</button>
						<template #fallback>
							<!-- this will be rendered on server side -->
							<Icon name="svg-spinners:180-ring" size="20" />
						</template>
					</ClientOnly>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.navbar {
	padding: 1.25rem 1.25rem;
	border-bottom: 1px solid;
	border-color: @light-title;
	font-weight: 600;
	background-color: @light-bg;
	.container {
		display: flex;
		max-width: 64rem;
		margin: 0 auto; // 水平居中

		// flex布局设置
		justify-content: space-between;
		align-items: center;

		.title {
			font-weight: 700;
			font-size: 1.5rem;
			@media (max-width: @ipad) {
				font-size: 1rem;
			}
		}

		.menu {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			font-size: 0.875rem;
			@media (min-width: @ipad) {
				gap: 1.5rem;
				font-size: 1.125rem;
			}
		}

		.underline {
			text-decoration: underline;
		}
	}
}

button {
	border: none;
	background-color: @light-bg;
	&:hover {
		transform: scale(1.1);
		transition: all 0.3s ease-out;
		cursor: pointer;
	}
}
// dark-mode不能放在里面
.dark-mode {
	.navbar {
		background-color: @dark-bg;
	}
	button {
		background-color: @dark-bg;
	}
}

a {
	text-decoration: none;
}
</style>
