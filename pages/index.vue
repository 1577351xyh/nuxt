<template>
<div>
  <div class="container">
    我是标题
  </div>
  <div>
  <nuxt-link to="/registered">注册</nuxt-link>
  </div>
</div>
</template>

<script>

export default {
  async mounted(){
    let res = await this.$http.get('/info')
    console.log(res)
  }
}
</script>

<style lang="less" scope>



</style>
