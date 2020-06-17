<template>
<span
    v-if="message.type === 'file'"
    class="message-file" @click="toEdit">
    <div>
        <div class="file-content">
            <div class="file-title">{{ message.file_name ? message.file_name : '点击编辑文件' }}</div>
            <div class="file-size">{{ message.file_size ? message.file_size : '点击编辑文件' }}</div>
        </div>
        <div class="file-icon">
            <img :src="fileImg" />
        </div>
    </div>
</span>
</template>

<script>
export default{
    props:{
        message:Object,
        chat:Object,
        index:Number
    },
    data(){
        return{
            Chat:{},
            fileImg:''
        }
    },
    methods:{
        toEdit(){
            this.$confirm('编辑/删除该条信息','提示',{
                distinguishCancelAndClose:true,
                confirmButtonText:'编辑',
                cancelButtonText:'删除'
            }).then(()=>{
                let _dialog = this.$root.$children[0]
                _dialog.messageVisible = true
                _dialog.message = this.message
            }).catch(action=>{
                if(action === 'cancel'){
                    this.Chat.chat_messages.splice(this.index,1)
                }
            })
        }
    },
    watch:{
        message:{
            deep:true,
            immediate:true,
            handler:function(){
                if(this.message.type === 'file'){
                    this.fileImg = require(`@/assets/images/file-` + this.message.file_type + `.png`)
                }

            }
        },
        chat:{
            deep:true,
            immediate:true,
            handler:function(nv){
                this.Chat = nv
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
.message-file>div{
    width:413px;
}
.is-main .message-file>div{
    margin-left:31px;
    text-align:left;
}
.message-file>div{
    padding:18px 28px;
    border-radius:8px;
    background-color:#ffffff;
    color:#202020;
}
.is-dark .message-file>div{
    background-color:#2c2c2c;
    color:#ffffff;
}
.file-size{
    color:#757575;
    font-size:24px;
}
.is-dark .file-size{
    color:#606060;
}
.message-file>div>div{
    display:inline-block;
    vertical-align:middle;
}
.message-file>div>div:last-child{
    width:90px;
}
.message-file>div>div:first-child{
    width:calc(100% - 90px);
}

.file-title{
    word-break:break-all;
    font-size:32px;
    line-height:40px;
    max-height:80px;
    overflow:hidden;
}
</style>