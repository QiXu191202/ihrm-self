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
            slot-scope="{ data }"
            :treeNode="data"
          ></tree-tools>
        </el-tree>
        <!-- 新增弹框组件 -->
        <addDept ref="addDept"></addDept>
      </el-card>
    </div>
  </div>
</template>

<script>
import addDept from "./components/add-dept.vue";
import treeTools from "./components/tree-tools.vue";
import { getDepartmentListApi } from "@/api/department";
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
