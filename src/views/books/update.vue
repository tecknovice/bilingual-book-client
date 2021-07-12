<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" :model="book">
      <el-form-item label="Name">
        <el-input v-model="book.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Update</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>

    <el-button
      type="primary"
      @click="createChapter"
      style="margin-bottom: 20px;"
    >
      Create chapters
    </el-button>

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
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Read" align="center" width="100">
        <template slot-scope="{ row }">
          <router-link :to="'/chapters/read/' + row._id" class="link-type">
            <el-button size="mini" type="primary">Read</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="200">
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" @click="updateChapter(row._id)"
            >Update</el-button
          >
          <el-button size="mini" type="danger" @click="deleteChapter(row._id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBook, updateBook } from '@/api/book';
import { deleteChapter } from '@/api/chapter';
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
    async onSubmit() {
      await updateBook(this.book);
    },
    async onCancel() {
      const response = await getBook(this.id);
      this.book = response.data;
    },
    async fetchData(id) {
      this.loading = true;
      const response = await getBook(id);
      this.book = response.data;
      this.loading = false;
    },
    createChapter() {
      this.$router.push('/chapters/create/' + this.id);
    },
    updateChapter(chapterId) {
      this.$router.push('/chapters/update/' + chapterId);
    },
    async deleteChapter(chapterId) {
      this.book.chapters = this.book.chapters.filter(
        chapter => chapter._id !== chapterId,
      );
      await updateBook(this.book);
      const response = await deleteChapter(chapterId);
    },
  },
};
</script>
