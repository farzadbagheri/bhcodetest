import * as React from 'react';
import ReactTable from 'react-table';
import './index.css';
import UserModal from './UserModal';

type State = {
	users: User[];
    modalActive: boolean,
    activeId: number,
};

export default class UsersTab extends React.Component<State> {
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
    	const columns = [
      {
        accessor: d => d,
        Cell: row => (
          <div>
            <a src="/user"> <img onClick={() => this.showModal(row.value.id)} src={row.value.image}/> </a>
            {this.state.modalActive && this.state.activeId === row.value.id && (<UserModal 
              id={row.value.id} 
            	name={row.value.name} 
            	image={row.value.image}
            	posts={row.value.posts}
            />)}
          </div>
        ),
        Header: 'User',
        id: 'name',
        minWidth: 250,
      },
     ];
        return (
        	<ReactTable data={this.state.users} columns={columns} />   
        )
    }
}

