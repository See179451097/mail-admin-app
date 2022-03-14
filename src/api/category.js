import axios from "@/axios";

export default  function getCategoryall(params) {
    return axios.get('/category/all', {params});
}