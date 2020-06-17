/*

HTML转换为图片
Author: Chengxxxxxq

*/

import html2canvas from 'html2canvas'

//添加图片标签
function createImage(url,image,that){
	const parents = that.$refs[image]
	const createImg = document.createElement('img')
	createImg.style.width = '100%'
	createImg.style.height = '100%'

	parents.insertBefore(createImg,parents.childNodes[0])

	createImg.setAttribute('src',url)
}


export function to_canvas({
	box,
	image,
	that,
	link = '',
	title = '',
	show = []
} = {}){
	const canvas = document.createElement('canvas')

	let canvasBox = document.getElementById(box)

	const width = parseInt(window.getComputedStyle(canvasBox).width)
	const height = parseInt(window.getComputedStyle(canvasBox).height)

	canvas.width = width
	canvas.height = height
	canvas.style.width = width + 'px'
	canvas.style.height = height + 'px'

	const context = canvas.getContext('2d')
	context.scale(1,1)

	const options = {
		backgroundColor:null,
		canvas:canvas,
		userCORS:true
	}

	return new Promise((resolve)=>{
		html2canvas(canvasBox,options).then((canvas)=>{
			resolve()
			//生成图片链接
			let dataURL = canvas.toDataURL('image/png')
			createImage(dataURL,image,that)

			//创建下载按钮
			if(link){
				const linkBar = document.getElementById(link)
				const linkHTML = document.createElement('a')
				linkBar.insertBefore(linkHTML,linkBar.childNodes[0])
				linkHTML.href = dataURL
				linkHTML.innerHTML = "<div style='font-size:24px;margin-top:5px'>点击下载</div>"
				linkHTML.download = title ? title : '图片下载'
				linkHTML.style.color = '#07c160'
				linkHTML.style.fontWeight = '500'
				linkHTML.style.textDecoration = 'none'
			}

			if(show.length !== 0){
				show.map(v=>{
					that.$refs[v].style.display = 'block'
				})
			}
		})
	})
}