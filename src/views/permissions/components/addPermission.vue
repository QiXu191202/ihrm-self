<template>
  <el-dialog
    @close="close"
    title="新增权限"
    width="800px"
    :visible.sync="isPermissionShow"
  >
    <el-form ref="addForm" :model="formData" :rules="formRules">
      <el-row>
        <el-form-item label="权限名称" label-width="100px">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="权限标识" label-width="100px">
          <el-input v-model="formData.code"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="权限描述" label-width="100px">
          <el-input v-model="formData.description"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <!-- kaiguan -->
        <el-form-item label="开启" label-width="100px">
          <el-switch
            v-model="formData.enVisible"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button size="small" type="primary" @click="btnSubmit"
          >确定</el-button
        >
        <el-button size="small" @click="isPermissionShow = false"
          >取消</el-button
        >
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { addPermissionApi, updatePermissionApi } from "@/api/permission";
export default {
  name: "AddPermission",
  data() {
    return {
      isPermissionShow: false,
      formData: {
        code: 1,
        description: "",
        enVisible: "",
        name: "",
        pid: "",
        type: 2,
      },
      formRules: {
        name: [{ required: true, message: "请填写", trigger: "blur" }],
        description: [{ required: true, message: "请填写", trigger: "blur" }],
      },
      isEdit: false,
    };
  },
  methods: {
    async btnSubmit() {
      await this.$refs.addForm.validate();
      if (this.isEdit) {
        try {
          await updatePermissionApi(this.formData);
          this.$message.success("修改权限成功");
        } catch (error) {
          return console.log(error);
        }
      } else {
        try {
          await addPermissionApi(this.formData);
          this.$message.success("添加权限成功");
        } catch (error) {
          return console.log(error);
        }
        this.isPermissionShow = false;
        this.$emit("updateData");
      }
    },
    btnCancel() {},
    close() {
      this.formData = {
        code: 1,
        description: "",
        enVisible: "",
        name: "",
        pid: "",
        type: 2,
      };
    },
  },
};
</script>

<style></style>
