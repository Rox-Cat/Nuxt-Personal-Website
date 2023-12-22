<template>
	<div class="container">
		<header>
			<MainHeader />
		</header>
		<main>
			<slot />
		</main>
		<footer>
			<MainFooter />
		</footer>
	</div>
</template>

<style lang="less" scoped>
.container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	header {
		position: fixed;
		width: 100%;
		z-index: 10;
	}
	main {
		// header： 高度 + padding
		padding-top: 5rem;
		margin: 0 auto;
		flex-grow: 0;
		width: 100%;
	}
}
</style>
