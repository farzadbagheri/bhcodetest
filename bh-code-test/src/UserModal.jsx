import React, { Component } from 'react';
import './index.css';


type State = {
    data: Object;
    poster: string;
    content: string;
};

export default class UsersTab extends React.Component<Props, State> {
  state = {
      posts: this.props.posts,
      poster: '',
      content: '',   
  };


  updatePosts = () => {

    console.log("update posts");
    const data = {content: this.state.content,
                      poster: this.state.poster};
    var url = `https://bh-interview.now.sh/users/${this.props.id}/posts`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    this.props.posts.push(data);
    this.setState({
      posts: this.props.posts,
      content: '',
      poster: '',
    });
  }

  clearPosts = () => {
    const url = 'https://bh-interview.now.sh/users/posts/clear';
            const fetch_url = `${url}`
            
            fetch(fetch_url, {
                method: 'GET'
            })
            .then(response => {
            if (!response.ok) { throw Error(response.statusText) }
                return response.json()  
            })
            .then(json => {
                console.log(json.data);
                this.setState({
                  users: json.data,
                })
            }).catch( err => {
            
    })
  }

  handleInputChange = (event) => {
    console.log("inputchange");
    const target = event.target;
    const name = target.name;
    console.log(target.value);
    this.setState({
      [name]: target.value
    });
    console.log("here")
  }


  render() {
      const listPosts = this.state.posts.map((d) => <li key={d.poster}><h3>{d.poster}</h3><p>{d.content}</p></li>);
      return(
          <div>
              <h1>{this.props.name}</h1>
              <img src={this.props.avatar}/>
              <h2>Posts</h2>
              <ul>{listPosts}</ul>
              <h3>Add a post</h3>
              <input name="poster" onChange={this.handleInputChange} value={this.state.poster}/>
              <textarea name="content" onChange={this.handleInputChange} value={this.state.content}/>
              <button onClick={() => this.updatePosts()}>Submit</button>
          </div>
      )
  }
}
