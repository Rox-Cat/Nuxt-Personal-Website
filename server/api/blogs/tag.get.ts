/* 
    更新tag
*/
import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 获取请求数据
	const { tagName } = getQuery(event)

	try {
		const getTagSql = 'SELECT * FROM tags WHERE tagName = ?'
		const [tagData] = await db.query<RowDataPacket[]>(getTagSql, [tagName])

		if (tagData.length !== 1) {
			return responseJson(400, '该tag信息为空')
		}
		return responseJson(200, '获取tag信息成功', tagData[0])
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务器有误')
	}
})
