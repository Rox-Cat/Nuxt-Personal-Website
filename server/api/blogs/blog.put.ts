/* 
    更新某个博客的信息
    - 请求参数：博客数据表的内容
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
	const { id, title, coverImg, content, updatedAt, tags } = body

	// 查询数据库
	try {
		// 更新博客内容
		const sql =
			'UPDATE blogs SET title = ?, coverImg = ?, content = ?, updatedAt = ? WHERE id = ?'
		const [result] = await db.query<ResultSetHeader>(sql, [
			title,
			coverImg,
			content,
			updatedAt,
			id,
		])
		if (result.affectedRows !== 1) {
			return responseJson(404, '更新博客失败')
		}

		const delOldTagsSql = 'DELETE FROM blogs_tags WHERE blogID = ?'
		await db.query<ResultSetHeader>(delOldTagsSql, [id])
		// 更新标签
		for (const tag of tags) {
			const [tagResult] = await db.query<ResultSetHeader>(
				'INSERT INTO blogs_tags (tagName, blogID) VALUES (?,?);',
				[tag, id],
			)
			if (tagResult.affectedRows === 0) {
				return responseJson(404, '更新博客的Tag失败')
			}
		}

		return responseJson(200, '更新博客成功')
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务器有误')
	}
})
