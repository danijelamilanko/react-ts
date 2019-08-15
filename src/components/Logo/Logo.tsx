import React from 'react';

import chatLogo from '../../assets/images/chat.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={chatLogo} alt="Chat"/>
    </div>
);

export default logo;
