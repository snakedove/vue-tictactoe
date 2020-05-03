<template>
    <div :id="id" :class="getClass" @click="squareClicked(id)"></div>
</template>

<script>
export default {
  name: 'Square',
  props: ['id', 'field', 'won', 'computerTurn'],
  data: function () {
    return {
      'class': ''
    }
  },
  methods: {
    squareClicked (id) {
      this.$emit('square-clicked', id.replace('f', ''));
      this.class = ' put';
      setTimeout(() => {
        this.class = '';
      }, 1000);
    }
  },
  computed: {
    getClass () {
      return 'square' + ' ' + this.field + ( this.won !== '' || this.computerTurn ? ' blocked' : '') + this.class
    }
  }
}
</script>

<style lang="scss">
  // no styles yet
</style>
