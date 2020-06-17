<template>
<div style="padding:10px 0 30px">
    <el-form label-width="80px">
        <el-form-item label="风格">
            <el-radio-group v-model="header.style">
                <el-radio label="dark">黑色</el-radio>
                <el-radio label="light">浅色</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="信号强度">
            <el-select v-model="header.signal">
                <el-option label="1格" :value="1"></el-option>
                <el-option label="2格" :value="2"></el-option>
                <el-option label="3格" :value="3"></el-option>
                <el-option label="4格" :value="4"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="运营商">
            <el-input v-model="header.company" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="信号类型">
            <el-select v-model="header.signal_type">
                <el-option label="wifi" value="wifi"></el-option>
                <el-option label="E" value="E"></el-option>
                <el-option label="3G" value="3G"></el-option>
                <el-option label="4G" value="4G"></el-option>
                <el-option label="5G" value="5G"></el-option>
                <el-option label="自定义" value="other"></el-option>
            </el-select>
            <el-input style="margin-top:10px;width:200px;display:block;" v-if="header.signal_type === 'other'" v-model="header.signal_set"></el-input>
        </el-form-item>
        <el-form-item label="Wifi强度" v-if="header.signal_type === 'wifi'">
            <el-select v-model="header.wifi_strength">
                <el-option label="1格" :value="1"></el-option>
                <el-option label="2格" :value="2"></el-option>
                <el-option label="3格" :value="3"></el-option>
            </el-select>
        </el-form-item>
        <div class="form-split-title">显示时间</div>
        <el-form-item label="显示方式">
            <el-select v-model="header.time_type" @change="changeTime">
                <el-option label="24小时制" value="HH"></el-option>
                <el-option label="12小时制" value="hh"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="时间">
            <el-time-picker v-model="header.time" :value-format="header.time_type + ':mm' + (header.time_type === 'hh' ? ' ' + 'A' : '')"></el-time-picker>
        </el-form-item>
        <el-form-item label="屏幕锁定">
            <el-radio-group v-model="header.lock">
                <el-radio :label="true">显示</el-radio>
                <el-radio :label="false">不显示</el-radio>
            </el-radio-group>
        </el-form-item>
        <div class="form-split-title">电池</div>
        <el-form-item label="电池电量">
            <el-slider v-model="header.battery" :min="1"></el-slider>
        </el-form-item>
        <el-form-item label="显示文字">
            <el-radio-group v-model="header.battery_show">
                <el-radio :label="true">显示</el-radio>
                <el-radio :label="false">不显示</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="电池状态">
            <el-radio-group v-model="header.battery_status">
                <el-radio label="normal">正常</el-radio>
                <el-radio label="charging">充电中</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default{
    props:{
        header:Object
    },
    methods:{
        changeTime(){
            if(this.header.time_type === 'HH'){
                this.header.time = '00:00'
            }else{
                this.header.time = '00:00 AM'
            }
        }
    }
}
</script>

<style>
.form-split-title{
    font-size:14px;
    margin:10px;
    font-weight:500;
}
</style>