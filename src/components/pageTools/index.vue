<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <div class="before" v-if="leftText">
          <i class="el-icon-info">{{ leftText }}</i>
        </div>
      </el-col>
      <!-- 右边 -->
      <div style="display: flex; justify-contet: end">
        <!-- 默认插槽 -->
        <slot />
      </div>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "PageTools",
  props: {
    leftText: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
.page-tools {
  margin: 10px 0;
  .before {
    line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
}
</style>
