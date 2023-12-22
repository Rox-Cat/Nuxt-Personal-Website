<template>
	<div class="bg">
		<NuxtLayout>
			<!-- <NuxtLoadingIndicator /> -->
			<NuxtPage />
		</NuxtLayout>
	</div>

	
</template>
<style lang="less">
* {
	margin: 0;
	padding: 0;
	color: inherit;
}
body {
	background-color: @light-bg;
	color: @light-text;
}
.dark-mode body {
	background-color: @dark-bg;
	color: @dark-text;
}


</style>
