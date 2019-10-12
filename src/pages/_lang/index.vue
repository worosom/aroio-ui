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
              <p>{{uptime}}</p>
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
    uptime() { return this.$store.state.system.uptime },
    interfaces() {
      return [
        {
          name: 'eth0',
          mac: this.$store.state.system.network.lan_macaddr,
          addr: this.$store.state.system.network.lan_ipaddr,
          mask: this.$store.state.system.network.lan_netmask,
          link: this.$store.state.system.network.lan_link
        },
        {
          name: 'wlan0',
          mac: this.$store.state.system.network.wlan_macaddr,
          addr: this.$store.state.system.network.wlan_ipaddr,
          mask: this.$store.state.system.network.wlan_netmask,
          link: this.$store.state.system.network.wlan_link
        }
      ]
    }
  }
}
</script>
