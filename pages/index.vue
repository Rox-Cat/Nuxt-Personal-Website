<template>
	<main>
		<div class="aside-preson">
			<MainPerson></MainPerson>
		</div>
		<div class="content">
			<MainHero />
			<MainRecent></MainRecent>
			<MainHot></MainHot>
		</div>
	</main>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
main {
	max-width: 100rem;
	margin: 0 auto;
	display: grid;
	grid-template-columns: minmax(0, 20rem) auto;
	@media screen and (@max-ipad) {
		grid-template-columns: minmax(0, 1fr);
	}
	
	.content {
		padding: 0 1.25rem;
	}
}
</style>
