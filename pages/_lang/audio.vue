<style>
</style>
<template>
  <b-container>
    <h1 class="mt-2">{{ $t('AUDIO.title') }}</h1>
    <b-row
      >
      <b-col
        lg="9"
        >
        <audio-modules
          class="mb-4"
          ></audio-modules>
        <b-card
            :title="$t('AUDIO.GLOBAL_SETTINGS')"
            class="mb-4"
          >
          <b-container>
            <input-field
              section="AUDIO"
              item="playername"
              type="text"
            ></input-field>

            <input-field
              section="AUDIO"
              item="volume_start"
              type="volume"
            ></input-field>

            <input-field
              section="AUDIO"
              item="soundcard"
              type="options"
              :options="soundcards"
            ></input-field>

            <input-field
              section="AUDIO"
              item="rate"
              type="options"
              :options="supported_samplerates"
            ></input-field>

          </b-container>
        </b-card>

        <b-card
            :title="$t('AUDIO.LMS_SETTINGS')"
            class="mb-4"
          >
          <b-container>

            <input-field
              section="AUDIO"
              item="lms_servername"
              type="text"
            ></input-field>

            <input-field
              section="AUDIO"
              item="lms_user"
              type="text"
            ></input-field>

            <input-field
              section="AUDIO"
              item="lms_pwd"
              type="text"
            ></input-field>

            <input-field
              section="AUDIO"
              item="lms_serverport"
              type="text"
            ></input-field>

            <b-row
              class="mt-2">
              <b-col>
                <b-button
                  block
                  disabled
                  variant="primary"
                  :href="'http://'+$store.state.config['LMS_SERVERNAME']">
                  LMS Webinterface
                </b-button>
              </b-col>
            </b-row>

          </b-container>
        </b-card>

        <b-card
            :title="$t('AUDIO.ADVANCED_SETTINGS')"
            v-if="$store.state.config.advanced === 'ON'"
            class="mb-4"
          >
          <b-container>
            <input-field
              section="AUDIO"
              item="jackbuffer"
              type="buffersize"
              ></input-field>

            <input-field
              section="AUDIO"
              item="jackperiod"
              type="periodsize"
              ></input-field>

            <input-field
              section="AUDIO"
              item="squeeze_alsabuffer"
              type="buffersize"
              ></input-field>

            <input-field
              section="AUDIO"
              item="squeeze_alsaperiod"
              type="periodsize"
              ></input-field>

            <input-field
              section="AUDIO"
              item="squeeze_intbuffer"
              type="buffersize"
              ></input-field>

            <input-field
              section="AUDIO"
              item="squeeze_outbuffer"
              type="buffersize"
              ></input-field>

            <input-field
              section="AUDIO"
              item="sprate"
              type="buffersize"
              ></input-field>

            <input-field
              section="AUDIO"
              item="resampling"
              type="quality"
              ></input-field>
          </b-container>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import AudioModules from '~/components/AudioModules';
import InputField from '~/components/InputField';
import soundcards from '~/_soundcards.js';
export default {
  components: { AudioModules, InputField },
  data() {
    return {
      soundcards
    }
  },
  computed: {
    selected_soundcard: {
      get() {
        return this.$store.state.config.soundcard
      },
      set(value) {
        if (!typeof(value) === 'undefined') {
          this.$store.commit('SET_VALUE', {
            section: 'AUDIO',
            key: 'soundcard',
            value: value.value
          })
        }
      }
    },
    volume_start: {
      get() {
        return this.$store.state.config.volume_start
      },
      set(value) {
        this.$store.commit('SET_VALUE', {
          section: 'AUDIO',
          key: 'VOLUME_START',
          value
        })
      }
    },
    supported_samplerates: {
      get() {
        const selected = this.selected_soundcard;
        const condition = card => card.value === selected;
        const card = soundcards.filter(condition)
        return card[0].samplerates
      }
    }
  }
};
</script>
