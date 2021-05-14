<template>
  <div class="app-container">
    <el-table
      v-loading="bookLoading"
      :data="book.sentences"
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
import { getBook } from '@/api/book';

export default {
  data() {
    return {
      book: null,
      bookLoading: true,
    };
  },
  created() {
    const id = this.$route.params && this.$route.params.id;
    this.fetchData(id);
  },
  methods: {
    fetchData(id) {
      this.bookLoading = true;
      getBook(id).then(response => {
        this.book = response.data;
        this.bookLoading = false;
      });
    },
  },
};
</script>
