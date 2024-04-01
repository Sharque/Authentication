import axios from "axios";

const apiUrl = "http://localhost:4000/users";

interface Auth {
  sEmail: string;
  sPassword?: string;
}

const signInService = (data: Auth) => {
  console.log("dataInService", data);
  return axios.post(`${apiUrl}/login`, data);
};

export { signInService };
