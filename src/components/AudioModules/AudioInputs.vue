<style lang="scss">
.audiomodules__inputs__col {
  width: 100%;
  
  &.active {
    font-weight: bold;
  }
}
</style>
<template>
  <div>
    <b-form-radio-group
      v-if="item.type === 'radio'"
      :name="item.value"
      v-model="radioModel"
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
        :button-variant="radioModel == _item.value ? 'outline-primary' : 'outline-warning'"
        >
        {{ _item.label }}
      </b-form-radio>
    </b-form-radio-group>
    <b-form-checkbox-group
      v-if="item.type === 'checkbox'"
      v-model="checkboxModel"
      buttons
      stacked
      >
      <b-form-checkbox
        v-for="_item in audio_inputs"
        v-if="_item.value !== 'netjack' || item.value.indexOf('DMIX') < 0"
        :key="`${item.name}_${_item.value}`"
        class="audiomodules__inputs__col"
        :name="`${itemName}_${_item.value}`"
        :value="`${itemName}_${_item.value}`"
        unchecked-value="OFF"
        :button-variant="checkboxModel.indexOf(`${itemName}_${_item.value}`) >= 0 ? 'outline-primary' : 'outline-warning'"
        >
        {{ _item.label }}
      </b-form-checkbox>
    </b-form-checkbox-group>
  </div>
</template>
<script>
import audio_modules from '~/_audio_modules';

const config_map = {
  'vol-plug': 'raw_player',
  'vol-plugms': 'raw_playerms'
}

export default {
  props: ['item', 'active'],
  data() {
    return {
      ...audio_modules
    }
  },
  computed: {
    itemName() {
      return this.item.value.replace('-', '')
    },
    
    radioModel: {
      get() {
        return this.$store.state.config[config_map[this.item.value]]
      },
      set(value) {
        this.$store.commit('SET_VALUE', {
          section: 'AUDIO',
          key: config_map[this.item.value],
          value
        })
      }
    },
    checkboxModel: {
      get() {
        const fields = this.$store.state.config
        const selected = []

        for (let key in fields) {
          if (key.indexOf(this.itemName) === 0) {
            if (fields[key] === 'ON') {
              selected.push(key)
            }
          }
        }
        return selected
      },
      set(value) {
        const fields = this.$store.state.config;
        const selected = value;

        for (let key in fields) {
          if (key.indexOf(this.item.value.replace('-', '')) === 0) {
            this.$store.commit('SET_VALUE', {
              section: 'AUDIO',
              key,
              value: selected.indexOf(key) >= 0 ? 'ON' : 'OFF'
            })
            selected.forEach(sel => {
            })
          }
        }

      }
    }
    // ^ checkboxModel
  }
  // ^ computed
}
</script>
