<style>
.measure__button {
  min-width: 150px;
}

.measure__button--success,
.measure__button--success .btn {
  width: 100%;
}

.measure__progress {
  height: 100%;
  border-radius: 0 0.25rem 0.25rem 0;
}

.measure__progress .progress-bar {
  transition: none;
}
</style>
<template>
  <b-container>
    <h1 class="mt-2">{{ $t('MEASURE.title') }}</h1>

    <b-card
      v-for="(segment, key) in $t('MEASURE.segments')"
      :key="key"
      :title="segment.title"
      class="mb-4"
      >
      <div v-if="segment.content && segment.content.length"
        v-html="$renderContent(segment.content)">
      </div>
    </b-card>

    <b-card class="mb-2">
      <b-button-toolbar>
        <b-button-group style="width: 100%">
          <b-btn size="lg"
                 v-if="!measured"
                 :variant="measuring ? 'outline-danger' : 'outline-primary'"
                 :pressed.sync="measuring"
                 class="measure__button"
                 :disabled="waiting"
            >{{ $t('MEASURE' + (measuring ? '.abort' : '.title')) }}</b-btn>
          <b-dropdown
            dropup
            offset="50%"
            v-if="measured"
            :text="$t('MEASURE.success')"
            variant="success"
            size="lg"
            class="measure__button--success"
            >
            <b-dropdown-item-button
              @click="() => measuring = true"
              >{{ $t('MEASURE.restart') }}</b-dropdown-item-button>
          </b-dropdown>
          <div
            v-if="!measured"
            style="width: 100%">
            <b-progress :animated="!measured"
              :value="measure_progress"
              :variant="measured ? 'success' : 'danger'"
              :max="duration"
              class="measure__progress"
              ></b-progress>
          </div>
        </b-button-group>
      </b-button-toolbar>
    </b-card>

  </b-container>
</template>
<script>
import index from '~/pages/_lang/index';

export default {
  data() {
    return {
      startTime: 0,
      currentTime: 0,
      duration: 20,
      measured: false,
      measuring: false,
      measure_progress: 0,
      waiting: false
    }
  },
  watch: {
    measuring(value) {
      if (this.measuring) {
        const inc = () => {
          this.currentTime = new Date().getTime();
          if (this.measure_progress < this.duration) {
            this.measure_progress = (this.currentTime - this.startTime) / 1000;
            this.progress_animation = requestAnimationFrame(inc);
            return;
          } else {
            this.measuring = false;
            return;
          }
        }
        if (this.measured) {
          this.measured = false;
        }
        this.waiting = true;
        window.setTimeout(() => {
          this.startTime = new Date().getTime();
          this.currentTime = new Date().getTime();
          this.progress_animation = requestAnimationFrame(inc);
          this.waiting = false;
        }, 1000);
      }
      else {
        cancelAnimationFrame(this.progress_animation);
        if (this.measure_progress <= this.duration) {
          this.measure_progress = 0;
        } else {
          this.measure_progress = this.duration;
          this.measured = true;
        }
      }
    }
  }
}
</script>

