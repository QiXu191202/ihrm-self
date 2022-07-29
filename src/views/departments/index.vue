<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- <h2>组织架构</h2> -->
      <el-card class="tree-card">
        <!-- 头部 -->
        <treeTools
          @addDept="addDept"
          :isRoot="true"
          :treeNode="company"
        ></treeTools>
        <!-- 组织架构 树组件el-tree -->
        <el-tree :data="depts" :props="{ label: 'name' }">
          <tree-tools
            @addDept="addDept"
            @editDept="editDept"
            @delDept="delDept"
            slot-scope="{ data }"
            :treeNode="data"
          ></tree-tools>
        </el-tree>
        <!-- 新增弹框组件 -->
        <addDept ref="addDept" @addDepart="initData"></addDept>
      </el-card>
    </div>
  </div>
</template>

<script>
import addDept from "./components/add-dept.vue";
import treeTools from "./components/tree-tools.vue";
import {
  getDepartmentListApi,
  getDepartmentInfoApi,
  delDepartmentApi,
} from "@/api/department";
import { transformList } from "@/utils";
export default {
  name: "Departments",
  components: {
    addDept,
    treeTools,
  },
  data() {
    return {
      company: {
        name: "传智教育",
        manager: "负责人",
        id: "",
      },
      depts: [],
      dialogShow: false,
    };
  },
  methods: {
    addDept(val) {
      this.$refs.addDept.dialogFormVisible = true;
      this.$refs.addDept.formData.pid = val.id;
    },
    async editDept(id) {
      this.$refs.addDept.formData = await getDepartmentInfoApi(id);
      this.$refs.addDept.dialogFormVisible = true;
    },
    async delDept(id) {
      await this.$confirm("确定删除吗", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
      });
      await delDepartmentApi(id);
      this.$message.success("删除成功");
      this.initData();
    },
    async initData() {
      let { companyName, depts } = await getDepartmentListApi();
      this.company.name = companyName;
      this.depts = transformList(depts, "");
    },
  },
  created() {
    this.initData();
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
