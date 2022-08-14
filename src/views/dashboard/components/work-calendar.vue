<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select
        @change="changeDate"
        v-model="currentYear"
        size="small"
        style="width: 120px"
        placeholder="请输入年份"
      >
        <el-option
          v-for="item in yearList"
          :key="item"
          :value="item"
          :label="item"
        ></el-option>
      </el-select>
      <el-select
        @change="changeDate"
        v-model="currentMonth"
        size="small"
        style="width: 120px"
        placeholder="请输入月份"
      >
        <el-option
          v-for="item in 12"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-row>
    <el-row>
      <el-calendar v-model="currentDate">
        <template slot="dateCell" slot-scope="{ date, data }">
          <div class="date-content">
            <span class="text">{{ data.day | getDay }}</span>
            <span v-if="isWeek(date)" class="rest">休</span>
          </div>
        </template>
      </el-calendar>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "WorkCanendar",
  data() {
    return {
      yearList: [],
      currentYear: "",
      currentMonth: "",
      currentDate: "",
    };
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  created() {
    this.currentYear = this.startDate.getFullYear();
    this.currentMonth = this.startDate.getMonth() + 1;
    this.yearList = Array.from(Array(11), (item, index) => {
      return this.currentYear + index - 5;
    });
    this.changeDate(this.startDate.getDate());
  },
  filters: {
    getDay(val) {
      return val.split("-")[2];
    },
  },
  methods: {
    isWeek(val) {
      return [6, 0].includes(val.getDay());
    },
    changeDate(date) {
      let y = this.currentYear;
      let m = this.currentMonth;
      let d = date || 1;
      this.currentDate = new Date(y + "-" + m + "-" + d);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-day {
  height: auto;
}
::v-deep .el-calendar-table__row td,
::v-deep .el-calendar-table tr td:first-child,
::v-deep .el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
::v-deep .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
::v-deep .el-calendar__header {
  display: none;
}
</style>
