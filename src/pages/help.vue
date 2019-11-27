<template>
  <b-container>
    <h1 class="mt-2">{{ $t('CREDITS.title') }}</h1>
    <b-card
      v-for="(segment, key) in $t('CREDITS.segments')"
      :key="key"
      :title="segment.title"
      class="mb-4"
      >
      <div v-if="segment.content && segment.content.length"
        v-html="$renderContent(segment.content)">
      </div>
    </b-card>
  </b-container>
</template>
