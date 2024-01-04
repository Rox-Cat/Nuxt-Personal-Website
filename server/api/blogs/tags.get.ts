/* 
    获取所有的tag
*/
import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {
	try {
		const getTagSql = 'SELECT * FROM tags'
		const [tagData] = await db.query<RowDataPacket[]>(getTagSql)

		if (tagData.length === 0) {
			return responseJson(400, '该tag信息为空')
		}
		return responseJson(200, '获取tag信息成功', tagData)
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务器有误')
	}
})