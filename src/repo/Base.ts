import axios from "axios";

const baseDomainEnv = "https://www.gov.uk/";
const baseURL = `${baseDomainEnv}`;

export default axios.create({
  baseURL,
});
