<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              ref="userForm"
              :model="formData"
              :rules="formRules"
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input style="width: 300px" v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formData.password2"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateInfo">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <user-info @updateUser="initData"></user-info>
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <job-info></job-info>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeInfoApi, editEmployeeApi } from "@/api/employees";
import UserInfo from "./components/user-info.vue";
import JobInfo from "./components/job-info.vue";
export default {
  name: "EmployeeDetail",
  components: {
    UserInfo,
    JobInfo,
  },
  data() {
    return {
      formData: {
        username: "",
        password2: "",
      },
      formRules: {
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 9, message: "密码长度6-9位", trigger: "blur" },
        ],
      },
      userId: this.$route.params.id,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let res = await getEmployeeInfoApi(this.userId);
      this.formData = res;
    },
    async updateInfo() {
      this.$refs.userForm.validate();
      try {
        await editEmployeeApi({
          ...this.formData,
          password: this.formData.password2 || "",
        });
        this.$message.success("更新用户信息成功");
        this.$router.go(-1);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
