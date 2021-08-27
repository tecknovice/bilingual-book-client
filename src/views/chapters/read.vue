<template>
  <div class="app-container">
    <el-row>
      <router-link v-if="previous !== null" :to="'/books/' + book._id">
        <h1 class="text-align-center">{{ book.name }}</h1>
      </router-link>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <router-link
          v-if="previous !== null"
          :to="'/chapters/read/' + book.chapters[previous]._id"
        >
          <h5 class="text-align-center">
            Chapter {{ previous + 1 }}: {{ book.chapters[previous].name }}
          </h5>
        </router-link>
      </el-col>
      <el-col :span="8" :offset="previous !== null ? 0 : 8">
        <h3 class="text-align-center">
          Chapter {{ current + 1 }}: {{ chapter.name }}
        </h3>
      </el-col>
      <el-col :span="8">
        <router-link
          v-if="next !== null"
          :to="'/chapters/read/' + book.chapters[next]._id"
        >
          <h5 class="text-align-center">
            Chapter {{ next + 1 }}: {{ book.chapters[next].name }}
          </h5>
        </router-link>
      </el-col>
    </el-row>
    <hr>
    <el-row :gutter="20">
      <el-col :span="bilingualMode ? 12 : 24">
        <div v-html="chapter.content" />
      </el-col>
      <el-col v-if="bilingualMode" :span="12">
        <div v-html="chapter.translated" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getChapter } from '@/api/chapter'
import { getBook } from '@/api/book'
export default {
  data() {
    return {
      chapter: {},
      book: {},
      loading: true
    }
  },
  computed: {
    bilingualMode() {
      return this.$store.state.app.bilingualMode
    },
    previous() {
      const chapters = this.book.chapters
      if (!chapters) return null
      if (this.current > 0) {
        const prev = this.current - 1
        return prev
      } else {
        return null
      }
    },
    current() {
      const chapters = this.book.chapters
      if (!chapters) return null
      const current = chapters.findIndex(
        chapter => chapter._id === this.chapter._id
      )
      return current
    },
    next() {
      const chapters = this.book.chapters
      if (!chapters) return null
      if (this.current < chapters.length - 1) {
        const next = this.current + 1
        return next
      } else {
        return null
      }
    }
  },
  async created() {
    const id = this.$route.params && this.$route.params.id
    await this.fetchData(id)
  },
  methods: {
    async fetchData(id) {
      this.loading = true
      let response = await getChapter(id)
      this.chapter = response.data
      response = await getBook(this.chapter.book)
      this.book = response.data
      this.loading = false
    }
  }
}
</script>
<style scoped>
.text-align-center {
  text-align: center;
}
</style>
