import React from 'react';

import classes from './Message.module.css';
import user2Img from '../../../assets/images/users/user2.jpg';
import userImg from '../../../assets/images/users/user.jpg';


const message = (props) => {
    let userClasses = [classes.Item];
    let image = userImg;
    if (props.userName === localStorage.getItem("userName")) {
        userClasses = [classes.Item, classes.In];
        image = user2Img;
    }
    return (
        <div className={classes.MessagesImg}>
            <div className={userClasses.join(' ')}>
                <div className={classes.Image}>
                    <img src={image} alt={props.message.createdBy.firstName}/>
                </div>
                <div className={classes.Text}>
                    <div className={classes.Heading}>
                        <a href={props.link}>{props.message.createdBy.firstName}</a>
                        <span className={classes.Date}>{props.message.createdAt}</span>
                    </div>
                    {props.message.body}
                </div>
            </div>
        </div>
    );
};

export default message;
