<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      :data="book.chapters"
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
      <el-table-column label="Name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="{ row }">
          <router-link :to="'/chapters/read/' + row._id" class="link-type">
            <el-button size="mini" type="primary">Read</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="deleteChapter(row._id)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary">
      <router-link :to="'/chapters/create/' + id">
        <span>Create chapter</span>
      </router-link>
    </el-button>
  </div>
</template>

<script>
import { getBook } from '@/api/book';

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger',
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      book: {},
      loading: true,
      id: 0,
    };
  },
  created() {
    this.id = this.$route.params && this.$route.params.id;
    this.fetchData(this.id);
  },
  methods: {
    fetchData(id) {
      this.loading = true;
      getBook(id).then(response => {
        this.book = response.data;
        this.loading = false;
      });
    },
    createChapter() {
      this.$router.push('/chapter/create/' + this.id);
    },
    async deleteChapter(chapterId) {
      const response = await deleteChapter(chapterId);
    },
  },
};
</script>
