/* 
    提交某个博客的信息
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
import type { ResultSetHeader, RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 获取请求数据
	const body = await readBody(event)
	const { title, coverImg, content, tags } = body
	console.log(tags)
	try {
		let blogId

		// 插入博客数据
		const insertBlogSql =
			'INSERT INTO blogs (title, coverImg, content) VALUES (?, ?, ?)'
		const [blogInsertResult] = await db.query<ResultSetHeader>(insertBlogSql, [
			title,
			coverImg,
			content,
		])

		if (blogInsertResult.affectedRows === 1) {
			blogId = blogInsertResult.insertId

			// 遍历标签数组
			if (tags && tags.length > 0) {
				for (const tagName of tags) {
					// 插入博客标签关联数据
					const insertBlogTagsSql =
						'INSERT INTO blogs_tags (blogID, tagName) VALUES (?, ?)'
					const [result] = await db.query<ResultSetHeader>(insertBlogTagsSql, [
						blogId,
						tagName,
					])
					console.log(result)
					if (result.affectedRows !== 1) {
						return responseJson(400, '上传博客失败')
					}
				}
			}

			return responseJson(200, '上传博客成功')
		} else {
			return responseJson(400, '上传博客失败')
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '上传博客失败')
	}
})
