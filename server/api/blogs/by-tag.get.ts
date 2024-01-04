/* 
    根据tag获取对应的博客列表
    - 请求值
        - tag名称
    - 返回值
        - 包含博客信息的数组
*/
import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 获取参数
	let { page, pageSize, tag } = getQuery(event)
	// 参数检验
	if (!pageSize || !page) {
		return responseJson(404, 'pageSize 或 page 不能为空')
	}
	// 检查tag参数是否为空
	if (!tag) {
		return responseJson(400, 'tag 不能为空')
	}
	page = +page
	pageSize = +pageSize

	// 查询数据库
	try {
		const sql =
			'SELECT b.* FROM blogs b JOIN blogs_tags bt ON b.id = bt.blogID WHERE bt.tagName = ? ORDER BY b.createdAt DESC LIMIT ? OFFSET ?;'
		const [result] = await db.query<RowDataPacket[]>(sql, [
			tag,
			pageSize,
			(page - 1) * pageSize,
		])

		// 判断查询结果是否为空
		if (result.length > 0) {
			// 根据博客id去查询该博客对应的tags
			for (const blog of result) {
				const getTagsql = 'SELECT tagName FROM blogs_tags WHERE blogID = ?'
				const [tagResults] = await db.query<RowDataPacket[]>(getTagsql, [blog.id])
				blog.tags = tagResults.map((item) => item.tagName)
			}
			return responseJson(200, '获取最近博客成功', {
				blogList: result,
			})
		} else {
			return responseJson(404, '博客列表为空')
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务器有误')
	}
})
