import axios from "@/axios";

export function getProductsAll(params) {
    return axios.get('/products/all', {params});
}
export function removeProducs(params) {
    return axios.delete('/products/' + params);
}
export function addProducs(params) {
    return axios.post('/products/add', params);
}

export function datail(id) {
    return axios.get('/products/' + id);
}
export function edit(params) {
    return axios.put('/products/edit', params);
}