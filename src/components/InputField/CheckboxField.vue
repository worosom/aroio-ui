<template>
  <b-row class="mb-2"
    v-b-tooltip.hover :title="$t(disabled ? '' : `${section}.${item}.help`)"
    >
    <b-col cols="4">
      <label :for="item">
        {{ $t(`${section}.${item}.label`) }}
      </label>
    </b-col>
    <b-col cols="8">
      <b-input-group
        >
        <b-btn :pressed.sync="pressed"
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
      </b-input-group>
    </b-col>
  </b-row>
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
  }
}
</script>
