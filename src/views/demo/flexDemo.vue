<template>
  <div>
    <div class="box">
      <div class="items">items-1</div>
      <div class="items">items-2</div>
      <div class="items">items-3</div>
      <div class="items">items-4</div>
    </div>
    <div class="box-position">
      <div class="box-position-absolute">items-5</div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.box{
  width:100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .items{
    height: 50px;
    width: 200px;
    background-color: aqua;
  }
}
.box-position{
    width: 80%;
    // height: 100px;
    position: absolute;
    bottom: 10px;
  .box-position-absolute{
    height: 45px;
     background-color:burlywood;
  }
}
</style>
