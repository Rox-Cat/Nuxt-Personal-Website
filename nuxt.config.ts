
export default defineNuxtConfig({

	devtools: { enabled: true },
	app: {
		head: {
			htmlAttrs: {
				lang: 'zh-CN',
			},
			title: 'Rox7的个人网站',
			titleTemplate: '%s - Rox7的个人网站',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'author', content: 'Rox7' },
				{
					name: 'viewport',
					content:
						'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
				},
				{ name: 'apple-mobile-web-app-capable', content: 'yes' },
			],
		},
		layoutTransition: { name: 'layout', mode: 'out-in' },
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	// runtimeConfig: {
	// 	isServer: 'True',
	// 	accessKeyId: process.env.SECRET_ID,
	// 	accessKeySecret: process.env.SECRET_KEY,
	// 	bucket: process.env.BUCKET,
	// 	region: process.env.REGION,
	// },
	modules: ['nuxt-icon', '@nuxtjs/color-mode', '@nuxt/image', '@element-plus/nuxt'],
	vite: {
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
					additionalData: "@import '~/style/main.less';",
				},
			},
		},
		// optimizeDeps: {
		// 	exclude: ['mysql2'],
		// },
	},
})
