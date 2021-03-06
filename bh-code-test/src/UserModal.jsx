import * as React from 'react';
import './index.css';

type State = {
    posts: Array[];
    content: string;
};

export default class UserModal extends React.Component<Props, State> {
  state = {
      posts: this.props.posts,
      content: '',   
  };

  updatePosts = (name) => {
    console.log("update posts");
    const data = {content: this.state.content,
                      poster: name};
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
    this.state.posts.push(data);
    this.setState({ content: '' });
  }

  handleInputChange = (event) => {
    const target = event.target;
    this.setState({
      content: target.value
    });
  }

  render() {
    const listPosts = this.state.posts.map((d) => <li key={d.poster}><p>{d.content}</p></li>);
    return(
      <div className='modal'>
        <div className='modal-content'>
          <img className='modal-img' src={this.props.image} alt={this.props.name}/>
          <h1 className='modal-header'>{this.props.name}</h1>
          <br />
          <h2>Comments</h2>
          {listPosts.length === 0 ? <h3><em>No comments yet</em></h3> 
                                  : <ul className="post-list">{listPosts}</ul>}
          <h3>Add a comment</h3>
          <textarea rows="5" cols="35" name="content" onChange={this.handleInputChange} value={this.state.content}/>
          <button className='submit' onClick={() => this.updatePosts(this.props.name)}>Submit</button>
        </div>
      </div>
    )
  }
}
