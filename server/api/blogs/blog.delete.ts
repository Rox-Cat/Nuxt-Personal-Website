/* 
    删除，根据博客Id来删除博客内容
    请求参数：
        - blog_id
    返回参数：
        
*/

import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { ResultSetHeader } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 获取请求数据
	const { id } = getQuery(event)
	try {
		const delBlogTag = 'DELETE FROM blogs_tags WHERE blogID = ?;'
		const [delTagResult] = await db.query<ResultSetHeader>(delBlogTag, [id])
		if (delTagResult.affectedRows !== 0) {
			// 查询数据库
			const sql = 'DELETE FROM blogs WHERE id = ?'
			const [result] = await db.query<ResultSetHeader>(sql, [id])
			// 根据状态，返回响应
			if (result.affectedRows === 1) {
				return responseJson(200, '删除成功')
			}
		} else {
			return responseJson(404, '博客不存在')
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务端有误')
	}
})
