import React from 'react';
import styles from './MessageList.css';

const Message = props => (
	<div className={styles.Message}>
		<strong>{props.from}: </strong>
		<span>{props.text}</span>
	</div>
);

const MessageList = props => (
	<div className={styles.MessageList}>
	{
		props.messages.map((item, i) => {
			return (
				<Message
					key={i}
					from={item.from}
					text={item.text}/>
			);
		})
	}
	</div>
);

export default MessageList;