import './index.less';
import React, { Fragment } from 'react';
import Item from '../activityItem/index.js';

export default ActivityList = (props) => {
  let list = props.list;
  return (
    <Fragment>
      {
        list.map(function (item, index) {
          return <Item />
        })
      }
    </Fragment>
  )
}
