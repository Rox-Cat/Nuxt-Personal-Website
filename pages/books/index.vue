<template>
	<div class="container">
		<BookHero></BookHero>
		<ClientOnly>
			<div class="blog-cards">
				<template v-for="book in booksList" :key="book.id">
					<BookCard
						:path="'/books/' + book.title + '/1/1'"
						:title="book.title"
						:date="book.createdAt"
						:description="book.description"
						:image="book.coverImg"
					/>
				</template>
			</div>

			<BookCard
				v-if="booksList.length <= 0"
				title="No Post Found"
				image="/not-found.jpg"
			/>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
const booksList = ref([])
const { data: books } = await getBooksFetch()
if (books.value === null) {
	alert('No data found')
} else {
	// @ts-ignore
	booksList.value = books.value?.data || []
}
</script>

<style scoped lang="less">
.container {
	max-width: 80rem;
	margin: 0 auto;

	.blog-cards {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2.5rem;
		row-gap: 1rem;
		margin-top: 2rem;
		padding: 0 1rem;
		@media screen and (max-width: @ipad) {
			grid-template-columns: 1fr;
		}
	}
}
</style>
