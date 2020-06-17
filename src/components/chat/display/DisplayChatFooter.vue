<template>
<div class="footer-container">
    <img :src="footerImg" />
</div>
</template>

<script>
export default{
    props:{
        type:String,
        chat:Object
    },
    data(){
        return{
            footerType:'',
            footerStyle:''
        }
    },
    computed:{
        footerImg(){
            if(!this.footerStyle || !this.footerType) return ''
                else return require(`@/assets/images/footer-` + this.footerType + `-` + this.footerStyle + `.png`)
        }
    },
    watch:{
        type:{
            deep:true,
            immediate:true,
            handler:function(nv){
                if(this.type !== undefined){
                    this.footerStyle = nv
                }
            }
        },
        chat:{
            deep:true,
            immediate:true,
            handler:function(nv){
                if(this.chat.chat_basic.footer !== undefined){
                    this.footerType = nv.chat_basic.footer
                }
            }
        }
    }
}
</script>