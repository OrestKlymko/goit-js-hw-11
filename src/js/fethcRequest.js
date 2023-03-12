import axios from 'axios';

export default  function Request(query,page){

const URL = `https://pixabay.com/api/?key=34338189-e9bdbbc7a13128854f573f779&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`

  return axios.get(URL).then(r => r.data.hits
).then(result => result.filter(item => item)
  ).catch(e=>console.log(e))
}

