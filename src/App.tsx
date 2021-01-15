import React,{ useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import styles from './App.module.css'
import {selectUser,login,logout} from './features/userSlice'
import {auth} from './features/firebase'
import Auth from './components/Auth'
import Feed from './components/Feed'


const App :React.FC = () =>  {
  //reduxのstoreの中のuserをローカル変数に代入することで、userを使えるようにする。
  const user = useSelector(selectUser);
  // useDispatchでdispatchを作っておく
  const dispatch = useDispatch();

  useEffect(() => {
    //onAuthStateChangedはfirebaseが提供する関数。userの変化を監視する。
    const unSub = auth.onAuthStateChanged((authUser)=>{
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photoUrl: authUser.photoURL,
          displayName: authUser.displayName,
        }
        ))
      } else {
        dispatch(logout());
      }
    });
    //Appcomponentがアンマウントされた時にやらなくていい処理
    return () => {
      unSub();
    }
  }, [dispatch])
  return (
    <>{
    user.uid ? (
      <div className={styles.App}>
      <Feed />
      </div>
    ) : (
      <Auth />
    )}
    </>
  ) 
}

export default App;
