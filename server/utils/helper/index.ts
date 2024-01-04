import type { H3EventContext } from "h3"

export const responseJson = (code: number, msg: string, data: object = {}) => {
	// data的类型应该被规范
	return {
		code: code,
		msg: msg,
		data: data,
	}
}

export const getLoginUid = (event: H3EventContext) => {
	return event.context.auth? event.context.auth.uid : 0
}

// 获取当前时间
export const getTitle = () => {
	// 获取当前时间，年月日
	return new Date().toLocaleString().split(" ")[0]
}