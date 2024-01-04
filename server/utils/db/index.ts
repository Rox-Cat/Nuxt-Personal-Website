// 导入数据库
import mysql from 'mysql2'

// 创建与数据的连接
const db = mysql
	.createPool({
		host: 'localhost',
		user: 'root',
		port: 3307,
		password: 'admin123',
		database: 'website',
	})
	.promise()

export default db
