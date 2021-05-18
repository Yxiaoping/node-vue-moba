<template>
    <div>
        <h1>分类列表</h1>
            <el-table :data="items">
            <el-table-column prop="_id" label="ID" width='230'></el-table-column>
            <el-table-column prop="parent.name" label="上级分类"></el-table-column>
            <el-table-column prop="name" label="分类名称"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="$router.push(`/categories/edit/${scope.row._id}`)" 
                    type="primary" size="small">编辑</el-button>
                    <el-button @click="remove(scope.row)" type='primary' size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods : {
    async fetch(){
      const res = await this.$http.get('/rest/categories')
      this.items = res.data
    },
    remove(row){
      // await this.$http.delete(`/categories/${id}`)
      // this.$message({
      //       type: 'success',
      //       message: '删除成功'
      //   })
      // this.fetch()
        this.$confirm(`是否确定删除分类"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`/rest/categories/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        this.fetch()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  created () {
      this.fetch()
  }
}
</script>

<style>

</style>
