<template>
    <div class="image-container" :style="{height:height + 'px',width:width + 'px'}">
        <input class="image-ori-input" ref="input" type="file" accept="image/*" @change="handleSuccess($event)"/>
        <div class="image-input" :style="{lineHeight:height + 'px'}" @click="handleClick">
            <i v-if="!imgUrl" class="iconfont iconjiahao"></i>
            <img v-if="imgUrl" class="image-result" :src="imgUrl" />
        </div>
    </div>
</template>

<script>
import { getBase64 } from '@/utils/base64'
export default{
    props:{
        height:Number,
        width:Number,
        url:String
    },
    data(){
        return{
            imgUrl:''
        }
    },
    methods:{
        handleSuccess(e){
            getBase64(e.target.files[0]).then(r=>{
                this.imgUrl = r
                this.$emit('update:url',this.imgUrl)
            })
        },
        handleClick(){
            this.$refs.input.click()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base.scss';
.image-input{
    width:100%;
    height:100%;
    border:1px dotted $border-color;
    border-radius:5px;
    text-align:center;
    cursor:pointer;
}
.image-input i{
    font-size:40px;
    color:$border-color;
}
.image-ori-input{
    display:none;
}
.image-result{
    width:100%;
    height:100%;
    object-fit:fill;
    border-radius:5px;
}
</style>