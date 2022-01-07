const axios = require('axios').default;
export const requestGetApiData = async () => {
    try {
        let resp = await axios.get('http://myrestapionheroku.herokuapp.com/api/get-calories')
        return resp.data
    }
    catch (err) {
        console.log(err)
    }
}