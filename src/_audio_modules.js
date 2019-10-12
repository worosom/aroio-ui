export default {
  audio_outputs: [
    {
      name: 'raw_player',
      value: 'vol-plug',
      label: 'Direct',
      type: 'radio'
    },
    {
      name: 'dmix',
      value: 'vol-plug-dmix',
      label: 'DMix',
      type: 'checkbox',
    },
    {
      name: 'jack',
      value: 'vol-jack',
      label: 'Jack',
      type: 'checkbox',
      selected: []
    },
    {
      name: 'jackbf',
      value: 'vol-jack-bf',
      label: 'Convolution',
      type: 'checkbox',
      selected: []
    },
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
      value: 'linein',
      label: 'LineIn'
    },
    {
      value: 'netjack',
      label: 'NetJack Master'
    }
  ]
}
