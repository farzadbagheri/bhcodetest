import * as React from 'react';
import ReactTable from 'react-table';
import './index.css';
import UserView from './UserView';

type State = {
	users: User[];
};

export default class UsersTab extends React.Component<Props, State> {
    state = {
        	users: [],   
       
    };

    componentDidMount() {
    	this.getAllUsers()
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
    	const columns = [
      {
        accessor: d => d,
        Cell: row => (
          <div>
            <img src={row.value.image} />
            <a>{row.value.name} </a>
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

