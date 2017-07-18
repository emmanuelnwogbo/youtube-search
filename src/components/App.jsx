import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './Search_bar'
import VideoList from './video_list'
import VideoDetail from './video_detail'

const API_KEY = 'AIzaSyB1473lQo617lGmMcLgzn7UemW9b88M9AA';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
      creator: 'nerdyemmanuel@gmail.com'
    };

    this.videoSearch('dawn of justice')
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ videos, selectedVideo: videos[0] });
    })
  }

  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term)
    }, 300)

    return(
      <div>
        <SearchBar onSearchTermReplace={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}
        />
        <div>contact: {this.state.creator}</div>
      </div>
    )
  }
}

export default App;
