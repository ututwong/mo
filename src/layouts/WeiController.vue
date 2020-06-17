<template>
<div>
    <el-tabs type="border-card" class="controller-container" v-if="current === 'chat'">
        <el-tab-pane label="手机外观">
            <control-header :header="header"></control-header>
        </el-tab-pane>
        <el-tab-pane label="内容设置">
            <control-chat-basic :basic="chat.chat_basic"></control-chat-basic>
            <control-chat-user 
                :user.sync="chat.chat_user" 
                :messages.sync="chat.chat_messages"
                :type="chat.chat_basic.type">
            </control-chat-user>
        </el-tab-pane>
    </el-tabs>
    <el-tabs type="border-card" class="controller-container" v-else>
        <div>正在开发中...</div>
    </el-tabs>
</div>
</template>

<script>
import eventBus from '@/utils/eventBus'

import ControlHeader from '@/components/header/controller/ControlHeader'
import ControlChatBasic from '@/components/chat/controller/ControlChatBasic'
import ControlChatUser from '@/components/chat/controller/ControlChatUser'
export default{
    components:{
        ControlHeader,
        ControlChatBasic,
        ControlChatUser,
    },
    data(){
        return{
            current:'',
            header:{
                style:'dark',
                signal:3,
                company:'中国移动',
                signal_type:'wifi',
                wifi_strength:3,
                time_type:'HH',
                time:'00:00',
                lock:true,
                battery_show:true,
                battery_status:'charging'
            },
            chat:{
                chat_basic:{
                    type:'mono',
                    title:'测试',
                    hear_show:false,
                    message:2,
                    user_show:false,
                    footer:'text'
                },
                chat_user:[
                    {
                        id:1,
                        name:'',
                        avatar:'',
                        isMain:true,
                    },
                    {
                        id:2,
                        name:'',
                        avatar:'',
                        isMain:false
                    }
                ],
                chat_messages:[]
            }
        }
    },
    mounted(){
        eventBus.$on('current-change', args => {
            this.current = args
        })
    },
    watch: {
        header: {
            deep:true,
            immediate:true,
            handler:function(){
                eventBus.$emit('header-change', this.header)
                eventBus.$emit('chat-change', this.chat)
            }
        },
        chat: {
            deep:true,
            immediate:true,
            handler:function(){
                eventBus.$emit('chat-change', this.chat)
            }
        }
    },
    beforeDestroy(){
        eventBus.$off('current-change')
    }
}
</script>

<style scoped>
.controller-container{
    margin: 0 10px;
    height:610px;
    overflow:hidden;
}
</style>
<style>
.el-tabs__content{
    overflow:scroll!important;
    height:calc(100% - 40px);
}
</style>