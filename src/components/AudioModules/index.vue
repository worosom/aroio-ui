<style>
.audiomodules .btn-group,
.audiomodules .dropdown-toggle,
.audiomodules .btn,
.audiomodules__inputs__row,
.audiomodules .btn-group-vertical,
.audiomodules .dropdown-menu.show {
  width: 100%;
}

.audiomodules .cleaner,
.audiomodules .inputs {
  position: relative;
}

.audiomodules .backdrop {
  border-radius: 0.25rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #000;
  opacity: 0;
  transition: opacity 200ms ease-in-out;
}

.audiomodules.selecting .backdrop {
  opacity: .1;
  z-index: 2;
}
</style>
<template>
  <b-card
    :class="`audiomodules ${output_dropdown_selecting ? 'selecting' : ''}`"
    >
    <b-container>
      <b-form-row>
          <b-button-group
                          class="mb-2">
            <b-dropdown
              :text="audio_output_label"
              variant="outline-primary"
              class="output_select_button"
              @shown="output_dropdown_selecting = true"
              @hidden="output_dropdown_selecting = false"
              >
              <b-dropdown-item-button
                v-for="(item, key) in audio_outputs"
                :key="key"
                @click="audio_output = `${item.value}${cleaner ? '-ms' : ''}`"
                style="text-align: center"
                >
                {{ `${item.label}${cleaner ? ' MS' : ''}` }}
              </b-dropdown-item-button>
            </b-dropdown>
          </b-button-group>
      </b-form-row>
      <b-form-row class="mb-4 inputs">
        <div class="backdrop"></div>
        <audio-inputs
          v-for="item in audio_outputs_ms"
          :item="item"
          :key="item.value"
          class="audiomodules__inputs__row"
          :active="audio_output == item.value"
          v-if="audio_output == item.value"
          ></audio-inputs>
      </b-form-row>
      <b-form-row class="cleaner">
        <div class="backdrop"></div>
        <b-btn :pressed.sync="cleaner"
          :variant="cleaner ? 'outline-primary' : 'outline-warning'"
          >
          {{ $t('cleaner') }}
        </b-btn>
      </b-form-row>
    </b-container>
  </b-card>
</template>
<script>
import audio_modules from '~/_audio_modules';
import AudioInputs from '~/components/AudioModules/AudioInputs'

export default {
  components: { AudioInputs },
  data() {
    return {
      ...audio_modules,
      output_dropdown: false
    }
  },
  computed: {
    audio_outputs_ms() {
      return this.audio_outputs.map(item => {
        return {
          name: item.name + (this.cleaner ? 'ms' : ''),
          value: item.value + (this.cleaner ? 'ms' : ''),
          label: item.label + (this.cleaner ? '' : ''),
          type: item.type,
          selected: item.selected
        }
      })
    },
    audio_output: {
      get() {
        return this.$store.state.config.audio_output;
      },
      set(value) {
        this.$store.commit('SET_VALUE', {
          section: 'AUDIO',
          key: 'audio_output',
          value
        })
      }
    },
    cleaner: {
      get() {

        return this.$store.state.config.mscoding == 'ON'
      },
      set(value) {
        const out = this.audio_output;
        if (value && !(out.indexOf('ms') > 0))
          this.audio_output = this.audio_output + 'ms';
        else if (out.indexOf('ms') > 0) {
          this.audio_output = out.substring(0, out.length - 2);
        }
        value = value ? 'ON' : 'OFF';
        this.$store.commit('SET_VALUE', {
          section: 'AUDIO',
          key: 'mscoding',
          value
        });
      }
    },
    audio_output_label() {
      const out = this.audio_outputs_ms.filter(item => {
        return this.audio_output == item.value
      });
      return out[0].label
    },
    output_dropdown_selecting: {
      get() {
        return this.output_dropdown
      },
      set(value) {
        this.output_dropdown = value
      }
    }
  }
}
</script>
