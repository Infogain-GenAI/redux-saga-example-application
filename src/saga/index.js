import {delay} from 'redux-saga';
import {take,all,fork,put,call} from 'redux-saga/effects';
import fetchSmart from '../fetch';
function * watchUsername(){
  while(true){
    let action= yield take('CHANGE_USERNAME');
    yield put({type:'change_username',value:action.value});
  }
}
function * watchPassword(){
  while(true){
    const action=yield take('CHANGE_PASSWORD');
    yield put({type:'change_password',value:action.value});
  }
}
function * getList(){
  try {
   yield delay(3000);
   const res = yield call(fetchSmart,'/list',{
     method:'POST',
     body:JSON.stringify({})
   });
   yield put({type:'update_list',list:res.data.activityList});
 } catch(error) {
   yield put({type:'update_list_error', error});
 }
}
function * watchIsLogin(){
  while(true){
    const action1=yield take('TO_LOGIN_IN');
    const res=yield call(fetchSmart,'/login',{
      method:'POST',
      body:JSON.stringify({
        username:action1.username,
        password:action1.password
      })
    });
    if(res.status===10000){
      yield put({type:'to_login_in'});
      yield fork(getList);
    }
    const action2=yield take('TO_LOGIN_OUT');
    yield put({type:'to_login_out'});
  }
}
export default function * rootSaga() {
  yield all([
    fork(watchIsLogin),
    fork(watchUsername),
    fork(watchPassword)
  ]);
}
