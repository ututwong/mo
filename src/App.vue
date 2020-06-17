<template>
  <div id="app">
    <wei-header></wei-header>
    <div class="page-container">
      <wei-controller></wei-controller>
      <wei-display></wei-display>
    </div>
    <wei-footer></wei-footer>
    <message-edit
      ref="edit"
      :visible.sync="messageVisible"
      :message.sync="message"
      :users="users">
    </message-edit>
  </div>
</template>

<script>
import WeiHeader from './layouts/WeiHeader'
import WeiController from './layouts/WeiController'
import WeiDisplay from './layouts/WeiDisplay'
import WeiFooter from './layouts/WeiFooter'

import MessageEdit from '@/components/common/MessageEdit'
export default {
  name: 'App',
  components:{
    WeiHeader,
    WeiController,
    WeiDisplay,
    WeiFooter,

    MessageEdit
  },
  data(){
    return{
      messageVisible:false,
      message:{},
      users:[]
    }
  }
}
</script>

<style scoped>
.page-container{
  margin-top:10px;
  margin-bottom:10px;
}
.page-container>div{
  display:inline-block;
  vertical-align:top;
}
.page-container>div:last-child{
  width:360px;
}
.page-container>div:first-child{
  width:calc(100% - 360px);
}
</style>

<style lang="scss">
@import '@/assets/styles/base.scss';
</style>
