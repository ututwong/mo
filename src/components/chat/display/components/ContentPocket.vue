<template>
<span
    v-if="message.type === 'pocket'"
    class="message-pocket"
    :class="{'is-pend':message.status === 'pending'}" @click="toEdit">
    <div>
        <div class="pocket-icon">
            <img :src="pocketImg" />
        </div>
        <div class="pocket-content">
            <div class="pocket-title">{{ message.text ? message.text : '恭喜发财，大吉大利' }}</div>
            <div>{{ message.status === 'pending' ? '' : '已领取' }}</div>
        </div>
    </div>
    <div class="pocket-footer">微信红包</div>
</span>
</template>

<script>
export default{
    props:{
        type:String,
        message:Object,
        chat:Object,
        index:Number
    },
    data(){
        return{
            Chat:{},
            pocketType:'',
            pocketStyle:''
        }
    },
    computed:{
        pocketImg(){
            if(!this.pocketType || !this.pocketStyle) return ''
                else return require(`@/assets/images/pocket-` + this.pocketType + `-` + this.pocketStyle + `.png`)
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
        type:{
            deep:true,
            immediate:true,
            handler:function(nv){
                if(this.type !== undefined){
                    this.pocketType = nv
                }
            }
        },
        message:{
            deep:true,
            immediate:true,
            handler:function(nv){
                if(this.message.status !== undefined){
                    this.pocketStyle = nv.status
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
//红包消息
.message-pocket{
    cursor:pointer;
}
.message-pocket>div{
    width:413px;
    background-color:#f7e2c5;
}
.is-dark .message-pocket>div{
    background-color:#a57137;
}
.message-pocket.is-pend>div{
    background-color:#eca052;
}
.is-dark .message-pocket.is-pend>div{
    background-color:#d59148;
}
.is-main .message-pocket>div{
    margin-left:31px;
    text-align:left;
}
.message-pocket>div:first-child{
    padding:18px 28px;
    border-radius:8px 8px 0 0;
}
.message-pocket>div:first-child>div{
    display:inline-block;
    vertical-align:middle;
}
.message-pocket .pocket-footer{
    font-size:24px;
    padding:15px 28px;
    border-radius:0 0 8px 8px;
    color:#fff;
    margin-top:-1px;
}
.is-dark .message-pocket .pocket-footer{
    color:#ffeabd;
}
.pocket-icon{
    width:80px;
    height:80px;
    margin-right:20px;
}
.pocket-icon img{
    width:100%;
    height:100%;
    object-fit:scale-down;
}
.pocket-content{
    width:calc(100% - 100px);
}
.pocket-content>div{
    font-size:24px;
    color:#fff;
}
.is-dark .pocker-content>div{
    color:#ffeabe;
}
.pocket-content>div:first-child{
    font-size:32px;
    color:#fff;
}
.message-pocket:after{
    content:'';
    position:absolute;
    border:10px solid;
    left:-19.5px;
    top:27.5px;
    border-color:transparent #f7e2c5 transparent transparent;
}
.is-dark .message-pocket:after{
    border-color:transparent #a57137 transparent transparent;
}
.is-main .message-pocket:after{
    right:-20px;
    left:unset;
    border-color:transparent transparent transparent #f7e2c5;
}
.is-dark .is-main .message-pocket:after{
    border-color:transparent transparent transparent #a57137;
}
.message-pocket.is-pend:after{
    border-color:transparent #eca052 transparent transparent;
}
.is-dark .message-pocket.is-pend:after{
    border-color:transparent #d59148 transparent transparent;
}
.is-main .message-pocket.is-pend:after{
    border-color:transparent transparent transparent #eca052;
}
.is-dark .is-main .message-pocket.is-pend:after{
    border-color:transparent transparent transparent #d59148;
}

.pocket-title{
    overflow:hidden;
}
</style>