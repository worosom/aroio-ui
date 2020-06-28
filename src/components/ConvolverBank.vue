<style lang="scss">

.convolver__bank * {
  box-sizing: border-box;
}
.convolver__bank__button {
  width: 100%;
  height: 100%;
  border-radius: 0.25rem 0 0 0.25rem;
}

.convolver__bank__button.btn-primary:not(:disabled):not(.disabled).active {
  background-color: #00aaaa;
  border: none;
}

.convolver__bank__body__name,
.convolver__bank__body__name .btn {
  width: 100%;
  border-radius: 0;
  border-left: none;
  border-right: none;
  text-align: left;
  .dropdown-menu.show {
    z-index: 10000;
  }
  .dropdown-item__wrap:last-child {
    .dropdown-divider {
      display: none;
    }
  }
}

.convolver__bank__body__comment {
  border-radius: 0;
  border-top: none;
  border-right: none;
  border-left: none;
}

.convolver__bank__params .form-control {
  border-radius: 0;
  text-align: right;
}

.convolver__bank__params__delay .form-control {
  border-top: none;
}

.convolver__bank__params .input-group-prepend .input-group-text {
  width: unset;
}

.convolver__bank__params .input-group-append .input-group-text {
  width: 50px;
}

.convolver__bank__params_att .input-group-append .input-group-text {
  border-radius: 0 0.25rem 0 0;
}

.convolver__bank__params__delay .input-group-append .input-group-text {
  border-radius: 0 0 0.25rem 0;
  border-top: none;
}
</style>
<template>
  <b-input-group
    class="mb-2 convolver__bank">
    <b-col
      cols="4"
      sm="3"
      lg="2"
      class="convolver__bank__prepend pr-0"
      >
      <b-btn :pressed.sync="selected"
             class="convolver__bank__button"
             :variant="selected ? 'primary' : 'outline-warning'"
             >
        Bank {{ Number(bank.id) + 1 }}</b-btn>
    </b-col>
    <b-col
      cols="4"
      sm="6"
      lg="8"
      class="convolver__bank__body pl-0 pr-0">
      <b-dropdown
        :text="name"
        :variant="selected ? 'primary' : 'outline-warning'"
        class="convolver__bank__body__name">
        <div class="dropdown-item__wrap"
             v-for="(option, key) in choices"
             :key="key"
          >
          <b-dropdown-item-btn
            @click="name = option"
            >{{option}}
          </b-dropdown-item-btn>
          <b-dropdown-divider/>
        </div>
      </b-dropdown>
      <b-form-input
        type="text"
        v-model="comment"
        :placeholder="$t('CONVOLVER.COMMENT')"
        class="convolver__bank__body__comment"></b-form-input>
    </b-col>
    <b-col
      cols="4"
      sm="3"
      lg="2"
      class="convolver__bank__params pl-0">
      <b-input-group
        class="convolver__bank__params_att"
        append="dB"
        prepend="-">
        <b-form-input
          type="number"
          min="0"
          v-model="att"></b-form-input>
      </b-input-group>
      <b-input-group
        class="convolver__bank__params__delay"
        append="ms">
        <b-form-input
          type="number"
          v-model="delay"></b-form-input>
      </b-input-group>
    </b-col>
  </b-input-group>
</template>
<script>
export default {
  props: [ 'bank', 'choices' ],
  computed: {
    name: {
      get() {
        return this.$store.state.config['coeff_name'+this.bank.id]
      },
      set(value) {
        this.$store.commit('SET_VALUE', {
          section: 'BRUTEFIR',
          key: 'coeff_name'+this.bank.id,
          value
        })
      }
    },
    comment: {
      get() {
        return this.$store.state.config['coeff_comment'+this.bank.id]
      },
      set(value) {
        this.$store.commit('SET_VALUE', {
          section: 'BRUTEFIR',
          key: 'coeff_comment'+this.bank.id,
          value
        })
      }
    },
    att: {
      get() {
        return this.$store.state.config['coeff_att'+this.bank.id]
      },
      set(value) {
        this.$store.commit('SET_VALUE', {
          section: 'BRUTEFIR',
          key: 'coeff_att'+this.bank.id,
          value
        })
      }
    },
    delay: {
      get() {
        return this.$store.state.config['coeff_delay'+this.bank.id]
      },
      set(value) {
        this.$store.commit('SET_VALUE', {
          section: 'BRUTEFIR',
          key: 'coeff_delay'+this.bank.id,
          value
        })
      }
    },
    selected: {
      get() {
        return this.$store.state.config.def_coeff === this.bank.id
      },
      set(value) {
        if (value)
          this.$store.commit('SET_VALUE', {
            section: 'BRUTEFIR',
            key: 'def_coeff',
            value: this.bank.id
          })
      }
    }
  }
}
</script>
