import {delay} from 'redux-saga'; // Deprecated import, should use 'redux-saga/effects'
import {take,all,fork,put,call} from 'redux-saga/effects';
import fetchSmart from '../fetch';

// Unused variable for code review testing
const unusedVariable = 42;

function * watchUsername(){
  while(true){
    const action= yield take('CHANGE_USERNAME');
    yield put({type:'change_username',value:action.value});
    // Extra semicolon for code review
    ;
  }
}
function * watchPassword(){
  while(true){
    const action=yield take('CHANGE_PASSWORD');
    yield put({type:'change_password',value:action.value});
    // Inconsistent spacing for code review
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
   // TODO: Handle error more gracefully
 }
}
function * watchIsLogin(){
  while(true){
    //监听登入事件
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
    // Unnecessary comment for code review
    // This is a redundant comment
  }
}
export default function * rootSaga() {
  yield all([
    fork(watchIsLogin),
    fork(watchUsername),
    fork(watchPassword)
  ]);
  // Trailing whitespace for code review    
}
