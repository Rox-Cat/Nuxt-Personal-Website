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
	const { title, coverImg, description } = body
	try {
		// 插入小册数据
		const insertBookSql =
			'INSERT INTO books (title, coverImg, description) VALUES (?, ?, ?)'
		const [blogInsertResult] = await db.query<ResultSetHeader>(insertBookSql, [
			title,
			coverImg,
			description,
		])

		if (blogInsertResult.affectedRows === 1) {
			return responseJson(200, '上传小册成功')
		} else {
			return responseJson(400, '上传小册失败')
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '上传小册失败')
	}
})
