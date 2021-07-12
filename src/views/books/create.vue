<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" label-position="top">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getList, createBook } from '@/api/book';
export default {
  data() {
    return {
      form: {
        name: '',
      },
    };
  },
  methods: {
    async onSubmit() {
      const res = await createBook(this.form);
      this.$router.push('/books');
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning',
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
