<template>
  <div class="box">
    <div class="items">items-1</div>
    <div class="items">items-2</div>
    <div class="items">items-3</div>
    <div class="items">items-4</div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.box{
  width:100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .items{
    height: 50px;
    width: 200px;
    background-color: aqua;
  }
}
</style>
