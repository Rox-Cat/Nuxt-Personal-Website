export interface BlogPost {
	title: string
	date: string
	description: string
	image: string
	alt: string
	ogImage: string
	tags: string[]
	published: boolean
}

/* 统一的格式 */
// 返回数据的格式
export interface Response {
	code: number
	msg: string
	data: {}
}
// 一个博客的数据
export interface BlogData {
	id: number
	coverImg: string
	title: string
	content: string
	createdAt: string
	updatedAt: string
	likeNum: number
	viewNum: number
	commentNum: number
	tags: string[]
}

// 获取单个博客的返回值类型
export interface GetBlogResponse extends Response {
	data: BlogData
}

// 上传博客
export interface UploadBlogRequest {
	content: string
	coverImg: string
	title: string
}

export type UploadBlogResponse = Response

// 删除博客
export type DeleteBlogResponse = Response

// 更新博客
export interface UpdateBlogRequest {
	id: number
	coverImg: string
	title: string
	content: string
	updatedAt: Date
}
export type UpdateBlogResponse = Response

// 获取博客列表
export interface GetBlogListRequest extends Response {
	data: {
		blogList: BlogData[]
	}
}
