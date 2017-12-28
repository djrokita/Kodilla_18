import React from 'react';
import styles from './UsersList.css';

const UserList = props => (
	<div className={styles.Users}>
		<div className={styles.UsersOnline}>
			{props.users.lenght} people online
		</div>
		<ul className={styles.UserList}>
			{
				props.users.map((user) => {
					return (
						<li id={user.id} className={styles.UserItem}>
							{user.name}
						</li>
					);
				})
			}
		</ul>
	</div>
);

export default UserList;