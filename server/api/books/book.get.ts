import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 获取请求数据
	let { bookTitle } = getQuery(event)

	// @ts-ignore
	bookTitle = bookTitle.toUpperCase()
	// 查询数据库

	try {
		const getBookSql = 'SELECT * FROM books WHERE title = ?'
		const [getBookRes] = await db.query<RowDataPacket[]>(getBookSql, [bookTitle])

		if (getBookRes.length === 1) {
			const bookID = getBookRes[0].id
			// 查询章节
			const getChapterSql = 'SELECT * FROM chapters WHERE bookID = ?'
			const [getChapterRes] = await db.query<RowDataPacket[]>(getChapterSql, [
				bookID,
			])
			getBookRes[0].chapters = getChapterRes

			// 查询章节的文章标题
			for (const chapter of getChapterRes) {
				const chapterID = chapter.id
				const getSectionsSql =
					'SELECT * FROM sections WHERE chapterID = ? ORDER BY number'
				const [getSectionsRes] = await db.query<RowDataPacket[]>(getSectionsSql, [
					chapterID,
				])

				chapter.sections = getSectionsRes.map((section) => {
					return {
						title: section.title,
						number: section.number,
						id: section.id,
					}
				})
			}

			return responseJson(200, '通过ID获取book成功', getBookRes[0])
		} else {
			return responseJson(404, 'book不存在')
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务端有误')
	}
})
