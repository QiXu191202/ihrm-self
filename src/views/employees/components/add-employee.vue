<template>
  <el-dialog
    title="新增员工"
    @close="close"
    :visible.sync="isDialogShow"
    width="600px"
  >
    <el-form ref="form" :model="formData" :rules="formRules" label-width="80px">
      <el-form-item prop="username" label="姓名">
        <el-input
          placeholder="请输入姓名"
          v-model="formData.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机号">
        <el-input
          placeholder="请输入手机号"
          v-model="formData.mobile"
        ></el-input>
      </el-form-item>
      <el-form-item prop="timeOfEntry" label="入职时间">
        <el-date-picker
          v-model="formData.timeOfEntry"
          type="date"
          placeholder="请选择入职时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="formOfEmployment" label="聘用形式">
        <el-select v-model="formData.formOfEmployment" placeholder="请选择">
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="workNumber" label="工号">
        <el-input
          placeholder="请输入工号"
          v-model="formData.workNumber"
        ></el-input>
      </el-form-item>
      <el-form-item prop="departmentName" label="部门">
        <el-cascader
          @focus="getDepartmentList"
          v-model="formData.departmentName"
          :options="depts"
          :props="{ label: 'name', value: 'name' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item prop="correctionTime" label="转正时间">
        <el-date-picker
          v-model="formData.correctionTime"
          type="date"
          placeholder="请选择转正时间"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <el-button size="small" @click="isDialogShow = false">取消</el-button>
      <el-button size="small" type="primary" @click="btnOK">确定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import EmoloyeeConstant from "@/api/constant/employees";
import { addEmployeeApi } from "@/api/employees";
import { getDepartmentListApi } from "@/api/department";
import { transListToTreeData } from "@/utils";
export default {
  name: "AddEmployee",
  data() {
    return {
      formData: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: [],
        timeOfEntry: "",
        correctionTime: "",
      },
      isDialogShow: false,
      formRules: {
        username: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 2, max: 4, message: "长度在2-4", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        workNumber: [
          {
            required: true,
            message: "请输入",
            trigger: "change",
          },
        ],
        departmentName: [
          {
            validator: (rule, value, cb) => {
              if (value.length === 0) return cb(new Error("请选择部门"));
              cb();
            },
            trigger: "change",
          },
        ],
        timeOfEntry: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      hireType: EmoloyeeConstant.hireType,
      depts: [],
    };
  },
  created() {
    this.getDepartmentList();
  },
  methods: {
    close() {
      this.formData = {};
    },
    async getDepartmentList() {
      let { depts } = await getDepartmentListApi();
      this.depts = transListToTreeData(depts, "");
    },
    async btnOK() {
      // 表单校验
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return console.log(error);
      }
      // 数据处理
      const length = this.formData.departmentName.length - 1;
      const cloneData = JSON.parse(JSON.stringify(this.formData));
      cloneData.departmentName = cloneData.departmentName[length];
      // 发送请求
      await addEmployeeApi(cloneData);
      this.$message.success("添加成功");
      this.isDialogShow = false;
      this.$emit("updateList");
    },
  },
};
</script>

<style></style>
