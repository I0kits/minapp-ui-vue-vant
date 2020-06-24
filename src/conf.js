export default {
  corpId: process.env.VUE_APP_CORP_ID,
  amapKey: process.env.VUE_APP_AMAP_KEY,
  apiBaseUrl: process.env.VUE_APP_API_BASE_URL,

  disableDingTalk: process.env.NODE_ENV === 'development',
};
