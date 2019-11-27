<style>
.has_update {
  font-weight: bold;
  color: #007777;
}
</style>
<template>
      <b-card
        class="mb-4"
        :title="$t('SYSTEM.update_settings')"
        >
        <b-row>
          <b-col>
            {{$t('SYSTEM.current_version').label}}:
            {{current_version}}
          </b-col>
          <b-col>
            {{$t('SYSTEM.available_version').label}}:
            <span
              :class="has_update ? 'has_update' : ''">{{available_version}}</span>
          </b-col>
        </b-row>
        <hr/>
        <input-field
          section="SYSTEM"
          item="usebeta"
          type="checkbox"
          ></input-field>
        <b-row>
          <b-col>
            <b-btn size="sm"
                   variant="outline-primary"
                   :disabled="waiting"
                   @click="has_update ? installUpdate() : searchUpdate()"
              >{{ has_update ? $t('SYSTEM.install_update.label') : $t('SYSTEM.search_update.label') }}</b-btn>
          </b-col>
        </b-row>
      </b-card>
</template>
<script>
import InputField from '~/components/InputField';

export default {
  components: { InputField },
  data() {
    return {
      waiting: false,
      available_version: '?'
    }
  },
  methods: {
    searchUpdate() {
      this.waiting = true
      this.$store.dispatch('SEARCH_UPDATE').then(res => {
        this.available_version = res.data.remote_local_versions[0]
        this.waiting = false
      })
    }
  },
  computed: {
    current_version() { return this.$store.state.config.known_version },
    has_update() {
      const available_version = this.available_version.split('.')
      const current_version = this.current_version.split('.')

      if (current_version.length < 3 && available_version.length == 3)
        return true

      let has_update = false
      for (let i = 0; i < 3; i++) {
        if (Number(current_version[i]) < Number(available_version[i])) {
          has_update = true
          break
        }
      }

      return has_update
    }
  }
}
</script>
