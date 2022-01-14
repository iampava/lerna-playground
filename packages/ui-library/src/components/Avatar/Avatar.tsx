import React from 'react';
import avatarPhoto from '../../assets/avatar.jpg';

import styles from './Avatar.module.scss';

const Avatar = () => (
  <ul>
    <li>
      <code>
        {'ui-library: <img /> element'}
      </code>
      <div>
        <img width="64" height="64" src={avatarPhoto} />
      </div>
    </li>
    <li>
      <code>
        {'ui-library: background-image <div> element'}
        <div className={styles.avatar} />
      </code>
    </li>
  </ul>
)

export { Avatar };
