<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" label-position="top">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Content">
            <tinymce v-model="form.content" :height="300" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Nội dung">
            <tinymce v-model="form.translated" :height="300" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { addChapter } from '@/api/book'
import { createChapter } from '@/api/chapter'
export default {
  components: { Tinymce },
  data() {
    return {
      form: {
        bookId: '',
        name: '',
        content: '',
        translated: ''
      }
    }
  },
  created() {
    this.form.bookId = this.$route.params && this.$route.params.bookId
  },
  methods: {
    async onSubmit() {
      const chapterResponse = await createChapter(this.form)
      const chapter = chapterResponse.data
      await addChapter(this.form.bookId, chapter._id)
      this.$router.push(`/books/${this.form.bookId}`)
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
