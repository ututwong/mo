<template>
<div class="page-header">
    <div class="page-logo">微信模拟器</div>
    <div>
        <ul>
            <li :class="{'is-active':current === 'chat'}" @click="current = 'chat'">微信聊天</li>
            <li :class="{'is-active':current === 'pyq'}" @click="current = 'pyq'">微信朋友圈</li>
        </ul>
    </div>
    <div class="header-button"><el-button size="medium" type="primary" :loading="btnLoading" @click="convert2Image" :disabled="current === 'pyq'">生成图片</el-button></div>
    <el-dialog :visible="shareShow" title="生成图片" width="600px" @close="closeShare">
        <div style="position:relative;height:1000px">
            <div class="share-image-loading" v-if="loading">
                <i class="el-icon-loading"></i>正在生成分享图片
            </div>
            <div class="share-image-block" ref="shareimg">
                <div ref="shareImage" class="share-img"></div>
            </div>
            <div class="share-image-btn" ref="sharebtn">
                <div id="shareLink"></div>
            </div>
        </div>
    </el-dialog>
</div>
</template>

<script>
import eventBus from '@/utils/eventBus'
import { to_canvas } from '@/utils/html2canvas'
export default{
    data(){
        return{
            current:'',
            shareShow:false,
            btnLoading:false,
            loading:false
        }
    },
    created(){
        this.current = 'chat'
    },
    methods:{
        convert2Image(){
            this.btnLoading = true
            this.loading = true
            this.shareShow = true
            setTimeout(()=>{
                to_canvas({
                    box:'shareBox',
                    image:'shareImage',
                    that:this,
                    link:'shareLink',
                    title:'微信聊天',
                    show:['shareimg','sharebtn']
                }).then(()=>{
                    this.btnLoading = false
                    this.loading = false
                })
            },50)
        },
        closeShare(){
            if(this.loading) return
            let _image = this.$refs.shareImage
            while(_image.hasChildNodes()){
                _image.removeChild(_image.firstChild)
            }
            let _sharebtn = this.$refs.sharebtn
            let _shareimg = this.$refs.shareimg
            _shareimg.style.display = 'none'
            _sharebtn.style.display = 'none'

            let _link = document.getElementById('shareLink')
            while(_link.hasChildNodes()){
                _link.removeChild(_link.firstChild)
            }
            this.shareShow = false
        }
    },
    watch: {
        current:{
            deep:true,
            immediate:true,
            handler:function(){
                eventBus.$emit('current-change', this.current)
            }
        }
    },
    beforeDestroy(){
        eventBus.$emit('current-change',this.current)
    }
}
</script>

<style lang="scss" scoped>
.page-header{
    height:60px;
    line-height:60px;
}
.page-header>div{
    display:inline-block;
    vertical-align:middle;
}
.page-header>div:first-child,.page-header>div .header-button{
    width:150px;
    text-align:center;
}
.page-header>div:nth-child(2){
    width:calc(100% - 300px);
    text-align:right;
}
.page-header ul{
    margin:0;
    padding:0;
    list-style:none;
}
.page-header ul li{
    display:inline-block;
    padding:0 20px;
    cursor:pointer;
}
.page-header ul li:hover{
    font-weight:500;
}

.page-logo{
    font-size:18px;
    font-weight:500;
}

.share-image-loading{
    text-align:center;
    font-size:20px;
}
.share-image-block{
    position:absolute;
    top:0;
    border-radius:0;
    width:100%;
    left:25px;
    text-align:center;
}
.share-image-btn{
    position:absolute;
    bottom:0;
    width:100%;
    text-align:center;
}
</style>