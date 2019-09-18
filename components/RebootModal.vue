<template>
  <b-modal ref="reboot_modal"
           centered
           no-close-on-backdrop
           no-close-on-esc
           hide-footer
           >
           <h4 slot="modal-header">{{ $t('modals.reboot.title') }}</h4>
           <p>System scheduled for reboot...</p>
           <p v-if="system_down">Waiting for startup</p>
  </b-modal>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
  computed: {
    system_down() {
      const state = this.$store.state;
      return state.status === state.STATUS_REBOOTING;
    },
    ...mapGetters([
      'rebooting'
    ])
  },
  watch: {
    rebooting() {
      if (this.rebooting) {
        this.$refs.reboot_modal.show();
      } else {
        this.$refs.reboot_modal.hide();
      }
    },
    system_down() {
      if (this.system_down) {
        const ping = () => {
          this.$axios.get(window.location.href)
            .then(() => {
              window.clearTimeout(this.timeout);
              this.$store.dispatch('nuxtServerInit');
            })
            .catch(() => {
              this.timeout = window.setTimeout(ping, 1000);
            });
        };
        this.timeout = window.setTimeout(ping, 1000);
      }
    }
  }
}
</script>
