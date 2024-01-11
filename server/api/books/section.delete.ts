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
	const { sectionID } = getQuery(event)
	try {
		const delSectionSql = 'DELETE FROM sections WHERE id = ?;'
		const [delSectionRes] = await db.query<ResultSetHeader>(delSectionSql, [sectionID])

		if (delSectionRes.affectedRows === 1) {
			return responseJson(200, '删除文章成功')
		} else {
			return responseJson(404, '文章不存在')
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务端有误')
	}
})
