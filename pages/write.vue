<template>
	<div class="container">
		<div class="info">
			<input
				type="text"
				class="title"
				placeholder="请输入文章标题..."
				v-model="article.title"
			/>
			<div class="button" @click="openDialog = !openDialog">
				<p>发布</p>
			</div>
		</div>
		<div class="md-editor">
			<MdEditor
				v-model="article.content"
				:theme="theme"
				@onSave="saveMd"
				editorId="write"
			/>
		</div>
		<div class="dialog" v-if="openDialog">
			<!-- 发布文章 -->
			<div class="dialog-title">发布文章</div>

			<!-- 编辑tags -->
			<div class="dialog-tags">
				<p class="name">添加标签<span style="color: red">*</span></p>
				<div class="tags">
					<el-select
						v-model="article.tags"
						multiple
						placeholder="Select"
						style="width: 240px"
					>
						<el-option
							v-for="item of tags"
							:key="item.tagName"
							:label="item.tagName"
							:value="item.tagName"
						/>
					</el-select>
				</div>
			</div>
			<!-- 上传封面 -->
			<div class="cover">
				<p class="name">文章封面<span style="color: red">*</span></p>
				<div class="photo">
					<el-upload
						class="avatar-uploader"
						action="/api/upload/photo"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload"
					>
						<img v-if="imageUrl" :src="imageUrl" class="avatar" />
						<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
					</el-upload>
				</div>
			</div>
			<div class="description">
				<p class="name">请编辑描述<span style="color: red">*</span></p>
				<textarea
					rows="4"
					cols="50"
					class="dialog-input"
					placeholder="请输入描述..."
				></textarea>
			</div>
			<!-- 按钮 -->
			<div class="dialog-button">
				<div class="button cancel" @click="cancel">取消</div>
				<div class="button confirm" @click="uploadBlog">确认</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3'
import '@/style/rox7.css'
import { uploadBlogFetch, getTagsFetch } from '@/composables/useHttpFetch'
import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import 'md-editor-v3/lib/style.css'
const color = useColorMode()
const theme = computed(() => {
	// 在服务端，值为system
	return color.value === 'dark' ? 'dark' : 'github'
})

const article = reactive({
	title: '',
	content: '',
	tags: [],
	coverImg: '',
	description: '',
})

/* 弹出框的功能 */
const openDialog = ref(false)
const tags = ref([])

const { data } = await getTagsFetch()
tags.value = data.value.data

// 上传图片
const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
	article.coverImg = response.data.avatar
	imageUrl.value = URL.createObjectURL(uploadFile.raw!)
	alert('图片上传成功')
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
		ElMessage.error('Avatar picture must be JPG or png format!')
		return false
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('Avatar picture size can not exceed 2MB!')
		return false
	}
	return true
}

// post文章内容
const cancel = () => {
	openDialog.value = false
}

const uploadBlog = async () => {
	const { data } = await uploadBlogFetch(article)
	if (data.value.code === 200) {
		alert('博客上传成功')
	} else {
		alert('博客上传失败')
	}
	openDialog.value = false
}

const saveMd = async (mdString, _) => {
	console.log(1)
	const title = mdString.match(/^#.*$/m)[0].slice(2)
	const content = mdString.replace(title, '').trim()
	const { data } = await uploadBlogFetch({
		title,
		content,
		coverImg: 'https://wx2.sinaimg.cn/orj360/007QvzfIly1hk8iue1yazj30pk0y51kx.jpg',
	})
	alert(data.value.msg)
}
</script>

<style scoped lang="less">
.dark-mode {
	.dialog {
		background-color: @dark-bg !important;
	}
}

.container {
	max-width: 100rem;
	margin: 0 auto;

	.info {
		display: flex;
		align-items: center;
		height: 5rem;
		margin-bottom: 2.5rem;
		.title {
			display: block;
			width: 50%;
			margin: 1.25rem auto;
			outline: none;
			border: none;
			font-size: 2rem;
			font-weight: 600;
			letter-spacing: 2px;
			line-height: 2rem;
			background: none;
			color: @light-title;

			&::placeholder {
				color: rgb(134, 144, 156);
			}
		}

		.button {
			display: flex;
			width: 5rem;
			height: 2.5rem;
			justify-content: center;
			align-items: center;
			margin: 0 0.5rem;

			background-color: #1d7dfa;
			color: aliceblue;
			font-size: 1.25rem;

			&:hover {
				cursor: pointer;
			}
		}
	}

	.md-editor {
		height: 80vh;
		border-radius: 0.5rem;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
	}

	.dialog {
		position: fixed;
		top: 10rem;
		left: 50%;
		right: 0rem;
		// bottom: 14rem;
		width: 30rem;
		z-index: 999;
		padding: 1rem 2rem;
		transform: translateX(-50%);
		background-color: #fff;
		border: 1px solid #020202;
		border-radius: 0.5rem;

		.dialog-title {
			font-size: 2rem;
			font-weight: 600;
			border-bottom: 1px solid #ccc;
			margin-bottom: 1rem;
		}
		.name {
			flex: none;
			width: 8rem;
			font-size: 1.25rem;
		}
		.dialog-tags {
			display: flex;
			justify-content: space-between;
			margin-bottom: 1.25rem;
			.tags {
				flex: 1;
			}
		}
		.cover {
			display: flex;
			justify-content: flex-start;
			.photo {
				.avatar-uploader .avatar {
					width: 178px;
					height: 178px;
					display: block;
				}
			}
		}

		.description {
			display: flex;
			margin-top: 1.25rem;
			.dialog-input {
				flex: 1;
				height: 10rem;
				max-height: 10rem;
				border: 1px solid #ccc;
				outline: none;
				font-size: 1rem;
				margin-bottom: 1rem;
			}
		}
		.dialog-button {
			display: flex;
			justify-content: flex-end;
			.button {
				height: 2.5rem;
				line-height: 2.5rem;
				padding: 0 1rem;
				margin-right: 1.25rem;
				background-color: #1d7dfa;
				color: #fff;
				border: none;
				border-radius: 0.5rem;
				font-size: 1.25rem;
				cursor: pointer;
			}
		}
	}
}
.dark-mode {
	.container .title {
		color: @dark-title;
		&::placeholder {
			color: #b7b7bc;
		}
	}
}
</style>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>
