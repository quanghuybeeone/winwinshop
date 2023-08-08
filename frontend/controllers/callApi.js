export default function callApi(endpoint, method = 'GET', body){
    return axios({
        method: method,
        url: `http://localhost:6888/api/${endpoint}`,
        data: body
    })
    .catch(err=> console.log(err))
}

