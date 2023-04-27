import { baseService } from "../services/baseService";

const endpoint = `${process.env.REACT_APP_API}/images/search?`

export const getCatById = (id, config = {}) => {
    return baseService.get(endpoint, `breed_ids=${id}`, { headers: { "x-api-key": process.env.REACT_APP_API_KEY, "Content-Type": "application/json" }, ...config })
}
