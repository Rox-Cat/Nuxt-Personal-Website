/* 
    更新tag
*/
import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { ResultSetHeader, RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 获取请求数据
	const body = await readBody(event)
	const { tagName, description } = body

	try {
		const createTagSql = 'INSERT INTO tags (tagName, description) VALUES (?, ?)'
		const [result] = await db.query<ResultSetHeader>(createTagSql, [tagName, description])

		if (result.affectedRows !== 1) {
			return responseJson(400, '新增tag失败')
		}
		return responseJson(200, '新增tag成功')
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务器有误')
	}
})
