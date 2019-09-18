<style scoped>
.audiomodules__inputs__col {
  width: 100%;
}
</style>
<template>
  <div>
    <b-form-radio-group
      v-if="item.type === 'radio'"
      :name="item.value"
      v-model="model1"
      buttons
      stacked
      :button-variant="active ? 'outline-primary' : 'outline-secondary'"
      >
      <b-form-radio
        :value="_item.value"
        v-for="(_item, _key) in audio_inputs"
        v-if="_item.value !== 'netjack'"
        :key="_key"
        class="audiomodules__inputs__col"
        :button-variant="model1 == _item.value ? 'outline-primary' : 'outline-warning'"
        >
        {{ _item.label }}
      </b-form-radio>
    </b-form-radio-group>
    <b-form-checkbox-group
      v-if="item.type === 'checkbox'"
      v-model="model2"
      buttons
      stacked
      >
      <b-form-checkbox
        v-for="_item in audio_inputs"
        v-if="_item.value !== 'netjack' || item.name.indexOf('DMIX') < 0"
        :key="`${item.name}_${_item.value}`"
        class="audiomodules__inputs__col"
        :name="`${item.name}_${_item.value}`"
        :value="`${item.name}_${_item.value}`"
        unchecked-value="OFF"
        :button-variant="model2.indexOf(`${item.name}_${_item.value.toUpperCase()}`) >= 0 ? 'outline-primary' : 'outline-warning'"
        >
        {{ _item.label }}
      </b-form-checkbox>
    </b-form-checkbox-group>
  </div>
</template>
<script>
import audio_modules from '~/_audio_modules';

export default {
  props: ['item', 'active'],
  data() {
    return {
      ...audio_modules
    }
  },
  computed: {
    model1: {
      get() {
        return this.$store.state.config[this.item.name]
      },
      set(value) {
        this.$store.commit('SET_VALUE', {
          section: 'AUDIO',
          key: this.item.name,
          value
        })
      }
    },
    model2: {
      get() {
        const fields = this.$store.state.config;
        const selected = [];
        for (let key in fields) {
          if (key.indexOf(this.item.name) === 0)
            if (fields[key] === 'ON')
              selected.push(key);
        }
        return selected
      },
      set(value) {
        const fields = this.$store.state.config;
        const selected = value;
        for (let key in fields) {
          if (key.indexOf(this.item.name) === 0) {
            this.$store.commit('SET_VALUE', {
              section: 'AUDIO',
              key,
              value: (value.indexOf(key) >= 0) ? 'ON' : 'OFF'
            })
          }
        }
      }
    }
  }
}
</script>
