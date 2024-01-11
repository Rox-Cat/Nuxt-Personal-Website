import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { ResultSetHeader, RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 获取请求数据
	const { bookID } = getQuery(event)
	try {
		// 先获取章节
		const getChaptersSql = 'SELECT * FROM chapters WHERE BookID = ?'
		const [getChaptersRes] = await db.query<RowDataPacket[]>(getChaptersSql, [bookID])

		if (getChaptersRes.length !== 0) {
			for (let chapterInfo of getChaptersRes) {
				// 删除章节对应的文章
				const delSectionSql = 'DELETE FROM sections WHERE chapterID = ?'
				await db.query<ResultSetHeader>(delSectionSql, [chapterInfo.id])

				// 删除章节
				const delChapterSql = 'DELETE FROM chapters WHERE id = ?'
				await db.query<ResultSetHeader>(delChapterSql, [chapterInfo.id])
			}
		}

		const delBookSql = 'DELETE FROM books WHERE id = ?;'
		const [delBookRes] = await db.query<ResultSetHeader>(delBookSql, [bookID])

		if (delBookRes.affectedRows === 0) {
			return responseJson(200, '删除小册成功')
		} else {
			return responseJson(404, '小册不存在')
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务端有误')
	}
})
