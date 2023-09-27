<template>

    <div style="padding:20px 50px">
      <div style="margin-bottom: 30px">修改影片</div>
      <el-form :inline="true" :model="form" style="width: 80%" label-width="150px" :rules="rules" ref="ruleForm">
        <el-form-item label="id">
          <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="番名" prop="movName">
          <el-input v-model="form.movName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="视频类型" :label-width="formLabelWidth" prop="types">
          <el-select v-model="form.types" placeholder="请选择">
            <el-option label="动漫" value="动漫"></el-option>
            <el-option label="动漫-电影" value="动漫-电影"></el-option>
            <el-option label="电影" value="电影"></el-option>
            <el-option label="电视剧" value="电视剧"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="当前状态" :label-width="formLabelWidth" prop="stu">
          <el-select v-model="form.stu" placeholder="请选择">
            <el-option label="已上架" value="已上架"></el-option>
            <el-option label="待上架" value="待上架"></el-option>
            <el-option label="已下架" value="已下架"></el-option>
          </el-select>
        </el-form-item>
      
        <el-form-item label="地区" :label-width="formLabelWidth" prop="region">
          <el-input v-model="form.region" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="集数" :label-width="formLabelWidth" prop="times">
          <el-input v-model="form.times" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="封面文件名" :label-width="formLabelWidth" prop="img">
          <el-input v-model="form.img" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="视频文件名" :label-width="formLabelWidth" prop="mvs">
          <el-input v-model="form.mvs" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
  
      <div style="margin: 50px 330px">
        <el-button type="primary" @click="save">提交</el-button>
      </div>
  
    </div>
  </template>
  
  <script>
  import request from "@/utils/movRequest";
  
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
        //添加规则
      rules: {
        movName: [
          {required: true, message: '请输入番名', trigger: 'blur'},
        ],
        types: [
          {required: true, message: '请选择视频类型', trigger: 'blur'},
        ],
        stu: [
          {required: true, message: '请选择当前状态', trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请输入地区', trigger: 'blur'}
        ],
        times:[
          {required: true, message: '请输入集数', trigger: 'blur'},
        ],
        img:[
          {required: true, message: '请输入封面文件名', trigger: 'blur'}
        ],
        mvs:[
          {required: true, message: '请输入视频文件名', trigger: 'blur'}
        ],
      },
      //添加规则end
      }
    },
    created(){
      const id = this.$route.query.id
      request.get("/mov/movlistId/" + id).then(res =>{
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
  
  