import './index.less';
import React, { Fragment } from 'react';
import ActivityList from '../../components/activityList';

export default LoginSuccess = (props) => {
  const { toLoginOut, list } = props;
  return (
    <Fragment>
      <div className="m-login-out">
        <button onClick={toLoginOut}>Login out</button>
      </div>
      <ActivityList list={list} />
    </Fragment>
  )
}
