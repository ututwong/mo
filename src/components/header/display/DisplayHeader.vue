<template>
<div class="display-header" :class="{'is-dark':header.style === 'dark'}">
    <div>
        <div class="header-signal">
            <div 
                v-for="(item,index) in signal" :key="index"
                :style="{height:8 + index * 4 + 'px',backgroundColor:header.style === 'dark' ? (index < header.signal ? '#fff' : '#4c4b49') : (index < header.signal ? '#080705' : '#c1c0be')}">
            </div>
        </div>
        <div class="header-company">{{ header.company }}</div>
        <div class="header-signal-type">
            <span v-if="header.signal_type === 'wifi'" style="position:relative">
                <div 
                    class="header-wifi-strength"
                    v-for="(item,index) in wifi" :key="index"
                    :style="{borderTopColor:header.style === 'dark' ? (index < header.wifi_strength ? '#fff' : '#4c4b49') : (index < header.wifi_strength ? '#080705' : '#c1c0be')}">
                </div>
            </span>
            <span v-else-if="header.signal_type === 'other'">{{ header.signal_set }}</span>
            <span v-else>{{ header.signal_type }}</span>
        </div>
    </div>
    <div class="header-time">
        <span style="margin-right:6px;">{{ header.time }}</span>
    </div>
    <div>
        <div style="margin-right:10px" v-if="header.lock">
            <img :src="lockImg" />
        </div>
        <div style="margin-right:6px;" v-if="header.battery_show">{{ header.battery }}%</div>
        <div style="margin-right:13px;position:relative">
            <div class="header-battery">
                <div class="battery-content" :class="{'is-full':header.battery === 100,'is-low':header.battery <= 20,'is-charging':header.battery_status === 'charging'}" :style="{width: 37 * header.battery / 100 + 'px'}"></div>
            </div>
            <div class="header-battery-flash" v-if="header.battery_status === 'charging'">
                <img :src="flashImg" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default{
    props:{
        header:Object
    },
    data(){
        return{
            signal:[1,2,3,4],
            wifi:[1,2,3],
            lockImg:'',
            flashImg:''
        }
    },
    watch:{
        header:{
            deep:true,
            immediate:true,
            handler:function(nv){
                if(this.header.style !== undefined) this.flashImg = require(`@/assets/images/flash-` + nv.style + `.png`)
                if(this.header.lock !== undefined) this.lockImg = require(`@/assets/images/lock-` + nv.style + `.png`)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
.display-header{
    height:40px;
    background-color:#eaeaea;
    color:#010103;
    font-size:24px;
}
.display-header.is-dark{
    background-color:#202020;
    color:#fff;
}
.display-header>div,.display-header>div:first-child>div,.display-header>div:last-child>div{
    display:inline-block;
    vertical-align:top;
}
.display-header>div:first-child,.display-header>div:last-child{
    width:calc(50% - 60px);
}
.display-header>div:last-child{
    text-align:right;
}


.header-signal{
    height:20px;
    margin-left:13px;
    margin-right:10px;
}
.header-signal>div{
    position:relative;
    top:-8px;
    display:inline-block;
    vertical-align:bottom;
    width:6px;
    margin:0 1.5px;
    border-radius:2px;
}


.header-company{
    max-width:117px;
    overflow:hidden;
    margin-right:10px;
}


.header-time{
    width:120px;
    text-align:center;
    font-weight:500;
}


.header-battery{
    position:relative;
    width:49px;
    height:23px;
    margin:8.5px 0;
    background:url('../../../assets/images/battery.png');
}
.battery-content{
    position:absolute;
    top:4px;
    left:4px;
    height:15px;
    background-color:#202020;
    border-radius:5px 0 0 5px;
}
.is-dark .battery-content{
    background-color:#fff;
}
.battery-content.is-full{
    border-radius:5px;
}
.battery-content.is-charging{
    background-color:$--color-primary;
}
.battery-content.is-low{
    background-color:$--color-danger;
}
.header-battery-flash{
    position:absolute;
    top:4.5px;
    left:14px;
    height:23px;
    width:17px;
}
.header-battery-flash img{
    width:100%;
    height:100%;
    object-fit:scale-down;
}

.header-wifi-strength{
    border-radius:50%;
    border:4px solid;
    border-right-color:transparent;
    border-left-color:transparent;
    border-bottom-color:transparent;
    position:absolute;
}
.header-wifi-strength:last-child{
    height:34px;
    width:34px;
    top:7px;
}
.header-wifi-strength:nth-child(2){
    height:18px;
    width:18px;
    top:15px;
    left:8.45px;
}
.header-wifi-strength:first-child{
    border:6px solid;
    border-right-color:transparent;
    border-left-color:transparent;
    border-bottom-color:transparent;
    height:0;
    width:0;
    top:23px;
    left:15.45px;
}
</style>