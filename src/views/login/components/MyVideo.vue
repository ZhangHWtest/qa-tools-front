<template>
  <div class="video-container">
    <video :style="fixStyle"
           autoplay
           loop
           muted
           class="fillWidth"
           v-on:canplay="canplay">
      <source src="@/assets/video/index-4.mp4"
              type="video/mp4" />
    </video>
  </div>
</template>

<script>
export default {
  mounted: function () { // 屏幕自适应
    window.onresize = () => {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial'
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial'
        }
      }
    }
    window.onresize()
  }
}
</script>

<style>
.video-container {
  position: relative;
  /* height: 100vh; */
  overflow: hidden;
}
.fillWidth {
  width: 100%;
}
</style>
