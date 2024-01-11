import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 查询数据库
	try {
		
		const getBookSql = 'SELECT * FROM books'
		const [getBookRes] = await db.query<RowDataPacket[]>(getBookSql)

		if (getBookRes.length !== 0) {
			return responseJson(200, '通过所有book成功', getBookRes)
		} else {
			return responseJson(404, '当前不存在book')
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务端有误')
	}
})
