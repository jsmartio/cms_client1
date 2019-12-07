import React, { Component } from 'react'
import { getPlaylist } from './PlaylistFunctions'
import { sizeSideBar} from './_sharedFunctions'

class Playlists extends Component {

  componentDidMount() {
    document.body.style.background = "#ffffff";
    window.addEventListener('resize', sizeSideBar);
    sizeSideBar();
    getPlaylist().then(res => {
      console.log('res = ' + JSON.stringify(res));
    })
  }
  
  render() {
    return (
      <div id="main" className="outlines">Playlist</div>
    )
  }
}
export default Playlists