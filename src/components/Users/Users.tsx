import React, { Component } from 'react';

import classes from './Users.module.css';
import userImg from '../../assets/images/users/user.jpg';

interface IUsersProps {
	users: any;
}

class Users extends Component<IUsersProps> {
    render() {
        return (
            <div className={classes.Users}>
                {this.props.users.map(user => (
                    <div key={user._id}>
                        <img src={userImg} alt=""/>
                        <span>{user.firstName}</span>
                    </div>
                ))}
            </div>
        );
    }
}

export default Users;
