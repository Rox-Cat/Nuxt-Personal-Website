<template>
	<div class="container">
		<div class="header">
			<div class="photo">
				<img src="/avatar.jpg" alt="" />
			</div>
		</div>
		<div class="about block">
			<h1 class="title">🤸关于我</h1>
			<div class="items">
				<li>年龄: 属🐰</li>
				<li>身高: 178cm</li>
				<li>体重: 60Kg</li>
				<li>👨‍🎓 2024届研究生</li>
				<li>🎈 本科 -> 自动化</li>
				<li>✨ 硕士 -> 控制科学与工程</li>
				<li>👨‍💻 一名准前端开发工程师</li>
				<li>🏄‍♀️ 喜欢编程、🏓</li>
				<li>📮 xxx@foxmail.com</li>
			</div>
		</div>

		<div class="technology block">
			<h1 class="title">📖专业技能</h1>
			<div class="items">
				<li>😁 熟悉 HTML5、CSS3、JavaScript、ES6+、Ajax 等前端基础知识；</li>
				<li>😎 熟悉 Vue.js 前端框架，能够熟练使用 Vue 全家桶开发单页面应用；</li>
				<li>😆 熟悉Typescript，能够编写高质量的Typescript类型；</li>
				<li>
					😊 熟练使用 Element Plus 组件库，用过 Webpack/Vite
					等前端工程化和优化工具；
				</li>
				<li>😝 熟悉Vue、Pinia、Axios等工具库的原理；</li>
				<li>
					🤫 熟悉Node.js、Express、MongoDB
					等后端开发技术，能够实现简单的前后端分离和数据交互；
				</li>
				<li>🐶 熟练使用Nuxt开发同构渲染网站，能够基于Nuxt进行一定的SEO优化；</li>
				<li>
					😸 熟练使用 Python 进行数据分析与处理, Python is the best language；
				</li>
				<li>😃 熟悉常用的数据结构与算法、计算机网络知识；</li>
			</div>
		</div>

		<div class="other block">
			<h1 class="title">📍关于本站</h1>
			<div class="items">
				<li>💻 整个项目是基于Nuxt开发，支持服务端 + 客户端渲染；</li>
				<li>✡️ 数据库采用Mysql；</li>
				<li>🏫 图片存储在阿里云OSS；</li>
				<li>🤖 服务器使用的腾讯云；</li>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.dark-mode {
	.container .block {
		box-shadow: 10px 10px 10px rgba(255, 254, 254, 0.147);
	}
}
.container {
	width: 100%;
	margin: 0 auto;
	max-width: 80rem;

	.header {
		.photo {
			img {
				display: block;
				margin: 0 auto;
				width: 10rem;
				height: 10rem;
				border-radius: 50%;
			}
		}
	}

	.block {
		box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.05);

		padding: 1rem;
		margin: 2.5rem 2.5rem;
		.title {
			padding-bottom: 1rem;
			border-bottom: 1px solid #000;
		}

		.items {
			li {
				padding-top: 1rem;
				font-size: 1.25rem;
				font-weight: 600;
				line-height: 1.5;
				@media screen and (max-width: @ipad) {
					font-size: 1rem;
				}
			}
		}
	}

	.about {
		.items {
			display: grid;
			grid-template-rows: repeat(3, 1fr);
			grid-auto-flow: column;
			// direction: ;
			@media screen and (max-width: @ipad) {
				grid-template-columns: 1fr;
			}
		}
	}
}
</style>
