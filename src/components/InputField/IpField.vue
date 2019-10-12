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
        <b-form-input :model='a'
                      :name="item"
                      type="number"
                      :id="`${item}_a`"
                      :disabled="disabled"
                      ></b-form-input>
        .
        <b-form-input :model='b'
                      :name="item"
                      type="number"
                      :id="`${item}_b`"
                      :disabled="disabled"
                      ></b-form-input>
        .
        <b-form-input :model='c'
                      :name="item"
                      type="number"
                      :id="`${item}_c`"
                      :disabled="disabled"
                      ></b-form-input>
        .
        <b-form-input :model='d'
                      :name="item"
                      type="number"
                      :id="`${item}_d`"
                      :disabled="disabled"
                      ></b-form-input>
        <!--<b-form-input v-model="model"
                      :name="item"
                      type="text"
                      :id="item"
                      :disabled="disabled"
                      ></b-form-input>-->
      </b-input-group>
    </b-col>
  </b-row>
</template>
<script>
import _slug from '~/components/InputField/_slug'

export default {
  ..._slug,
  computed: {
    ..._slug.computed,
    split_model() { return this.model.split('.') },
    a: {
      get() { return this.split_model[0] }
    },
    b: {
      get() { return this.split_model[1] }
    },
    c: {
      get() { return this.split_model[2] }
    },
    d: {
      get() { return this.split_model[3] }
    }
  }
}
</script>
