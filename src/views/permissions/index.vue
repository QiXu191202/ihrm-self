<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addFn('0', 1)"
            >添加权限</el-button
          >
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table border :data="list" row-key="id">
        <el-table-column prop="name" align="center" label="名称" />
        <el-table-column prop="code" align="center" label="标识" />
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="addFn(scope.row.id, 2)"
              >添加</el-button
            >
            <el-button type="text" @click="editFn(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="delFn(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹窗 -->
    <add-permission @updateData="initData" ref="addPermission" />
  </div>
</template>

<script>
import {
  getAllPermissionApi,
  delPermissionApi,
  getPermissionInfoApi,
} from "@/api/permission";
import { transListToTreeData } from "@/utils";
import AddPermission from "./components/addPermission.vue";
export default {
  name: "Permission",
  components: {
    AddPermission,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let res = await getAllPermissionApi();
      this.list = transListToTreeData(res, "0");
    },
    addFn(id, type) {
      this.$refs.addPermission.formData.pid = id;
      this.$refs.addPermission.formData.type = type;
      this.$refs.addPermission.isPermissionShow = true;
    },
    async editFn(id) {
      // 获取权限详情
      let res = await getPermissionInfoApi(id);
      this.$refs.addPermission.formData = res;
      this.$refs.addPermission.isPermissionShow = true;
      this.$refs.addPermission.isEdit = true;
    },
    async delFn(id) {
      await this.$confirm("确认删除该权限吗");
      try {
        let res = await delPermissionApi(id);
        this.$message.success("删除成功");
        this.initData();
      } catch (error) {
        return console.log(error);
      }
    },
  },
};
</script>

<style></style>
