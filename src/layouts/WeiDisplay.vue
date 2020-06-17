<template>
<div style="position:relative">
    <div class="mobile-container" id="shareBox">
        <div class="mobile-content" v-if="current === 'chat'">
            <display-header :header="header"></display-header>
            <display-chat-basic :chat="chat" :type="header.style"></display-chat-basic>
            <display-chat-content :chat="chat" :type="header.style"></display-chat-content>
            <display-chat-footer :chat="chat" :type="header.style"></display-chat-footer>
        </div>
        <div class="mobile-content" v-else></div>
    </div>
</div>
</template>

<script>
import eventBus from '@/utils/eventBus'

import DisplayHeader from '@/components/header/display/DisplayHeader'
import DisplayChatBasic from '@/components/chat/display/DisplayChatBasic'
import DisplayChatContent from '@/components/chat/display/DisplayChatContent'
import DisplayChatFooter from '@/components/chat/display/DisplayChatFooter'
export default{
    components:{
        DisplayHeader,
        DisplayChatBasic,
        DisplayChatContent,
        DisplayChatFooter,
    },
    data(){
        return{
            current:'',
            header:{},
            chat:{
                chat_basic:{},
                chat_user:[],
                chat_messages:[]
            }
        }
    },
    mounted(){
        eventBus.$on('header-change', args => {
            this.header = args
        })
        eventBus.$on('chat-change', args => {
            this.chat = args
        })
        eventBus.$on('current-change', args => {
            this.current = args
        })
    },
    beforeDestroy(){
        eventBus.$off('current-change')
        eventBus.$off('chat-change')
        eventBus.$off('header-change')
    }
}
</script>

<style scoped>
.mobile-container{
    transform-origin: top left;
    -webkit-transform-origin: top left;
    transform: scale(0.4572);
    -webkit-transform: scale(0.4572);
    position:absolute;
    left:0;
    top:0;
}
.mobile-content{
    width:750px;
    height:1334px;
    border:2px solid #eee;
    margin: 0 auto;
}
</style>