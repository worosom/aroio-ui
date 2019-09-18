<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card
          class="mb-4"
          :title="$t('INDEX.STATUS.title')"
          >
          <b-row class="mb-2">
            <b-col>
              <p>Hostname: {{ $store.state.config.hostname }}</p>
              <p>14:43:25 up 1 day, 29 min,  load average: 1.00, 1.00, 1.00</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col
              v-for="(item, key) in interfaces"
              :key="key"
              >
              <b-card
                :header-bg-variant="item.link ? 'success' : 'warning'"
                :header-text-variant="item.link ? 'white' : 'black'"
                no-body
                class="mb-2"
                >
                <span slot="header">
                  {{ item.name }}
                </span>
                <b-list-group flush>
                  <b-list-group-item>
                    <b-row>
                      <b-col lg="3">MAC:</b-col>
                      <b-col>
                        {{ item.mac }}
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                  <b-list-group-item>
                    <b-row>
                    <b-col lg="3">IP:</b-col>
                    <b-col>
                      {{ item.addr }}
                    </b-col>
                    </b-row>
                  </b-list-group-item>
                  <b-list-group-item>
                    <b-row>
                    <b-col lg="3">Netmask:</b-col>
                    <b-col>
                      {{ item.mask }}
                    </b-col>
                    </b-row>
                  </b-list-group-item>
                </b-list-group>
              </b-card>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  computed: {
    interfaces() {
      return [
        {
          name: 'eth0',
          mac: this.$store.state.network.mac_addr_eth,
          addr: this.$store.state.network.ip_addr_eth,
          mask: this.$store.state.network.netmask_eth,
          link: true
        },
        {
          name: 'wlan0',
          mac: this.$store.state.network.mac_addr_wlan,
          addr: this.$store.state.network.ip_addr_wlan,
          mask: this.$store.state.network.netmask_wlan,
          link: false
        }
      ]
    }
  }
}
</script>
