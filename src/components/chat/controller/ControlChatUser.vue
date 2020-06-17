<template>
<div style="padding:5px 0 30px">
    <el-form label-width="100px">
        <div class="form-split-tip">请按照预想对话顺序添加对话零件和用户对话/转账，添加后请点击右侧预览图中的部件进行修改。</div>
        <div class="form-split-title">对话零件</div>
        <el-form-item label="时间">
            <el-button type="primary" size="small" @click="addTime">添加时间</el-button>
        </el-form-item>
        <el-form-item label="红包领取">
            <el-button type="primary" size="small" @click="addReceive">添加领取</el-button>
        </el-form-item>
        <el-form-item label="群成员邀请" v-if="type === 'group'">
            <el-button type="primary" size="small" @click="addInvite">添加邀请</el-button>
        </el-form-item>
        <div class="form-split-title">对话用户</div>
        <div v-for="(item,index) in User" :key="index">
            <div class="form-split-title">用户 {{ index + 1 }}<span class="main-user-tag" v-if="item.isMain">主用户</span></div>
            <el-form-item label="用户头像">
                <image-upload
                    :url.sync="item.avatar"
                    :height="85"
                    :width="85">
                </image-upload>
            </el-form-item>
            <el-form-item label="用户昵称">
                <el-input v-model="item.name"></el-input>
            </el-form-item>
            <el-form-item label="操作">
                <div>
                    <el-button v-if="type === 'group'" type="danger" size="small" :disabled="user.length <= 2" @click="deleteUser(index)">删除用户</el-button> 
                    <el-button type="primary" size="small" :disabled="item.isMain" @click="setMain(item)">设为主用户</el-button> 
                </div>
                <div>
                    <el-button type="primary" size="small" @click="addText(item)">添加对话</el-button> 
                    <el-button type="primary" size="small" :disabled="type === 'group'" @click="addTransfer(index)">添加转账</el-button> 
                    <el-button type="primary" size="small" @click="addPocket(item)">添加红包</el-button> 
                </div>
                <div>
                    <el-button type="primary" size="small" @click="addFile(item)">添加文件</el-button> 
                    <el-button type="primary" size="small" @click="addMp">添加小程序</el-button> 
                    <el-button type="primary" size="small" @click="addShare">添加分享链接</el-button> 
                </div>
            </el-form-item>
        </div>
        <div v-if="type === 'group'">
            <el-button type="primary" size="small" @click="addUser">添加用户</el-button>
        </div>
    </el-form>
</div>
</template>

<script>
import ImageUpload from '@/components/common/ImageUpload'
export default{
    components:{
        ImageUpload
    },
    props:{
        type:String,
        user:Array,
        messages:Array
    },
    data(){
        return{
            User:[],
            Messages:[]
        }
    },
    methods:{
        deleteUser(index){
            this.User.splice(index,1)
            this.$emit('update:user',this.User)
        },
        setMain(item){
            this.User.map(v=>{
                v.isMain = false
            })
            item.isMain = true
            this.$emit('update:user',this.User)
        },
        addUser(){
            this.User.push({
                id:this.User.length + 1,
                name:'',
                avatar:'',
                isMain:false
            })
            this.$emit('update:user',this.User)
        },
        addTime(){
            let _data = {
                type:'time',
                date:'',
                time:''
            }
            this.Messages.push(_data)
            this.$emit('update:messages',this.Messages)
        },
        addReceive(){
            let _data = {
                type:'receive',
                user_name:'',
                receive_type:'output' // output,input
            }
            this.Messages.push(_data)
            this.$emit('update:messages',this.Messages)
        },
        addInvite(){
            let _data = {
                type:'invite',
                user_name:'',
                invited:''
            }
            this.Messages.push(_data)
            this.$emit('update:messages',this.Messages)
        },
        addText(item){
            let _data = {
                type:'text',
                user_id:item.id,
                text:''
            }
            this.Messages.push(_data)
            this.$emit('update:messages',this.Messages)
        },
        addTransfer(index){
            let _data = {
                type:'transfer',
                user_id:this.User[index].id,
                amount:0,
                text:'',
                status:'pending', //pending, received, refunded
                trans_type:'output', //output, input
                receiver:index ? this.User[0].name : this.User[1].name
            }
            this.Messages.push(_data)
            this.$emit('update:messages',this.Messages)
        },
        addPocket(item){
            let _data = {
                type:'pocket',
                user_id:item.id,
                text:'',
                status:'pending', //pending, received
                trans_type:'output', //output, input
            }
            this.Messages.push(_data)
            this.$emit('update:messages',this.Messages)
        },
        addFile(item){
            let _data = {
                type:'file',
                user_id:item.id,
                file_type:'pdf', // pdf, excel, word
                file_name:'',
                file_size:''
            }
            this.Messages.push(_data)
            this.$emit('update:messages',this.Messages)
        },
        addMp(){
            this.$message.warning('即将完成')
            // let _data = {
            //     type:'mp',
            //     user_id:item.id,
            //     mp_title:'',
            //     mp_img:'',
            //     mp_logo:'',
            //     mp_company:''
            // }
            // this.Messages.push(_data)
            // this.$emit('update:messages',this.Messages)
        },
        addShare(){
            this.$message.warning('即将完成')
            // let _data = {
            //     type:'share',
            //     user_id:item.id,
            //     share_title:'',
            //     share_desc:'',
            //     share_logo:'',
            //     share_img:'',
            //     share_company:''
            // }
            // this.Messages.push(_data)
            // this.$emit('update:messages',this.Messages)
        }
    },
    watch:{
        user:{
            deep:true,
            immediate:true,
            handler:function(){
                this.User = this.user
            }
        },
        messages:{
            deep:true,
            immediate:true,
            handler:function(){
                this.Messages = this.messages
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variable.scss';
.main-user-tag{
    color:$--color-warning;
    margin-left:10px;
    font-weight:500;
}
.form-split-tip{
    color:$--color-danger;
    margin:10px 0 20px;
    padding-top:10px;
    font-weight:500px;
    border-top:1px solid #eee;
}
</style>