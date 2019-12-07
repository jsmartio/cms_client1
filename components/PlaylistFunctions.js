import axios from 'axios'

export const getPlaylist = () => {
    return axios
        .post('/server/getplaylist')
        .then(res => {
        return res.data
    })
    .catch(err => {
        console.log("ClientSide Error @ UserFunctions > getPlaylist " + err)
        return '++Error Loc 06'
    })
}
