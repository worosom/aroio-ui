<template>
  <b-container>
    <h1 class="mt-2">{{ $t('SYSTEM.title') }}</h1>
    <b-row
      >
      <b-col
        lg="6"
        >
        <b-card
          class="mb-4"
          >
          <input-field
            section="SYSTEM"
            item="platform"
            type="options"
            :options="platforms"
            ></input-field>

          <input-field
            section="SYSTEM"
            item="userpasswd"
            type="password"
            ></input-field>

          <input-field
            section="SYSTEM"
            item="btkey"
            type="password"
            ></input-field>

          <input-field
            section="SYSTEM"
            item="advanced"
            type="checkbox"
            ></input-field>
        </b-card>
      </b-col>
      <b-col
        lg="6"
        >
        <update/>
      </b-col>
    </b-row>
    <b-row
      >
      <b-col
        >
        <logs/>
      </b-col>
    </b-row>
  </b-container>
</template>
<style scoped>
</style>
<script>
import InputField from '~/components/InputField';
import Update from '~/components/Update';
import Logs from '~/components/Logs';

export default {
  components: { InputField, Update, Logs },
  computed: {
    advanced() {
      return this.$store.state.config.advanced === "ON"
    }
  },
  data() {
    return {
      platforms: ['AroioEX','AroioSU','AroioLT','RaspberryPi']
    }
  }
};
</script>
