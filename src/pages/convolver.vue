<template>
  <b-container>
    <h1 class="mt-2">{{ $t('CONVOLVER.title')  }}</h1>
    <b-row>
      <b-col
        cols="12"
        >
        <b-card
          class="mb-4"
          :title="$t('CONVOLVER.FILTER_CHOICES')"
          >
          <b-row>
            <convolver-bank
              v-for="(bank, key) in banks"
              :key="key"
              :bank="bank"
              :choices="choices"
              ></convolver-bank>
          </b-row>
        </b-card>
      </b-col>
      <b-col
        cols="12"
        >
        <b-card
          v-for="(segment, key) in $t('CONVOLVER.segments')"
          :key="key"
          :title="segment.title"
          class="mb-4"
          >
          <div v-if="segment.content && segment.content.length"
            v-html="$renderContent(segment.content)">
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<style scoped>
</style>
<script>
import ConvolverBank from '~/components/ConvolverBank'

export default {
  components: { ConvolverBank },
  computed: {
    banks() {
      const fields = this.$store.state.config;
      let banks = [];
      for (let key in fields) {
        if (key.split('_')[0] === 'coeff') {
          let field = key.split('_')[1];
          const bank_id = field.slice(-1);
          field = field.slice(0, -1);
          if (!banks[bank_id]) {
            banks[bank_id] = {
              id: bank_id,
              text: 'Bank ' + bank_id
            };
          }
          banks[bank_id][field] = fields[key];
        }
      }
      console.log(banks);
      return banks
    },
    choices() {
      return this.$store.state.convolver.choices
    }
  }
}
</script>
