<style>
.audiomodules .btn-group,
.audiomodules .dropdown-toggle,
.audiomodules .btn,
.audiomodules__inputs__row,
.audiomodules .btn-group-vertical,
.audiomodules .dropdown-menu.show {
  width: 100%;
}

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

.output_select_button {
  font-weight: bold;
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
              variant="outline-primary"
              @shown="output_dropdown_selecting = true"
              @hidden="output_dropdown_selecting = false"
              >
              <template v-slot:button-content>
                <b>{{audio_output_label}}</b>
              </template>
              <b-dropdown-item-button
                v-for="(item, key) in audio_outputs"
                :key="key"
                @click="audio_output = item.value"
                style="text-align: center"
                >
                {{item.label}}
              </b-dropdown-item-button>
            </b-dropdown>
          </b-button-group>
      </b-form-row>
      <b-form-row class="mb-4 inputs">
        <div class="backdrop"></div>
        <audio-inputs
          v-for="item in audio_outputs"
          :item="item"
          :key="item.value"
          class="audiomodules__inputs__row"
          :active="audio_output == item.value"
          v-if="audio_output == item.value"
          ></audio-inputs>
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
    audio_output_label() {
      const out = this.audio_outputs.filter(item => {
        return this.audio_output == item.value
      });
      if (typeof out[0] == 'undefined') {
        return this.audio_output
      }
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
