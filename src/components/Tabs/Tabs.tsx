import React, { Component } from 'react';

import classes from './Tabs.module.css';
import Tab from './Tab/Tab';


interface ITabsProps {
	tabClicked: any;
	tabClosed: any;
	activeChatId: string;
	tabs: any;
}

class Tabs extends Component<ITabsProps> {

    tabClicked = (tabId) => {
        this.props.tabClicked(tabId);
    };

    tabClosed = (tabId) => {
        this.props.tabClosed(tabId);
    };

    render() {
        return (
            <ul className={classes.Tabs}>
                {this.props.tabs.map(tab => (
                    <Tab link="/"
                         tabId={tab._id}
                         key={tab._id}
                         active={this.props.activeChatId === tab._id}
                         isLast={this.props.tabs.length === 1}
                         tabClicked={this.tabClicked}
                         tabClosed={this.tabClosed}>{tab.name}</Tab>
                ))}
            </ul>
        );
    };
}

export default Tabs;
