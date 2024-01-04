/* 
    获取博客，根据博客Id来获取博客内容
    请求参数：
        - blog_id
    返回参数：
        - blog数据库的内容
*/

import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 获取请求数据
	const { id } = getQuery(event)

	// 查询数据库
	try {
		const sql = 'SELECT * FROM blogs WHERE id = ?'
		const [blogResult] = await db.query<RowDataPacket[]>(sql, [id])
		if (blogResult.length === 1) {
			const getTagsql = 'SELECT tagName FROM blogs_tags WHERE blogID = ?'
			const [tagResults] = await db.query<RowDataPacket[]>(getTagsql, [id])
			blogResult[0].tags = tagResults.map((item) => item.tagName)
			return responseJson(200, '通过ID获取博客成功', blogResult[0])
		} else {
			return responseJson(404, '博客不存在1')
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务端有误')
	}
})
