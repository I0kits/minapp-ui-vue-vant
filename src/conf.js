export default {
  corpId: process.env.VUE_APP_CORP_ID,
  agentId: process.env.VUE_APP_VUE_APP_AGENT_ID,
  apiBaseUrl: process.env.VUE_APP_API_BASE_URL,

  disableDingTalk: false,
  debug: process.env.NODE_ENV === 'development',
};
