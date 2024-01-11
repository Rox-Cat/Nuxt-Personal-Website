/* 
    提交某个小册的信息
    - 请求参数：小册数据表的内容
    - 返回值
        - {
            "code",
            "msg",
            "data",
        }
*/
import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { ResultSetHeader } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 获取请求数据
	const body = await readBody(event)
	const { chapterID, title, number, content } = body
	try {
		// 插入篇信息
		const insertBookSql =
			'INSERT INTO sections (chapterID, title, number, content) VALUES (?, ?, ?, ?)'
		const [blogInsertResult] = await db.query<ResultSetHeader>(insertBookSql, [
			chapterID,
			title,
			number,
			content,
		])

		if (blogInsertResult.affectedRows === 1) {
			return responseJson(200, '上传篇成功')
		} else {
			return responseJson(400, '上传篇失败')
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '上传篇失败')
	}
})
