import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 获取请求数据
	const { chapterID } = getQuery(event)

	// 查询数据库
	try {
		const getSectionsSql =
			'SELECT * FROM sections WHERE chapterID = ? ORDER BY number'
		const [getSectionsRes] = await db.query<RowDataPacket[]>(getSectionsSql, [
			chapterID,
		])

		if (getSectionsRes.length !== 0) {
			const sections = []
			for (let section of getSectionsRes) {
				sections.push({
					title: section.title,
					number: section.number,
					id: section.id,
				})
			}
			return responseJson(200, '通过ID获取文章成功', sections)
		} else {
			return responseJson(404, '文章不存在')
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务端有误')
	}
})
