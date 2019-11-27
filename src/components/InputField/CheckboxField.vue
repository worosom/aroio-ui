<template>
  <b-form-row class="mb-2"
    v-b-tooltip.hover :title="$t(`${section}.${item}.help`)"
    >
    <b-col>
      <label :for="item">
        {{ $t(`${section}.${item}.label`) }}
      </label>
    </b-col>
    <b-col class="text-right" :for="item">
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
  }
}
</script>
