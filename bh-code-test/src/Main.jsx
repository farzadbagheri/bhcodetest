import * as React from 'react';
import './index.css';
import UserModal from './UserModal';

type State = {
	users: Array[];
  modalActive: boolean,
  activeId: number,
};

export default class Main extends React.Component<State> {
    state = {
      users: [],
      modalActive: false,
      activeId: 0,       
    };

    componentDidMount() {
    	this.getAllUsers();
  	}

    showModal = (id: string) => {
      this.setState({
        modalActive: !this.state.modalActive,
        activeId: id,
      })
    };

    hideModal = (e) => {
      if(this.state.modalActive && e.target.classList.contains('modal')) {
        this.setState({
          modalActive: !this.state.modalActive,
        })
      }
    }

    getAllUsers() {
      const url = 'https://bh-interview.now.sh/';
      const fetch_url = `${url}users`  
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

    render() {
      const listUsers = this.state.users.map((d) => 
        <div className='flex-item' key={d.name}>
          <img className='user-img' onClick={() => this.showModal(d.id)} src={d.image} alt={d.name}/>
          <h1 className='user-name'>{d.name}</h1>
          {this.state.modalActive && this.state.activeId === d.id && (<UserModal 
            id={d.id} 
            name={d.name} 
            image={d.image}
            posts={d.posts}
          />)}
        </div>
      );
      return (
        <div>
          <h1 className='header'>Big Humans</h1>
          <div className="flex-container" onClick={(e) => this.hideModal(e)}>{listUsers}</div>
        </div> 
      )
    }
}

