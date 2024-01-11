import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { ResultSetHeader } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 获取请求数据
	const { chapterID } = getQuery(event)
	try {
		const delSectionSql = 'DELETE FROM sections WHERE chapterID = ?;'
		const [delSectionRes] = await db.query<ResultSetHeader>(delSectionSql, [
			chapterID,
		])
		if (delSectionRes.affectedRows !== 0) {
			// 查询数据库
			const delChapterSql = 'DELETE FROM chapters WHERE id = ?'
			const [delChapterRes] = await db.query<ResultSetHeader>(delChapterSql, [
				chapterID,
			])
			// 根据状态，返回响应
			if (delChapterRes.affectedRows === 1) {
				return responseJson(200, '删除成功')
			}
		} else {
			return responseJson(404, '章节不存在')
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务端有误')
	}
})
