<template>
  <div class="edit-div" ref="editor" :contenteditable="true" @input="changeText" @blur="editBlur"></div>
</template>

<script>
export default {
  name: 'EditDiv',
  props:{
    isclear:'',
    isfocus:true,
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  watch: {
    'isclear'(val){
      if (val === 1) {
        this.$refs.editor.innerText = ''
      }
    }
  },
  methods: {
    changeText(){
      this.$emit('input', this.$el.innerText)
    },
    editBlur(){
      this.$refs.editor.focus()
      if (!this.isfocus) {
        this.$refs.editor.blur()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.edit-div {
  width:6rem;
  min-height:.9rem;
  max-height:2.3rem;
  overflow-y:auto;
  padding:0.2rem 0.2rem;
  border-bottom: 0.01rem solid #e5e5e5;
  box-sizing:border-box;
  caret-color:#068708;
  white-space: pre-wrap;
  // &[contenteditable=true]{
  //     user-modify: read-write-plaintext-only;
  //     &:empty:before {
  //         content: attr(placeholder);
  //         display: block;
  //         color: #ccc;
  //     }
  // }
  &:focus{
    outline:none;
    border-bottom: 0.01rem solid #80af57;
  }
}
</style>
