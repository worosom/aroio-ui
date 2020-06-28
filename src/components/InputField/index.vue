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
    <ip-v4-field
      v-if="type === 'ipv4'"
      :section="section"
      :item="item"
      :disabled="disabled"
      ></ip-v4-field>
    <ip-v6-field
      v-if="type === 'ipv6'"
      :section="section"
      :item="item"
      :disabled="disabled"
      ></ip-v6-field>
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
      :options="bufferSizes"
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
    <password-field
      v-if="type === 'password'"
      :section="section"
      :item="item"
      :disabled="disabled"
      ></password-field>
    <hr class="inputfield__divider--after" />
  </div>
</template>
<script>
import TextField from '~/components/InputField/TextField'
import IpV4Field from '~/components/InputField/IpV4Field'
import IpV6Field from '~/components/InputField/IpV6Field'
import VolumeField from '~/components/InputField/VolumeField'
import OptionsField from '~/components/InputField/OptionsField'
import CheckboxField from '~/components/InputField/CheckboxField'
import PasswordField from '~/components/InputField/PasswordField'

export default {
  props: [ 'section', 'item', 'type', 'options', 'disabled' ],
  components: {
    TextField,
    IpV4Field,
    IpV6Field,
    VolumeField,
    OptionsField,
    CheckboxField,
    PasswordField
  },
  computed: {
    bufferSizes() {
      let arr = [];
      for (let i = 16; i <= 65536; i+=i) {
        arr.push(i)
      }
      return arr
    }
  }
}
</script>
