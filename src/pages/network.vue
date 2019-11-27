<template>
  <b-container>
    <h1 class="mt-2">{{ $t('NETWORK.title')  }}</h1>
    <b-row
      >
      <b-col
        lg="9"
        >
        <input-field
          section="NETWORK"
          item="hostname"
          type="text"
          ></input-field>
        <b-card
          class="mb-4"
          :title="$t('NETWORK.lan_settings')"
          >

          <input-field
            section="NETWORK"
            item="lan_dhcp"
            type="checkbox"
            ></input-field>

          <input-field
            :disabled="!lan_static"
            section="NETWORK"
            item="lan_ipv4addr"
            type="ipv4"
            :model="lan_ipv4addr"
            ></input-field>

          <input-field
            :disabled="!lan_static"
            section="NETWORK"
            item="lan_ipv6addr"
            type="ipv6"
            :model="lan_ipv6addr"
            ></input-field>

          <input-field
            :disabled="!lan_static"
            section="NETWORK"
            item="lan_netmask"
            type="ipv4"
            :model="lan_netmask"
            ></input-field>

          <input-field
            :disabled="!lan_static"
            section="NETWORK"
            item="lan_gateway"
            type="ipv4"
            :model="lan_gateway"
            ></input-field>

          <input-field
            :disabled="!lan_static"
            section="NETWORK"
            item="lan_dnsserv"
            type="ipv4"
            ></input-field>
        </b-card>
        <b-card
          class="mb-4"
          :title="$t('NETWORK.wlan_settings')"
          v-if="has_wlan"
          >
          <wlan>
          </wlan>
          <input-field
            section="NETWORK"
            item="wlan_dhcp"
            type="checkbox"
            ></input-field>

          <input-field
            :disabled="!wlan_static"
            section="NETWORK"
            item="wlan_ipv4addr"
            type="ipv4"
            ></input-field>

          <input-field
            :disabled="!wlan_static"
            section="NETWORK"
            item="wlan_ipv6addr"
            type="ipv6"
            ></input-field>

          <input-field
            :disabled="!wlan_static"
            section="NETWORK"
            item="wlan_netmask"
            type="ipv4"
            ></input-field>

          <input-field
            :disabled="!wlan_static"
            section="NETWORK"
            item="wlan_gateway"
            type="ipv4"
            ></input-field>

          <input-field
            :disabled="!wlan_static"
            section="NETWORK"
            item="wlan_dnsserv"
            type="ipv4"
            ></input-field>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import InputField from '~/components/InputField';
import wlan from '~/components/Network/Wlan';

export default {
  components: { InputField, wlan },
  computed: {
    has_wlan() {
      return this.$store.state.system.network.has_wlan
    },
    lan_static() {
      return this.$store.state.config.lan_dhcp !== 'ON';
    },
    wlan_static() {
      return this.$store.state.config.wlan_dhcp !== 'ON';
    },
    lan_ipv4addr: {
      get() { return this.$store.state.system.network.lan_ipv4addr },
      set(val) {}
    },
    lan_ipv6addr: {
      get() { return this.$store.state.system.network.lan_ipv6addr },
      set(val) {}
    },
    lan_netmask: {
      get() { return this.$store.state.system.network.netmask_eth },
      set(val) {}
    },
    lan_gateway: {
      get() { return '10.0.1.1' },
      set(val) {}
    },
    wlan_ipv4addr: {
      get() { return this.$store.state.system.network.ipv4addr_wlan },
      set(val) {}
    },
    wlan_ipv6addr: {
      get() { return this.$store.state.system.network.ipv6addr_wlan },
      set(val) {}
    },
    wlan_netmask: {
      get() { return this.$store.state.system.network.netmask_wlan },
      set(val) {}
    }
  }
};
</script>
