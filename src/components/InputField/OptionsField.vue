<template>
  <b-row class="mb-2"
    v-b-tooltip.hover :title="$t(disabled ? '' : `${section}.${item}.help`)"
    >
    <b-col sm="6">
      <label :for="item">
        {{ $t(`${section}.${item}.label`) }}
      </label>
    </b-col>
    <b-col sm="6">
      <b-input-group
        >
        <b-form-select v-model="model"
                       :name="item"
                       :id="item"
                       :disabled="disabled"
                       >
                      <option
                        v-for="(_item, key) in options"
                        :value="optionValue(_item)"
                        :key="key"
                        >
                        {{ optionValue(_item) }}
                      </option>
        </b-form-select>
      </b-input-group>
    </b-col>
  </b-row>
</template>
<script>
import _slug from '~/components/InputField/_slug'

export default {
  ..._slug,
  props: [..._slug.props, 'options'],
  methods: {
    ..._slug.methods,
    optionValue(item) {
      if (item.hasOwnProperty('value'))
        return item.value;
      else
        return item;
    }
  }
}
</script>
