<template>
<div style="padding:0 0 5px">
    <el-form label-width="100px">
        <div class="form-split-title">基础设置</div>
        <el-form-item label="聊天模式">
            <el-radio-group v-model="basic.type">
                <el-radio label="mono">单聊</el-radio>
                <el-radio label="group">群聊</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="聊天标题" v-if="basic.type === 'group'">
            <el-input style="width:200px" v-model="basic.title"></el-input>
        </el-form-item>
        <el-form-item label="显示听筒">
            <el-radio-group v-model="basic.hear_show">
                <el-radio :label="true">显示</el-radio>
                <el-radio :label="false">不显示</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="消息数量">
            <el-input-number v-model="basic.message" :min="0" :max="99" :step="1" :precision="0"></el-input-number>
        </el-form-item>
        <el-form-item label="显示用户昵称">
            <el-radio-group v-model="basic.user_show">
                <el-radio :label="true">显示</el-radio>
                <el-radio :label="false">不显示</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="底部输入框">
            <el-radio-group v-model="basic.footer">
                <el-radio label="text">文本输入</el-radio>
                <el-radio label="audio">语音输入</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default{
    props:{
        basic:Object
    }
}
</script>