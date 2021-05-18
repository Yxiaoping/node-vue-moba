<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers = 'getAuthHeaders()'
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    afterUpload(res){
      // 直接賦值不上，因爲一開始並不存在這個數據，所以要用$set語法
      // 設置顯示賦值
      this.$set(this.model, 'icon', res.url)
        // this.model.icon = res.url
    },
    async save() {
      let res;
      if (this.id) {
        // 有id，通过put方法提交对其的编辑、修改，因为将编辑页合并在这个页面中了
        res = await this.$http.put(`/rest/items/${this.id}`, this.model);
      } else {
        // 没有id则新增
        res = await this.$http.post("/rest/items", this.model);
      }

      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
      console.log(res);
    },
    async fetch() {
      const res = await this.$http.get(`/rest/items/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style>
</style>
