<style lang="scss" scoped>
.logs {
  background: #111;
  height: 50vh;
  overflow-y: scroll;
  color: #FAFAFA;
  white-space: pre-wrap;
  line-height: 0;
  margin: 0;
  &_wrap {
    padding: 12px;
    background-color: #111;
  }
  &__line {
    position: relative;
    &::selection {
      background: transparent;
    }
    &--column {
      display: block;
      line-height: 1.5;
    }
    &--number {
      position: absolute;
      height: 100%;
      top: 0;
      text-align: right;
      border-right: solid 1px #555;
      user-select: none;
      padding-right: 2px;
      color: #AA5;
      &::before {
        content: attr(data-unselectable);
      }
    }
    &--line {
      display: block;
      padding-left: 2px;
      &::selection {
        background: #FAFAFA;
        color: #111;
      }
    }
  }
}
</style>
<template>
  <b-card
    no-body
    >
    <b-tabs
      v-model="tabIndex"
      card>
      <b-tab
        v-for="(item, key) in logs"
        :key="key"
        :title="$t(`SYSTEM.logs.${key}`)"
        >
        <b-btn-group>
          <b-btn
            @click="tabIndex = tabIndex"
            :disabled="waiting"
            variant="outline-primary"
            size="sm"
            >Reload</b-btn>
          <b-btn
            :disabled="waiting"
            :href="downloadLink"
            :download="`${key}.log`"
            variant="outline-primary"
            size="sm"
            >
            Download Log</b-btn>
        </b-btn-group>
      </b-tab>
    </b-tabs>
    <div class="logs_wrap">
      <pre class="logs"
           :style="`padding-left: ${gutterWidth + 2}px`"
      >
        <loading v-if="waiting"/>
        <div
          v-for="(line, _key) in log"
          :key="_key"
          class="logs__line"
          >
          <span class="logs__line--column logs__line--number"
                :data-unselectable="_key"
                :style="`width: ${gutterWidth}px; left: -${gutterWidth + 2}px`"
                />
          <span class="logs__line--column logs__line--line"
                v-html="line || '\n'"
                />
        </div>
      </pre>
    </div>
  </b-card>
</template>
<script>
import Loading from '../components/Loading'
import {CancelToken, isCancel} from 'axios'

const __logs = [
  'network',
  'kernel',
  'system',
  'jackd',
  'brutefir',
  'squeezelite',
  'alsa'
]

export default {
  components: { Loading },
  data() {
    Object.assign(this.$axios, {CancelToken, isCancel})
    const logs = {}
    for (let i = 0; i < __logs.length; i++) {
      logs[__logs[i]] = []
    }
    return {
      index: 0,
      waiting: true,
      logs,
      log: [],
    }
  },
  computed: {
    requestUrl() {
      return this.$store.state.requestUrl
    },
    tabIndex: {
      get() { return this.index },
      set(value) {
        if (this.waiting) {
          this.cancelSource.cancel('Operation canceled by the user.')
          this.waiting = false
        }
        this.index = value
        this.getLog(__logs[value]).then(log => {
          Object.assign(this, {
            log
          })
        })
      }
    },
    numLines() {
      return this.logs[__logs[this.index]].length
    },
    gutterWidth() {
      return 12 * String(this.numLines).length
    },
    downloadLink() {
      const log = this.log.join('\n')
      const url = URL.createObjectURL(new Blob([log], {type: 'text/plain'}))
      return url
    }
  },
  methods: {
    getLog(log) {
      this.waiting = true
      Object.assign(this, {
        log: []
      })
      this.cancelSource = this.$axios.CancelToken.source()
      
      return this.$axios.get(`${this.requestUrl}/logs/${log}`, {
          cancelToken: this.cancelSource.token
        })
        .catch(thrown => {
          if (this.$axios.isCancel(thrown)) {
            return
          }
        })
        .then(res => {
          if (typeof res == 'undefined') {
            return []
          }
          this.logs[log] = res.data[log].split('\n')
          this.waiting = false
          return this.logs[log]
        })
    }
  },
  mounted() {
    this.getLog(__logs[this.index]).then(log => {
      Object.assign(this, {
        log
      })
    })
  }
}
</script>
