<template>
  <div id="app">
    <i-header></i-header>
    <div class="mian">
      <a href="index.html">跳转至index.html</a>
      <p>我是 cell cell cell cell cell cell 页面</p>
      <p>我是 cell cell cell cell cell cell 页面</p>
      <p>我是 cell cell cell cell cell cell 页面</p>
      <p>我是 cell cell cell cell cell cell 页面</p>
      <p>我是cell页面</p>
      <p>我是cell页面</p>
      <p>我是cell页面</p>
      <p>我是cell页面</p>
    </div>
    <i-footer></i-footer>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  name: "app",
  components: {
    "i-header": Header,
    "i-footer": Footer
  }
};
</script>

