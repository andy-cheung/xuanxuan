import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DisplayLayer from './display-layer';
import HTML from '../utils/html-helper';
import Icon from './icon';
import timeSequence from '../utils/time-sequence';

const show = (message, props = {}, callback = null) => {
    let {
        type,
        content,
        autoHide,
        closeButton,
        actions,
        onAction,
        className,
        position,
    } = props;

    if(!props.id) {
        props.id = timeSequence();
    }

    if(closeButton === undefined) {
        closeButton = true;
    }

    if(!type) {
        type = 'info';
    }
    className = HTML.classes('messager layer', className || 'rounded', type, `position-${position}`);

    content = content ? <div>
        <h5>{message}</h5>
        {content}
    </div> : message;

    if(!actions) {
        actions = [];
    }
    if(closeButton) {
        actions.push({
            icon: 'close',
            click: () => {
                DisplayLayer.hide(props.id)
            }
        })
    }
    let footer = null;
    if(actions && actions.length) {
        const handleActionClick = (action, e) => {
            let actionResult = null;
            if(onAction) {
                actionResult = onAction(action, e);
            }
            if(action.click) {
                actionResult = action.click(action, e);
            }
            if(actionResult !== false) {
                DisplayLayer.hide(props.id);
            }
        };

        footer = <nav className="nav">
        {
            actions.map((action, actionIndex) => {
                return <a onClick={handleActionClick.bind(null, action)} key={actionIndex} title={action.label}>{action.icon ? <Icon name={action.icon}/> : action.label}</a>
            })
        }
        </nav>;
    }

    if(autoHide === undefined) {
        autoHide = true;
    }
    if(autoHide) {
        if(typeof autoHide !== 'number') {
            autoHide = 5000;
        }
        setTimeout(() => {
            DisplayLayer.hide(props.id);
        }, autoHide);
    }

    props = Object.assign({backdropClassName: 'transparent'}, props, {className, content, footer, closeButton, plugName: 'messager'});
    delete props.type;
    delete props.autoHide;
    delete props.closeButton;
    delete props.actions;
    delete props.position;
    delete props.onAction;

    return DisplayLayer.show(props, callback);
};

export default {
    show,
    hide: DisplayLayer.hide,
    remove: DisplayLayer.remove
};