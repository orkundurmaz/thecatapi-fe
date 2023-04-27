import { baseService } from "../services/baseService";

const endpoint = `${process.env.REACT_APP_API}/breeds`

export const getBreeds = (limit = "", page = "", config = {}) => {
    return baseService.get(endpoint, `?limit=${limit}&page=${page}`, config);
}
export const getBreedByID = (id, config = {}) => {
    return baseService.get(endpoint, `/${id}`, config)
}
