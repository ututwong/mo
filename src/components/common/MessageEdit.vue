<template>
<el-dialog :visible="visible" title="修改对话" :before-close="close">
    <el-form label-width="85px">
        <div v-if="Message.type === 'time'">
            <el-form-item label="日期类型">
                <el-radio-group v-model="date_type">
                    <el-radio label="yyyy年MM月dd日">年月日</el-radio>
                    <el-radio label="MM月dd日">月日</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker v-model="Message.date" :format="date_type" :value-format="date_type"></el-date-picker>
            </el-form-item>
            <el-form-item label="时间">
                <el-input v-model="Message.time"></el-input>
            </el-form-item>
        </div>
        <div v-if="Message.type === 'receive'">
            <el-form-item label="红包类型">
                <el-radio-group v-model="Message.receive_type">
                    <el-radio label="output">主用户发出红包</el-radio>
                    <el-radio label="input">主用户接收红包</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="红包接收人" v-if="Message.receive_type === 'output'">
                <el-radio-group v-model="Message.user_name">
                    <el-radio v-for="(item,index) in users" :key="index" :label="item.name"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="红包发出人" v-if="Message.receive_type === 'input'">
                <el-radio-group v-model="Message.user_name">
                    <el-radio v-for="(item,index) in users" :key="index" :label="item.name"></el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
        <div v-if="Message.type === 'invite'">
            <el-form-item label="邀请人">
                <el-radio-group v-model="Message.user_name">
                    <el-radio v-for="(item,index) in users" :key="index" :label="item.name"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="被邀请人">
                <el-input v-model="Message.invited"></el-input>
            </el-form-item>
        </div>
        <div v-if="Message.type === 'text'">
            <el-form-item label="对话内容">
                <el-input v-model="Message.text"></el-input>
            </el-form-item>
        </div>
        <div v-if="Message.type === 'transfer'">
            <el-form-item label="转账金额">
                <el-input-number v-model="Message.amount" :min="0.01" :step="0.01" :precesion="0"></el-input-number>
            </el-form-item>
            <el-form-item label="转账说明">
                <el-input v-model="Message.text"></el-input>
            </el-form-item>
            <el-form-item label="转账状态">
                <el-radio-group v-model="Message.status">
                    <el-radio label="pending">未领取</el-radio>
                    <el-radio label="received">已领取</el-radio>
                    <el-radio label="refunded">已退还</el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
        <div v-if="Message.type === 'pocket'">
            <el-form-item label="红包文字">
                <el-input v-model="Message.text"></el-input>
            </el-form-item>
            <el-form-item label="红包状态">
                <el-radio-group v-model="Message.status">
                    <el-radio label="pending">未领取</el-radio>
                    <el-radio label="received">已领取</el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
        <div v-if="Message.type === 'file'">
            <el-form-item label="文件名称">
                <el-input v-model="Message.file_name"></el-input>
            </el-form-item>
            <el-form-item label="文件大小">
                <el-input v-model="Message.file_size"></el-input>
            </el-form-item>
            <el-form-item label="文件类型">
                <el-radio-group v-model="Message.file_type">
                    <el-radio label="pdf">PDF文件</el-radio>
                    <el-radio label="excel">Excel文件</el-radio>
                    <el-radio label="word">Word文件</el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
    </el-form>
    <div slot="footer">
        <el-button size="small" @click="close">取消</el-button>
        <el-button size="small" type="primary" @click="confirmEdit">确定</el-button>
    </div>
</el-dialog>
</template>

<script>
export default{
    props:{
        visible:Boolean,
        message:Object,
        users:Array
    },
    data(){
        return{
            Message:{},
            date_type:'yyyy年MM月dd日'
        }
    },
    methods:{
        close(){
            this.$emit('update:visible',false)
        },
        confirmEdit(){
            this.$emit('update:message',this.Message)
            this.$emit('update:visible',false)
        }
    },
    watch:{
        message:{
            deep:true,
            immediate:true,
            handler:function(){
                this.Message = this.message
            }
        }
    }
}
</script>