import type { UploadBlogRequest, UpdateBlogRequest, GetBlogResponse } from '../types/blog'
interface myFetchOptions {
	headers?: Record<string, string>
	[key: string]: any
}
function useHttpFetch<DataT>(url: string, options: myFetchOptions) {
	// 添加请求头
	const headers = {
		...options.headers,
	}

	options.headers = headers
	return useFetch<DataT>(url, {
		...options,
		baseURL: 'http://localhost:3000/', // 基本url

		/* 暂时没搞懂怎么用？ */
		// onRequest({ request, options }) {
		// 	console.log('request', request)
		// },
		// onRequestError({ request, options, error }) {
		// 	console.log('requestError', request)
		// },
		onResponse({ request, response, options }) {
			// 处理响应数据
			// response.data.test = 'test'
			// console.log('response', response)
		},
		onResponseError({ request, response, options }) {
			// 处理响应错误
			console.log('responseError', response)
		},
	})
}

/* 暂时只写控制输入的类型，因为输出的类型，我有点整不明白 */
// 单个博客
export const getBlogFetch = (blogId: number) => {
	return useHttpFetch<GetBlogResponse>(`api/blogs/blog`, {
		method: 'GET',
		query: {
			id: blogId,
		},
	})
}

// 上传
export const uploadBlogFetch = (blog: UploadBlogRequest) => {
	return useHttpFetch('api/blogs/blog', {
		method: 'POST',
		body: blog,
	})
}

// 删除
export const deletBlogFetch = (blogId: number) => {
	return useHttpFetch('api/blogs/blog', {
		method: 'DELETE',
		query: {
			id: blogId,
		},
	})
}

// 更新博客
export const updateBlogFetch = (blog: UpdateBlogRequest) => {
	return useHttpFetch('api/blogs/blog', {
		method: 'PUT',
		body: blog,
	})
}

// 获取博客列表
export const getBlogsFetch = (page: number, pageSize: number) => {
	return useHttpFetch('api/blogs/blogs', {
		method: 'GET',
		query: {
			page,
			pageSize,
		},
	})
}

// 获取热门博客
export const getHotBlogsFetch = () => {
	return useHttpFetch('api/blogs/hot', {
		method: 'GET',
	})
}

// 获取所有的tags
export const getTagsFetch = () => {
	return useHttpFetch('api/blogs/tags', {
		method: 'GET',
	})
}

// 新增tag
export const addTagsFetch = (tagName: string, description: string) => {
	return useHttpFetch('/blogs/tags', {
		method: 'POST',
		body: {
			tagName,
			description,
		},
	})
}

// 根据tag获取博客列表
export const getBlogsByTagFetch = (tag: string, page: number, pageSize: number) => {
	return useHttpFetch('api/blogs/by-tag', {
		method: 'GET',
		query: {
			tag,
			page,
			pageSize,
		},
	})
}

// 根据tag获取博客数目
export const getBlogsCountByTagFetch = (tag: string) => {
	return useHttpFetch('api/blogs/blogs-count-by-tag', {
		method: 'GET',
		query: {
			tag,
		},
	})
}