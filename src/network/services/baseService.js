import axios from "axios";

export const baseService = {
    get: async (url, endpoint, configs) => {
        try {
            var response = await axios(url + endpoint, configs);
            return response;
        } catch (error) {
            if(error.message === "canceled" ) return;
            console.log(`baseService.get ${url + endpoint}\nerror: ${error}\nresponse ${response}`);
            // console.table({ "baseService.get": url + endpoint, "error": error, "response": response });
        }
    },
    post: async (url, endpoint, configs) => {
        try {
            var response = await axios.post(url + endpoint, { ...configs });
            return response;
        } catch (error) {
            if(error.message === "canceled" ) return;
            console.log(`baseService.get ${url + endpoint}\nerror: ${error}\nresponse ${response}`);
            // console.table({ "baseService.get": url + endpoint, "error": error, "response": response });
        }
    },
}