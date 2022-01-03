const developHost = '127.0.0.1:8080';
const productionHost = '127.0.0.1:8080';
const isProduction = window.location.host.includes(productionHost)
const isDevelopment = window.location.host.includes(developHost)

const host = developHost;

const BASE_URL = `http://${host}`
const API_HOST = `${BASE_URL}/api`
const ROOT_API_URL = `https://api.${host}/api`
const ROOT_URL = `https://api.${host}`

export default {
  BASE_URL,
  API_HOST,
  ROOT_URL,
  ROOT_API_URL,
};
