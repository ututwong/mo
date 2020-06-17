<template>
<span
    v-if="message.type === 'transfer'"
    class="message-transfer"
    :class="{'is-pend':message.status === 'pending'}" @click="toEdit">
    <div>
        <div class="transfer-icon">
            <img :src="message.transImg" />
        </div>
        <div class="transfer-content">
            <div><strong>¥ {{ message.amount }}</strong></div>
            <div v-if="message.status === 'pending'">{{ message.text ? message.text : ('转账给' + (message.receiver ? message.receiver : receiver_new)) }}</div>
            <div v-if="message.status === 'received'">已被领取{{ message.text ? '-' + message.text : '' }}</div>
            <div v-if="message.status === 'refunded'">已退还</div>
        </div>
    </div>
    <div class="transfer-footer">微信转账</div>
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
            receiver_new:''
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
                if(this.message.type === 'transfer') this.message['transImg'] = require(`@/assets/images/transfer-` + this.message.status + `.png`)
            }
        },
        chat:{
            deep:true,
            immediate:true,
            handler:function(nv){
                this.Chat = nv
                if(nv.chat_user !== undefined && nv.chat_user.length === 2){
                    this.receiver_new = nv.chat_user.filter((v)=>{ return !v.isMain })[0].name
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
//转账消息
.message-transfer{
    cursor:pointer;
}
.message-transfer>div{
    width:413px;
}
.is-main .message-transfer>div{
    margin-left:31px;
    text-align:left;
}
.message-transfer>div:first-child{
    padding:18px 28px;
    border-radius:8px 8px 0 0;
}
.message-transfer>div:first-child{
    background-color:#f7e2c5;
}
.is-dark .message-transfer>div:first-child{
    background-color:#a57137;
}
.message-transfer.is-pend>div:first-child{
    background-color:#eca052;
    color:#fff;
}
.is-dark .message-transfer.is-pend>div:first-child{
    background-color:#d59148;
    color:#fff;
}
.message-transfer .transfer-footer{
    font-size:24px;
    padding:15px 28px;
    border-radius:0 0 8px 8px;
    color:#838383;
    background-color:#fff;
}
.is-dark .message-transfer .transfer-footer:before{
    position:absolute;
    content:'';
    bottom:65px;
    width:413px;
    border:1px solid #d7ae82;
}
.is-dark .message-transfer .transfer-footer{
    background-color:#a57137;
    color:#d7ae82;
}
.is-dark .message-transfer.is-pend .transfer-footer{
    background-color:#d59148;
}
.message-transfer>div:first-child>div{
    display:inline-block;
    vertical-align:middle;
}
.transfer-icon{
    width:80px;
    height:80px;
    margin-right:20px;
}
.transfer-icon img{
    width:100%;
    height:100%;
    object-fit:scale-down;
}
.transfer-content{
    width:calc(100% - 100px);
}
.transfer-content>div{
    font-size:24px;
    color:#fff;
    overflow:hidden;
}
.is-dark .transfer-content>div{
    color:#ffeabe;
}
.transfer-content>div:first-child{
    font-size:32px;
    color:#fff;
}
.message-transfer:after{
    content:'';
    position:absolute;
    border:10px solid;
    left:-19.5px;
    top:27.5px;
    border-color:transparent #f7e2c5 transparent transparent;
}
.is-dark .message-transfer:after{
    border-color:transparent #a57137 transparent transparent;
}
.is-main .message-transfer:after{
    right:-20px;
    left:unset;
    border-color:transparent transparent transparent #f7e2c5;
}
.is-dark .is-main .message-transfer:after{
    border-color:transparent transparent transparent #a57137;
}
.message-transfer.is-pend:after{
    border-color:transparent #eca052 transparent transparent;
}
.is-dark .message-transfer.is-pend:after{
    border-color:transparent #d59148 transparent transparent;
}
.is-main .message-transfer.is-pend:after{
    border-color:transparent transparent transparent #eca052;
}
.is-dark .is-main .message-transfer.is-pend:after{
    border-color:transparent transparent transparent #d59148;
}
</style>