/* 
    获取最近的博客
    要不要和博客列表合并？
    - 请求值
    - 返回值
        - 包含博客信息的数组
*/
import db from '../../utils/db/index'
import { responseJson } from '../../utils/helper'
import type { RowDataPacket } from 'mysql2'
export default defineEventHandler(async (event) => {
	// 查询数据库
	try {
		const sql = 'SELECT * FROM blogs ORDER BY viewNum DESC LIMIT 10;'
		const [result] = await db.query<RowDataPacket[]>(sql)
		if (result.length === 0) {
			return responseJson(404, '博客列表为空')
		} else {
			return responseJson(200, '获取热门博客成功', {
                blogList: result
            })
		}
	} catch (err) {
		console.log(err)
		return responseJson(500, '服务器有误')
	}
})
