/* 
    1. 根据时间排序
    2. 获取对应的tag内容添加了tags中
*/

import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 查询数据库
	try {
		const sql = 'SELECT * FROM blogs ORDER BY createdAt DESC LIMIT 10;'
		const [result] = await db.query<RowDataPacket[]>(sql)

		if (result.length === 0) {
			return responseJson(404, '最近博客列表为空')
		} else {
			const getTagsql = 'SELECT tagName FROM blogs_tags WHERE blogID = ?'
			for (let item of result) {
				const [tagResults] = await db.query<RowDataPacket[]>(getTagsql, [item.id])
				item.tags = tagResults.map((item) => item.tagName)
			}

			return responseJson(200, '获取最近博客成功', {
				blogList: result,
			})
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务器有误')
	}
})
