<template>
  <div class="home">
    <div class="sidebar"></div>
    <div class="content">
      <div class="texts">全部</div>
      <div class="texts">未标签</div>
      <div class="texts">标签</div>
      <div class="texts">语言</div>
    </div>
    <div class="details"></div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .sidebar {
    width: 3%;
    height: 100%;
    border-radius: 5px;
    background-color: #23334c;
  }
  .content {
    width: 12%;
    height: 100%;
    border-radius: 5px;
    background-color: #171f2b;
    // display: flex;
    // align-items: flex-start;
    // flex-wrap: wrap;
    .texts {
      color: #b8c2cc;
    }
  }
  .details {
    width: 85%;
    height: 100%;
    background-color: #ffffff;
  }
}
</style>
