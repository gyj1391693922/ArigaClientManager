<template>

  <div style="padding:20px 50px">
    <div style="margin-bottom: 30px">修改剧集/季</div>
    <el-form :inline="true" :model="form" style="width: 80%" label-width="150px">
      <el-form-item label="id">
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="当前标题">
        <el-input v-model="form.title" placeholder="请输入当前标题"></el-input>
      </el-form-item>
      <el-form-item label="语言地区">
        <el-input v-model="form.region" placeholder="请输入语言地区"></el-input>
      </el-form-item>
      <el-form-item label="使用语言">
        <el-input v-model="form.language" placeholder="请输入使用语言"></el-input>
      </el-form-item>
      <el-form-item label="播放形式">
        <el-input v-model="form.types" placeholder="请输入播放形式"></el-input>
      </el-form-item>
      <el-form-item label="其他特征">
        <el-input v-model="form.attributes" placeholder="请输入其他特征"></el-input>
      </el-form-item>
      <el-form-item label="是否为原始标题">
        <el-input v-model="form.isOrlginalTitle" placeholder="请输入是否为原始标题"></el-input>
      </el-form-item>
    </el-form>

    <div style="margin: 50px 330px">
      <el-button type="primary" @click="save">提交</el-button>
    </div>

  </div>
</template>

<script>
import request from "@/utils/akasRequest";

export default {
  name: 'AkasEdit',
  data() {
    return {
      form:{}
    }
  },
  created(){
    const id = this.$route.query.id
    request.get("/akas/akaslistId/" + id).then(res =>{
      this.form = res.data
    })
  },
  methods:{
    save(){
      request.post("/akas/update", this.form).then(res => {
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

