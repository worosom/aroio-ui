export default {
  audio_outputs: [
    {
      value: 'vol-plug',
      label: 'Direct',
      type: 'radio'
    },
    {
      value: 'vol-plug-ms',
      label: 'Direct Cleaner',
      type: 'radio'
    },
    {
      value: 'jack',
      label: 'Bus',
      type: 'checkbox',
      selected: []
    },
    {
      value: 'jack-ms',
      label: 'Bus Cleaner',
      type: 'checkbox',
      selected: []
    },
    {
      value: 'jack-bf',
      label: 'Bus Convolution',
      type: 'checkbox',
      selected: []
    },
    {
      value: 'jack-bfms',
      label: 'Bus Convolution Cleaner',
      type: 'checkbox',
      selected: []
    }
  ],
  audio_inputs: [
    {
      value: 'squeezelite',
      label: 'LMS',
    },
    {
      value: 'gmediarender',
      label: 'UPnP',
    },
    {
      value: 'shairportsync',
      label: 'AirPlay',
    },
    {
      value: 'bluealsaaplay',
      label: 'Bluetooth',
    },
    {
      value: 'input',
      label: 'LineIn'
    },
    {
      value: 'netjack',
      label: 'NetJack Master'
    }
  ]
}
