<template>
<div class="basic-container" :class="{'is-dark':type === 'dark'}">
    <div>
        <div class="return-icon"><img :src="returnImg" /></div>
        <div class="message-content" v-if="chat.chat_basic.message">{{ chat.chat_basic.message }}</div>
    </div>
    <div class="chat-title">
        <div>{{ chat.chat_basic.type === 'group' ? chat.chat_basic.title : (chat.chat_user.filter((v)=>{ return !v.isMain })[0] !== undefined ? chat.chat_user.filter((v)=>{ return !v.isMain })[0].name : '') }}</div>
        <div v-if="chat.chat_basic.type === 'group'">({{ chat.chat_user.length }})</div>
    </div>
    <div class="chat-icon">
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
</template>

<script>
export default{
    props:{
        chat:Object,
        type:String
    },
    data(){
        return{
            returnImg:''
        }
    },
    watch:{
        type:{
            deep:true,
            immediate:true,
            handler:function(nv){
                if(this.type !== undefined) this.returnImg = require(`@/assets/images/return-` + nv + `.png`)
            }
        }
    }
}
</script>

<style scoped>
.basic-container{
    margin-top:-1px;
    height:90px;
    background-color:#eaeaea;
    color:#010103;
    border-bottom:1px solid #d3d3d3;
}
.basic-container.is-dark{
    background-color:#202020;
    color:#fff;
    border-color:#171717;
}

.basic-container>div,.basic-container>div>div{
    display:inline-block;
    vertical-align:middle;
}
.basic-container>div:first-child,.basic-container>div:last-child{
    width:calc(50% - 250px);
}
.basic-container>div:nth-child(2){
    width:500px;
    text-align:center;
}

.return-icon{
    width:18px;
    height:34px;
    margin:28px 10px 28px 34px;
}

.message-content{
    min-width:48px;
    padding:6px 3px;
    text-align:center;
    font-size:24px;
    background-color:#d7d6d4;
    border-radius:25px;
    color:#202020;
    margin:21px 0;
}
.is-dark .message-content{
    background-color:#2e2c2d;
    color:#fff;
}

.chat-title{
    height:90px;
    line-height:90px;
    font-size:32px;
}
.chat-title>div{
    display:inline-block;
    vertical-align:middle;
}
.chat-title>div:first-child{
    max-width:410px;
    margin-right:10px;
    text-align:right;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.chat-title>div:last-child{
    max-width:80px;
    min-width:50px;
}

.chat-icon{
    text-align:right;
}
.chat-icon>div{
    width:6px;
    height:6px;
    margin:0 3px;
    border-radius:50%;
    background-color:#010103;
}
.chat-icon>div:last-child{
    margin-right:34px;
}
.is-dark .chat-icon>div{
    background-color:#fff;
}
</style>