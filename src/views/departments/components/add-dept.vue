<template>
  <el-dialog title="新增部门" :visible.sync="dialogFormVisible">
    <el-form
      :model="formData"
      :rules="formRules"
      ref="AddDept"
      label-width="140px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input style="width: 80%" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input style="width: 80%" v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-input style="width: 80%" v-model="formData.manager"></el-input>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          v-model="formData.introduce"
          rows="4"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-row type="flex" justify="center">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "AddDept",
  data() {
    return {
      dialogFormVisible: false,
      formData: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
        pid: "",
      },
      formRules: {
        name: [{ required: true, message: "请输入", trigger: "bblur" }],
        code: [{ required: true, message: "请输入", trigger: "bblur" }],
        manager: [{ required: true, message: "请输入", trigger: "bblur" }],
        introduce: [{ required: true, message: "请输入", trigger: "bblur" }],
      },
    };
  },
};
</script>

<style></style>
