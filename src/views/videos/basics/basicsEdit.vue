<template>

    <div style="padding:20px 50px">
      <div style="margin-bottom: 30px">修改影片</div>
      <el-form :inline="true" :model="form" style="width: 80%" label-width="150px">
        <el-form-item label="id">
          <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="播放类型" prop="titleType">
          <el-select v-model="form.titleType" placeholder="请选择">
            <el-option label="剧场上映" value="剧场上映"></el-option>
            <el-option label="电视播放" value="电视播放"></el-option>
            <el-option label="独家播放" value="独家播放"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前标题" prop="primaryTitle">
          <el-input v-model="form.primaryTitle" placeholder="当前标题"></el-input>
        </el-form-item>
        <el-form-item label="原始标题" prop="oldTitle">
          <el-input v-model="form.oldTitle" placeholder="原始标题"></el-input>
        </el-form-item>
        <el-form-item label="面向成年" prop="isAdult">
          <el-select v-model="form.isAdult" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开播日期" prop="startYear">
          <el-date-picker
            v-model="form.startYear"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完结日期" prop="endYear">
          <el-date-picker
            v-model="form.endYear"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时长" prop="runtimeMinutes">
          <el-input v-model="form.runtimeMinutes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="视频类型" prop="genres">
          <el-select v-model="form.genres" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
  
      <div style="margin: 50px 330px">
        <el-button type="primary" @click="save">提交</el-button>
      </div>
  
    </div>
  </template>
  
  <script>
  import request from "@/utils/request";
  
  export default {
    name: 'BasicsEdit',
    data() {
        var tcon = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('编号不能为空'));
      }
      setTimeout(() => {
        if (!/^[0-9]+$/.test(value)) {
          callback(new Error('请输入4位数字值'));
        } else {
          callback(); // 验证通过，不传递任何参数
        }
      }, 1000);
    };
      return {
        form: {},
        rules: {
        tconst: [
          {min: 4,max: 4, message: '请输入4位纯数字编号', trigger: 'blur'},
          {validator:tcon, trigger:'blur'}
        ],
        titleType: [
          {required: true, message: '请选择播放类型', trigger: 'blur'},
        ],
        primaryTitle: [
          {required: true, message: '请输入当前标题', trigger: 'blur'}
        ],
        oldTitle: [
          {required: true, message: '请输入原先标题', trigger: 'blur'}
        ],
        isAdult:[
          {required: true, message: '请选择面向群体', trigger: 'blur'},
        ],
        startYear:[
          {required: true, message: '请选择开播日期', trigger: 'blur'}
        ],
        runtimeMinutes:[
          {required: true, message: '请输入大概时长', trigger: 'blur'}
        ],
        genres:[
          {required: true, message: '请选择视频类型', trigger: 'blur'},
        ],
      },
      // 视频类型多选框
      options: [{
          value: '动作',
          label: '动作'
        }, {
          value: '科幻',
          label: '科幻'
        }, {
          value: '战争',
          label: '战争'
        }, {
          value: '爱情'
        }, {
          value: '喜剧',
          label: '喜剧'
        },{
          value: '恐怖',
          label: '恐怖'
        }, {
          value: '动画',
          label: '动画'
        }, {
          value: '历史',
          label: '历史'
        }, {
          value: '剧情',
          label: '剧情'
        }, {
          value: '记录',
          label: '记录'
        }],
        value1: [],
      // 视频类型 end

      }
    },
    created(){
      const id = this.$route.query.id
      request.get("/basics/basicslistId/" + id).then(res =>{
        this.form = res.data
      })
    },
    methods:{
      save(){
        request.post("/basics/update", this.form).then(res => {
          if (res.code === "200"){
            this.$notify.success('更新成功')
            this.$router.push('videoList')
          }else {
            this.$notify.error(res.msg)
          }
        })
      }
    }
  }
  </script>
  
  