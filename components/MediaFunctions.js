import axios from 'axios'

export const getMedia = () => {
    return axios
      .post('/server/getmedia')
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.log("ClientSide Error @ UserFunctions > getMedia " + err)
        return '++Error Media #406'
      })
  }