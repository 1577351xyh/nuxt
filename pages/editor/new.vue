<template>
  <div>
    <div class="write-btn">
      <el-button @click="submit" type="primary">提交</el-button>
    </div>

    <el-row>
      <el-col :span="12">
        <textarea class="md-editor" :value="content" @input="update"></textarea>
      </el-col>
      <el-col :span="12">
        <div class="markdown-body" v-html="compiledMarkdown"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
//懒加载的
import debounce from "lodash/debounce";
//解析成html
import marked from "marked";
export default {
  //头部加载
  head: {
    link: [
      {
        href:
          "https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css",
        rel: "stylesheet"
      }
    ]
  },
  data() {
    return {
      content: "# 文章提交"
    };
  },
  computed: {
    compiledMarkdown() {
      return marked(this.content, { sanitize: true });
    }
  },
  methods: {
    // 函数防抖,延迟150,最后更新完才会重新统计
    update: debounce(function(e) {
      this.content = e.target.value;
    }, 150),

    async submit() {
      let ret = await this.$http.post("/article/create", {
        content: this.content
      });
      if (ret.code == 200) {
        this.$notify({
          title: "创建成功",
          type: "success",
          message: `文章《${ret.data.title}》创建成功`
        });
        
      }
    }
  }
};
</script>
<style scope>
.md-editor {
  width: 100%;
  height: 100vh;
  outline: none;
}

.write-btn {
  position: fixed;
  z-index: 100;
  right: 30px;
  top: 10px;
}
</style>
