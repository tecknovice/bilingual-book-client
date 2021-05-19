<template>
  <div class="app-container">
    <el-row
      ><h3>{{ chapter.name }}</h3></el-row
    >
    <el-row :gutter="20">
      <el-col :span="12">
        <div v-html="chapter.content"></div>
      </el-col>
      <el-col :span="12">
        <div v-html="chapter.translated"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getChapter } from '@/api/chapter';

export default {
  data() {
    return {
      chapter: null,
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
  },
};
</script>
