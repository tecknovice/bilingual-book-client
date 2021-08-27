<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
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
      <el-table-column label="Actions" align="center" width="230">
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" @click="openBook(row._id)">
            Open
          </el-button>
          <el-button size="mini" type="danger" @click="deleteBook(row._id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, deleteBook } from '@/api/book'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const response = await getList()
      this.list = response.data.items
      this.listLoading = false
    },
    openBook(bookId) {
      this.$router.push('/books/' + bookId)
    },
    async deleteBook(bookId) {
      await deleteBook(bookId)
      await this.fetchData()
    }
  }
}
</script>
<style scoped>
.cell {
  display: flex;
  justify-content: space-around;
}
</style>
