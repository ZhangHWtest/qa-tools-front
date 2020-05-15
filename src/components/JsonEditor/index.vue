<template>
  <div class="json-editor">
    <textarea ref="textarea" />
    </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
// eslint-disable-next-line import/no-webpack-loader-syntax
require('script-loader!jsonlint')

export default {
  name: 'JsonEditor',
  /* eslint-disable vue/require-prop-types */
  props: ['value', 'readOnly'],

  data () {
    return {
      jsonEditor: null
    }
  },
  watch: {
    value (value) {
      const editorValue = this.jsonEditor.getValue()
      if (value !== editorValue) {
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
      }
    }
  },
  mounted () {
    this.initJsonEditor()
    this.jsonEditor.setOption('readOnly', this.readOnly)
  },
  methods: {
    // 初始化jsonEditor
    initJsonEditor () {
      this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        lineNumbers: true,
        mode: 'application/json',
        gutters: ['CodeMirror-lint-markers'],
        theme: 'rubyblue',
        lint: true
      })
      this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
      this.jsonEditor.on('change', cm => {
        this.$emit('changed', cm.getValue())
        this.$emit('input', cm.getValue())
      })
    },
    // 获取json
    getValue () {
      return this.jsonEditor.getValue()
    }
  }
}
</script>

<style scoped>
.json-editor {
  height: 100%;
  position: relative;
}
.json-editor >>> .CodeMirror {
  height: auto;
  min-height: 300px;
}
.json-editor >>> .CodeMirror-scroll {
  min-height: 300px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #f08047;
}
</style>
