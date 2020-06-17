<template>
<div class="content-container" :class="{'is-dark':type === 'dark'}">
    <div>
        <div v-for="(message,index) in chat.chat_messages" :key="index">
            <div v-if="message.type === 'time'" class="message-time" @click="toEdit('time',message,index)">{{ message.time ? (message.date ? message.date + ' ' + message.time : message.time) : '点击修改时间' }}</div>
            <div v-else-if="message.type === 'receive'" class="message-time" @click="toEdit('receive',message,index)">
                <div v-if="message.receive_type === 'output'">{{ message.user_name ? message.user_name + ' 领取了你的红包' : '点击修改红包领取' }}</div>
                <div v-if="message.receive_type === 'input'">{{ message.user_name ? '你领取了 ' + message.user_name + ' 的红包' : '点击修改红包领取' }}</div>
            </div>
            <div v-else-if="message.type === 'invite'" class="message-time" @click="toEdit('invite',message,index)">{{ message.user_name && message.invited ? message.user_name + ' 邀请 ' + message.invited + ' 入群' : '点击修改邀请入群' }}</div>
            <div v-else class="message-whole" :class="{'is-main':chat.chat_user.filter((v)=>{return v.id === message.user_id})[0].isMain}">
                <div class="message-content">
                    <content-text :message="message" :chat="chat" :index="index"></content-text>
                    <content-transfer :message="message" :chat="chat" :index="index"></content-transfer>
                    <content-pocket :message="message" :type="type" :chat="chat" :index="index"></content-pocket>
                    <content-file :message="message" :chat="chat" :index="index"></content-file>
                </div>
                <div class="message-avatar">
                    <div><img :src="chat.chat_user.filter((v)=>{return v.id === message.user_id})[0].avatar" /></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ContentText from './components/ContentText'
import ContentTransfer from './components/ContentTransfer'
import ContentPocket from './components/ContentPocket'
import ContentFile from './components/ContentFile'
export default{
    components:{
        ContentText,
        ContentTransfer,
        ContentPocket,
        ContentFile
    },
    props:{
        type:String,
        chat:Object
    },
    data(){
        return{
            Chat:{}
        }
    },
    computed:{
        users(){
            return this.Chat.chat_user
        }
    },
    methods:{
        toEdit(type,message,index){
            this.$confirm('编辑/删除该条信息','提示',{
                distinguishCancelAndClose:true,
                confirmButtonText:'编辑',
                cancelButtonText:'删除'
            }).then(()=>{
                if(type !== 'time'){
                    let _users = this.users.filter((v)=>{ return !v.isMain })
                    if(_users.filter((v)=>{ return v.name }).length !== _users.length){
                        this.$message.warning('请先设置用户昵称')
                        return
                    }
                    let _dialog = this.$root.$children[0]
                    _dialog.messageVisible = true
                    _dialog.message = message
                    _dialog.users = _users
                }else{
                    let _dialog = this.$root.$children[0]
                    _dialog.messageVisible = true
                    _dialog.message = message
                }
            }).catch(action=>{
                if(action === 'cancel'){
                    this.Chat.chat_messages.splice(index,1)
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
.content-container{
    height:1092px;
    background-color:#eaeaea;
    font-size:32px;
}
.content-container.is-dark{
    background-color:#202020;
}
.content-container>div{
    height:100%;
    overflow-y:scroll;
}
.content-container>div>div{
    margin:34px 0;
}

.message-time{
    color:#9e9e9e;
    font-size:24px;
    text-align:center;
    cursor:pointer;
}
.is-dark .message-time{
    color:#606060;
}


//每条消息块
.message-whole{
    position:relative;
    width:750px;
    min-height:85px;
}
.message-content{
    position:relative;
    padding:0;
    min-height:85px;
    max-width:500px;
    text-align:left;
    margin:0 auto 0 133px;
}
.is-main .message-content{
    text-align:right;
    margin:0 133px 0 auto;
}


//消息头像
.message-avatar{
    position:absolute;
    width:133px;
    left:0;
    top:0;
}
.is-main .message-avatar{
    right:0;
    left:unset;
}
.message-avatar>div{
    width:85px;
    height:85px;
    border-radius:8px;
    background-color:#eee;
    margin:0 auto;
}
.message-avatar img{
    width:100%;
    height:100%;
    object-fit:fill;
    border-radius:8px;
}
</style>