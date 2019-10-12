<script>
export default {
  props: [ 'section', 'item', 'type', 'disabled', 'placeholder' ],
  computed: {
    model: {
      get() {
        if (this.disabled) {
          if (this.item.startsWith('lan') || this.item.startsWith('wlan')) {
            return this.$store.state.system.network[this.item]
          }
        }
        return this.$store.state.config[this.item]
      },
      set(value) {
        if (!this.disabled) {
          this.$store.commit('SET_VALUE', {
            section: this.section,
            key: this.item,
            value
          })
        }
      }
    }
  }
}
</script>
