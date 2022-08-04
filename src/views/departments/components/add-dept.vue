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
        <el-select
          v-model="formData.manager"
          placeholder="请选择"
          @focus="getEmployeeList"
        >
          <el-option
            v-for="item in employeeList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          >
          </el-option>
        </el-select>
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
        <el-button type="primary" @click="btnOK">确定</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { getEmployeeListApi } from "@/api/employees";
import { addDepartmentApi, editDepartmentApi } from "@/api/department";
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
      employeeList: [], // 负责人列表
    };
  },
  methods: {
    async getEmployeeList() {
      this.employeeList = await getEmployeeListApi();
    },
    async btnOK() {
      // 表单校验
      try {
        await this.$refs.AddDept.validate();
      } catch (error) {
        return console.log(error);
      }
      // 发送请求
      if (this.formData.id) {
        await editDepartmentApi(this.formData);
        this.$message.success("修改成功");
      } else {
        await addDepartmentApi(this.formData);
        this.$message.success("添加成功");
      }
      // 关闭弹窗
      this.dialogFormVisible = false;
      this.$emit("addDepart");
    },
  },
};
</script>

<style></style>
