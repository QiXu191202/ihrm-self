<template>
  <el-dialog
    @close="close"
    :title="formData.id ? '编辑角色' : '新增角色'"
    :visible.sync="dialogFormVisible"
  >
    <el-form ref="form">
      <el-form-item label="角色名称" label-width="100px">
        <el-input
          v-model="formData.name"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="100px">
        <el-input
          v-model="formData.description"
          placeholder="请输入角色描述"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="btnOK">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRoleApi, editRoleApi } from "@/api/setting";
export default {
  name: "addRole",
  data() {
    return {
      dialogFormVisible: false,
      formData: {
        name: "",
        description: "",
        id: "",
      },
      formRules: {
        name: [{ required: true, message: "请输入角色", trigger: "blur" }],
      },
    };
  },
  methods: {
    close() {
      this.formData = {
        name: "",
        description: "",
      };
    },
    async btnOK() {
      // 校验
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return console.log(error);
      }
      // 发送请求
      if (this.formData.id) {
        // 编辑
        await editRoleApi(this.formData);
      } else {
        await addRoleApi(this.formData);
      }
      this.$message.success("操作成功");
      this.dialogFormVisible = false;
      this.$emit("updateList");
    },
  },
};
</script>

<style></style>
