import axios from 'axios';

export const apiService = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

export function serialize (obj) {
  const keys = Object.keys(obj)
  let data = []

  keys.forEach(key => {
    data.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
  })

  return data.join('&')
}

export const mixin = {
  methods: {
    notifySuccess (msg, title) {
      this.$bvToast.toast(msg, {
        title: title || 'Success',
        solid: true,
        variant: 'success'
      })
    },
    notifyError (msg, title) {
      this.$bvToast.toast(msg, {
        title: title || 'Error',
        solid: true,
        variant: 'danger'
      })
    },
    notifyInfo (msg, title) {
      this.$bvToast.toast(msg, {
        title: title || 'Info',
        solid: true,
        variant: 'info'
      })
    }
  }
};