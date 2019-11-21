<style lang="less">
label {
  width: 100%;
  height: 100%;
}

.inputfield__wrap:not(:first-child) {
  .inputfield__divider--before {
    display: none;
  }
}
.inputfield__wrap:last-child {
  .inputfield__divider--after {
    display: none;
  }
}
</style>
<template class="inputfield">
  <div class="inputfield inputfield__wrap">
    <text-field
      v-if="type === 'text'"
      :section="section"
      :item="item"
      :disabled="disabled"
      ></text-field>
    <text-field
      v-if="type === 'ip'"
      :section="section"
      :item="item"
      :disabled="disabled"
      ></text-field>
    <volume-field
      v-if="type === 'volume'"
      :section="section"
      :item="item"
      :disabled="disabled"
      ></volume-field>
    <options-field
      v-if="type === 'options'"
      :section="section"
      :item="item"
      :options="options"
      :disabled="disabled"
      ></options-field>
    <options-field
      v-if="type === 'buffersize'"
      :section="section"
      :item="item"
      :options="getBufferSizes()"
      :disabled="disabled"
      ></options-field>
    <options-field
      v-if="type === 'periodsize'"
      :section="section"
      :item="item"
      :options="['2', '3', '4']"
      :disabled="disabled"
      ></options-field>
    <options-field
      v-if="type === 'quality'"
      :section="section"
      :item="item"
      :options="['speexrate_low', 'speexrate_medium', 'speexrate_high']"
      :disabled="disabled"
      ></options-field>
    <checkbox-field
      v-if="type === 'checkbox'"
      :section="section"
      :item="item"
      :disabled="disabled"
      ></checkbox-field>
    <hr class="inputfield__divider--after" />
  </div>
</template>
<script>
import TextField from '~/components/InputField/TextField'
import IpField from '~/components/InputField/IpField'
import VolumeField from '~/components/InputField/VolumeField'
import OptionsField from '~/components/InputField/OptionsField'
import CheckboxField from '~/components/InputField/CheckboxField'

export default {
  props: [ 'section', 'item', 'type', 'options', 'disabled' ],
  components: { TextField, IpField, VolumeField, OptionsField, CheckboxField },
  methods: {
    getBufferSizes() {
      let arr = [];
      for (let i = 16; i <= 65536; i+=i) {
        arr.push(i)
      }
      return arr
    }
  }
}
</script>
