<template>
  <b-row class="mb-2"
    v-b-tooltip.hover :title="$t(disabled ? '' : `${section}.${item}.help`)"
    >
    <b-col sm="4">
      <label :for="item">
        {{ $t(`${section}.${item}.label`) }}
      </label>
    </b-col>
    <b-col sm="8">
      <b-input-group
        >
        <b-form-input v-model="model"
                      :name="item"
                      type="text"
                      :id="item"
                      :disabled="disabled"
                      ></b-form-input>
      </b-input-group>
    </b-col>
  </b-row>
</template>
<script>
import _slug from '~/components/InputField/_slug'

export default {
  ..._slug
}
</script>
