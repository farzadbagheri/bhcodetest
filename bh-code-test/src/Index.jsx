import * React from 'react';
import ReactTable from 'react-table';
import './index.scss';
import UserView from './UserView';
import type User from 'Interfaces/User';

type State = {
	users: User[];
};

export default class UsersTab extends React.Component<Props, State> {
    state = {
        users: [],   
    }

    search() {
            const url = 'https://bh-interview.now.sh/';
    }
    render() {
        return (
            <div>     
            </div>    
        )
    }
}

export default App;