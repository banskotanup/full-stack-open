import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(res => res.data)
        .catch(error => {
            console.log(error.response.data.error);
            throw new Error(error.response.data.error);
        });
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(res => res.data);
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request;
}

export default { getAll, create, update, remove };;