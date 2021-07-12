<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="chapter"
      label-width="120px"
      label-position="top"
    >
      <el-form-item label="Name">
        <el-input v-model="chapter.name" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Content">
            <tinymce v-model="chapter.content" :height="400" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Nội dung">
            <tinymce v-model="chapter.translated" :height="400" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Update</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';
import { addChapter } from '@/api/book';
import { getChapter, updateChapter } from '@/api/chapter';

export default {
  components: { Tinymce },
  data() {
    return {
      chapter: {},
      loading: true,
    };
  },
  created() {
    const id = this.$route.params && this.$route.params.id;
    this.fetchData(id);
  },
  methods: {
    fetchData(id) {
      this.loading = true;
      getChapter(id).then(response => {
        this.chapter = response.data;
        this.loading = false;
      });
    },
    async onSubmit() {
      await updateChapter(this.chapter);
      this.$router.push(`/books/${this.chapter.book}`);
    },
    async onCancel() {
      const response = await getChapter(this.chapter._id);
      this.chapter = response.data;
    },
  },
};
</script>
