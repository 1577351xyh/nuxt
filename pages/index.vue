<template>
  <div class="container">
    我是标题
  </div>
</template>

<script>

export default {
  async mounted(){
    let res = await this.$axios.get('/api/info')
    console.log(res);
  }
}
</script>

<style>



</style>
