/**
 * 1、判断用户是否登录
 * 2、上传头像
 */


import OSS from 'ali-oss'
import { responseJson } from '../../utils/helper'


export default defineEventHandler(async (event) => {
	//获取数据
	const body = await readMultipartFormData(event)

	if (body) {
		if (
			body[0].type !== 'image/jpeg' &&
			body[0].type !== 'image/png' &&
			body[0].type !== 'image/jpg'
		) {
			return responseJson(1, '请上传jpg/png/jpeg类型的图片', {})
		}
		const config = useRuntimeConfig(event)
		//图片名称
		const fileName = Date.now() + '-' + body[0].filename
		//图片数据
		const buffer = body[0].data
		const client = new OSS({
			// yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
			region: config.region,
			// 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
			accessKeyId: config.accessKeyId,
			accessKeySecret: config.accessKeySecret,
			// 填写Bucket名称。
			bucket: config.bucket,
		})

		// const headers = {
		// 	// 指定Object的存储类型。
		// 	"x-oss-storage-class": "Standard",
		// 	// 指定Object的访问权限。
		// 	"x-oss-object-acl": "private",
		// 	// 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.jpg。
		// 	// 'Content-Disposition': 'attachment; filename="example.jpg"'
		// 	// 设置Object的标签，可同时设置多个标签。
		// 	"x-oss-tagging": "Tag1=1&Tag2=2",
		// 	// 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
		// 	"x-oss-forbid-overwrite": "true",
		// }

		async function put() {
			try {
				// 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
				// 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
				const result = await client.put(`blogs/${fileName}`, buffer)
				return result
			} catch (e) {
				console.log(e)
			}
		}
		try {
			const result = await put()
			const avatarUrl = result?.url
			return responseJson(0, '上传头像成功', {
				avatar: avatarUrl,
			})
		} catch (e) {

			console.log('error', e)
			setResponseStatus(event, 500)
			return responseJson(500, '服务器错误', {})
		}
	}
})
