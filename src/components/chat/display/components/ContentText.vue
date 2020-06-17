<template>
<span 
    v-if="message.type === 'text'"
    class="message-text">
    <em @click="toEdit">{{ message.text ? message.text : '点击修改对话' }}</em>
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
            Chat:{}
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
//文字消息
.message-text{
    position:relative;
    cursor:pointer;
}
.message-text em{
    background-color:#fff;
}
.is-dark .message-text em{
    background-color:#2c2c2c;
    color:#fff;
}
.is-main .message-text em{
    background-color:#a9e979;
}
.is-dark .is-main .message-text em{
    background-color:$--color-primary;
    color:#2c2c2c;
}
.message-text em:after{
    content:'';
    position:absolute;
    border:10px solid;
    left:-20px;
    top:27.5px;
    border-color:transparent #ffffff transparent transparent;
}
.is-dark .message-text em:after{
    border-color:transparent #2c2c2c transparent transparent;
}
.is-main .message-text em:after{
    right:-20px;
    left:unset;
    border-color:transparent transparent transparent #a9e979;
}
.is-dark .is-main .message-text em:after{
    border-color:transparent transparent transparent $--color-primary;
}

.message-text em{
    position:relative;
    font-style:normal;
    display:inline-block;
    word-break:break-all;
    text-align:left;
    padding:18px 28px;
    border-radius:8px;
}
</style>