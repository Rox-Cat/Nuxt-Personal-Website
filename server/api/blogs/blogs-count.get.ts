/* 
    根据tag获取对应的博客数目
    - 请求值
        - tag名称
    - 返回值
        - 博客数
*/
import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {

	// 查询数据库
	try {
		const sql = 'SELECT COUNT(*) AS blogsCount FROM blogs'
		const [result] = await db.query<RowDataPacket[]>(sql)
		// 返回结果
		return responseJson(200, '获取tag博客数目成功', {
			totalCount: result[0]['blogsCount'],
		})
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务器有误')
	}
})