<template>
  <div id="app">
    <i-header></i-header>
    <div class="mian">
      <a href="cell.html">跳转至cell.html</a>
      <p>我是 index index index index index 页面</p>
      <p>我是 index index index index index 页面</p>
      <p>我是 index index index index index 页面</p>
      <p>我是 index index index index index 页面</p>
      <p>我是index页面</p>
      <p>我是index页面</p>
      <p>我是index页面</p>
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

