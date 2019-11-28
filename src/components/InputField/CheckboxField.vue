<style>
.checkbox-field {
  cursor: pointer;
}
</style>
<template>
  <b-form-row class="checkbox-field mb-2" @click.stop="toggle"
    v-b-tooltip.hover :title="$t(`${section}.${item}.help`)"
    >
    <b-col>
      <label>
        {{ $t(`${section}.${item}.label`) }}
      </label>
    </b-col>
    <b-col class="text-right">
      <b-btn :pressed="pressed"
             ref="switch"
             variant="primary"
             class="button_switch ml-auto"
             :name="item"
             :id="item"
             value="ON"
             unchecked-value="OFF"
             :disabled="disabled"
             autocomplete="off">
            <div class="handle"></div>
      </b-btn>
    </b-col>
  </b-form-row>
</template>
<script>
import _slug from '~/components/InputField/_slug'
import './switch.less'

export default {
  ..._slug,
  computed: {
    ..._slug.computed,
    pressed: {
      get() {
        return this.model === 'ON'
      },
      set(value) {
        return this.model = value ? 'ON' : 'OFF'
      }
    }
  },
  methods: {
    toggle() {
      this.pressed = !this.pressed
    }
  }
}
</script>
