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
        <b-form-input v-model='a'
                      :name="`${item}_a`"
                      type="text"
                      :id="`${item}_a`"
                      :disabled="disabled"
                      ></b-form-input>
        :
        <b-form-input v-model='b'
                      :name="`${item}_b`"
                      type="text"
                      :id="`${item}_b`"
                      :disabled="disabled"
                      ></b-form-input>
        :
        <b-form-input v-model='c'
                      :name="`${item}_c`"
                      type="text"
                      :id="`${item}_c`"
                      :disabled="disabled"
                      ></b-form-input>
        :
        <b-form-input v-model='d'
                      :name="`${item}_d`"
                      type="text"
                      :id="`${item}_d`"
                      :disabled="disabled"
                      ></b-form-input>
        :
        <b-form-input v-model='e'
                      :name="`${item}_e`"
                      type="text"
                      :id="`${item}_e`"
                      :disabled="disabled"
                      ></b-form-input>
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
    split_model() {
      if (typeof this.model == 'undefined') {
        return ''
      }
      return this.model.split(':')
    },
    a: {
      get() { return this.split_model[0] },
      set(val) { 
        this.model = `${val}:${this.b}:${this.c}:${this.d}:${this.e}:${this.f}:${this.g}:${this.h}`
      }
    },
    b: {
      get() { return this.split_model[1] },
      set(val) { 
        this.model = `${this.a}:${val}:${this.c}:${this.d}:${this.e}:${this.f}:${this.g}:${this.h}`
      }
    },
    c: {
      get() { return this.split_model[2] },
      set(val) { 
        this.model = `${this.a}:${this.b}:${val}:${this.d}:${this.e}:${this.f}:${this.g}:${this.h}`
      }
    },
    d: {
      get() { return this.split_model[3] },
      set(val) { 
        this.model = `${this.a}:${this.b}:${this.c}:${val}:${this.e}:${this.f}:${this.g}:${this.h}`
      }
    },
    e: {
      get() { return this.split_model[4] },
      set(val) { 
        this.model = `${this.a}:${this.b}:${this.c}:${this.d}:${val}:${this.f}:${this.g}:${this.h}`
      }
    },
    f: {
      get() { return this.split_model[5] },
      set(val) { 
        this.model = `${this.a}:${this.b}:${this.c}:${this.d}:${this.e}:${val}:${this.g}:${this.h}`
      }
    },
    g: {
      get() { return this.split_model[6] },
      set(val) { 
        this.model = `${this.a}:${this.b}:${this.c}:${this.d}:${this.e}:${this.f}:${val}:${this.h}`
      }
    },
    h: {
      get() { return this.split_model[7] },
      set(val) { 
        this.model = `${this.a}:${this.b}:${this.c}:${this.d}:${this.e}:${this.f}:${this.g}:${val}`
      }
    }
  }
}
</script>
