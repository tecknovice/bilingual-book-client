<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      :data="chapter.paragraphs"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="content">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="translated">
        <template slot-scope="scope">
          {{ scope.row.translated }}
        </template>
      </el-table-column>
    </el-table>
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
