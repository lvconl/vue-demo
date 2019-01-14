<template>
    <div>
      <mt-swipe class="swipe-wrapper">
        <mt-swipe-item><img src="../assets/swipe/1.gif" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/swipe/2.jpg" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>
</template>

<script>
export default {
  name: 'HomeContainer'
}
</script>

<style lang="scss" scoped>
  .swipe-wrapper{
    height: 200px;
    margin-top: 3rem;
  }
</style>
