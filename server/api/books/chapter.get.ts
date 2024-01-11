import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 获取请求数据
	const { chapterID } = getQuery(event)

	// 查询数据库
	try {
		const getChapterSql = 'SELECT * FROM chapters WHERE id = ?'
		const [getChapterRes] = await db.query<RowDataPacket[]>(getChapterSql, [
			chapterID,
		])
        
		if (getChapterRes.length === 1) {
			return responseJson(200, '通过ID获取章节成功', getChapterRes[0])
		} else {
			return responseJson(404, '文章不存在')
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务端有误')
	}
})
