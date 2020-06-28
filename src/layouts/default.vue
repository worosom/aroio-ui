<template>
  <div>
    <div v-if="saved"></div>
    <headroom :offset="60">
      <b-navbar toggleable="md"
                type="dark"
                variant="info"
                class="navbar--top"
                >
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand nuxt link to="/"
                        v-html="system.platform + ' - ' + network.hostname"
          />
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item nuxt router
              :to="$i18n.path('convolver')"
              >
              {{ $t('links.convolver') }}
            </b-nav-item>
            <b-nav-item nuxt router
              :to="$i18n.path('measure')"
              >
              {{ $t('links.measure') }}
            </b-nav-item>
            <b-nav-item nuxt router
              :to="$i18n.path('network')"
              >
              {{ $t('links.network') }}
            </b-nav-item>
            <b-nav-item nuxt router
              :to="$i18n.path('system')"
              >
              {{ $t('links.system') }}
            </b-nav-item>
            <b-nav-item nuxt router :to="$i18n.path('help')">
              {{ $t('links.help') }}
            </b-nav-item>
            <b-nav-item-dropdown :text="$t('language')" right>
              <b-dropdown-item href="/en">EN</b-dropdown-item>
              <b-dropdown-item href="/de">DE</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-btn-group class="ml-2">
              <b-btn
                @click="reboot()"
                >{{ $t('reboot') }}</b-btn>
              <b-btn
                type="submit"
                :disabled="!dirty"
                @click.stop.prevent="submit()"
                >{{ $t('save_settings') }}</b-btn>
            </b-btn-group>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </headroom>
    <div class="main__wrap">
      <nuxt/>
    </div>
    <reboot-modal />
  </div>
</template>

<style>
</style>
<script>
import { mapState, mapGetters } from 'vuex';
import { headroom } from 'vue-headroom';
import RebootModal from '../components/RebootModal';

export default {
  head() {
    let name = this.network.hostname;
    let section = this.$t(this.section+'.title');
    return {
      title: `${name} > ${section}`
    }
  },
  components: { headroom, RebootModal },
  computed: {
    ...mapState({
      audio: state => state.config,
      brutefir: state => state.config,
      network: state => state.config,
      system: state => state.config
    }),
    ...mapGetters([
      'loading',
      'saving',
      'saved',
    ]),
    dirty() {
      return this.$store.state.dirty;
    },
    section() {
      const path = this.$route.path;
      const slug = path.split('/').pop();
      if (slug)
        return slug.toUpperCase();
      else
        return 'INDEX';
    }
  },
  watch: {
    rebooting() {
      if (this.rebooting) {
        this.$refs.reboot_modal.show();
      } else {
        this.$refs.reboot_modal.hide();
      }
    }
  },
  methods: {
    submit() {
      document.activeElement.blur();
      this.$store.dispatch('SAVE_CONFIG');
    },
    reboot() {
      this.$store.dispatch('REBOOT');
    }
  }
}
</script>
