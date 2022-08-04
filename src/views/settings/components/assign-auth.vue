<template>
  <el-dialog
    title="添加"
    :visible.sync="isDialogShow"
    width="30%"
    @close="close"
  >
    <el-tree
      v-if="isDialogShow"
      ref="tree"
      :data="allAuth"
      :props="{ label: 'name' }"
      node-key="id"
      show-checkbox
      :default-checked-keys="checkedAuth"
      :check-strictly="true"
    ></el-tree>

    <span slot="footer">
      <el-button @click="isDialogShow = false">Cancel</el-button>
      <el-button type="primary" @click="submitFn">OK</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAllPermissionApi } from "@/api/permission";
import { assignRoleApi } from "@/api/setting";
import { transListToTreeData } from "@/utils";
export default {
  name: "AssignAuth",
  data() {
    return {
      isDialogShow: false,
      allAuth: [], // 所有权限
      checkedAuth: [], // 选中的权限
      roleId: "",
    };
  },
  created() {
    this.initData();
  },
  methods: {
    // 获取所有权限，渲染树结构
    async initData() {
      let res = await getAllPermissionApi();
      this.allAuth = transListToTreeData(res, "0");
    },
    close() {
      this.checkedAuth = [];
    },
    async submitFn() {
      let permIds = this.$refs.tree.getCheckedKeys();
      if (permIds.length === 0) return this.$message.error("请选择权限");
      await assignRoleApi({
        id: this.roleId,
        permIds: permIds,
      });
      this.$message.success("分配权限成功");
      this.isDialogShow = false;
      this.$emit("updateList");
    },
  },
};
</script>

<style></style>
