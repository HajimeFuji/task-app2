import { createStore } from 'vuex'
// Googleプロバイダーをimport
import { GoogleAuthProvider } from "firebase/auth";
// Google認証機能、サインアウトをimport
import { getAuth, signInWithRedirect, signOut } from "firebase/auth";
// firestoreをimport
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default createStore({
  state: {
    login_user: null,
    // sideNavの状態
    sideNav: false,
    // taskを入れる箱 {title: 'hoge', start: '00:00', end: ''}
    tasks: [],
    // itemを入れる箱
    items: []
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : '',
    // パラメーター(FormView.vue)から受け取ったidに一致するtaskオブジェクトを参照
    getAddressById: state => id => state.tasks.find( task => task.id === id),
    getitemAddressById: state => id => state.items.find( item => item.id === id)
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user
    },
    // アプリ側のログアウト
    deleteLoginUser(state) {
      state.login_user = null
    },
    // stateのsideNavの状態を切り替え
    toggleSideNav(state) {
      state.sideNav = !state.sideNav
    },
    addTask(state, { id, task }) {
      // taskオブジェクトにidを追加
      task.id = id
      // task.name = "H_Fujii" など可能
      state.tasks.push(task)
    },
    updateTask(state, { id, task }) {
      // tasksの中からパラメーターと一致するtaskオブジェクトのindexを取得
      const index = state.tasks.findIndex(task => task.id === id)
      state.tasks[index] = task
    },
    deleteTask(state, id) {
      const index = state.tasks.findIndex(task => task.id === id)
      // splice 削除する個数を指定
      state.tasks.splice(index, 1)
    },
    addItem(state, { id, item }) {
      // itemオブジェクトにidを追加
      item.id = id
      // item.name = "H_Fujii" など可能
      state.items.push(item)
    },
    updateItem(state, { id, item }) {
      // itemsの中からパラメーターと一致するitemオブジェクトのindexを取得
      const index = state.items.findIndex(item => item.id === id)
      state.items[index] = item
    },
    deleteItem(state, id) {
      const index = state.items.findIndex(item => item.id === id)
      // splice 削除する個数を指定
      state.items.splice(index, 1)
    },
  },
  // actionsに行ってから mutation に指示を出す
  actions: {
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
      // console.log("test");
    },
    // アプリ側のログアウト
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    login() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithRedirect(auth, provider);
    },
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        // ページをリロードする
        location.reload();
        // トップページへ遷移
        window.location.href = '/';
      }).catch((error) => {
        console.log(error);
      })
    },
    // toggleSideNavのクリックイベントがmapActionsで呼び出されたら実行
    // commitメソッドでmutationsのtoggleSideNavを発火
    toggleSideNav({ commit }) {
      commit('toggleSideNav')
    },

    async addTask({ getters, commit }, task) {
      // firestoreに接続 dbに省略定義
      const db = getFirestore();
      try {
        if(getters.uid) {
          // firestoreにデータを追加
          const docRef = await addDoc(collection(db, `users/${getters.uid}/tasks`), task);
          console.log("Document written with ID: ", docRef.id);
          commit('addTask', { id: docRef.id, task })
        } else {
          // ログインしていないときもtaskを追加できるように
          commit('addTask',{id: '', task})
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async fetchTasks({ getters, commit }) {
      const db = getFirestore();
      // firestoreからコレクションの中身を取得
      const querySnapshot = await getDocs(collection(db, `users/${getters.uid}/tasks`));
      querySnapshot.forEach((doc) => {
        // docの中身にidが格納されている。console.logで確認できる。
        commit('addTask', { id: doc.id, task: doc.data() })
        console.log(`${doc.id} => ${doc.data()}`);
      });
    },
    async updateTask({ getters, commit }, { id, task }) {
      const db = getFirestore();
      // 編集するドキュメントを参照
      const editTask = doc(db, `users/${getters.uid}/tasks`, id);
      console.log(editTask);
      await updateDoc(editTask, {
        title: task.title,
        start: task.start,
        end: task.end
      });
      commit('updateTask',{ id, task })
    },
    async deleteTask({ getters, commit }, id) {
      const db = getFirestore();
      await deleteDoc(doc(db, `users/${getters.uid}/tasks`, id));
      commit('deleteTask', id)
    },
    async addItem({ getters, commit }, item) {
      // firestoreに接続 dbに省略定義
      const db = getFirestore();
      try {
        if(getters.uid) {
          // firestoreにデータを追加
          const docRef = await addDoc(collection(db, `users/${getters.uid}/items`), item);
          console.log("Document written with ID: ", docRef.id);
          commit('addItem', { id: docRef.id, item })
        } else {
          // ログインしていないときもitemを追加できるように
          commit('addItem',{id: '', item})
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async fetchItems({ getters, commit }) {
      const db = getFirestore();
      // firestoreからコレクションの中身を取得
      const querySnapshot = await getDocs(collection(db, `users/${getters.uid}/items`));
      querySnapshot.forEach((doc) => {
        // docの中身にidが格納されている。console.logで確認できる。
        commit('addItem', { id: doc.id, item: doc.data() })
        console.log(`${doc.id} => ${doc.data()}`);
      });
    },
    async updateItem({ getters, commit }, { id, item }) {
      const db = getFirestore();
      // 編集するドキュメントを参照
      const editItem = doc(db, `users/${getters.uid}/items`, id);
      console.log(editItem);
      await updateDoc(editItem, {
        title: item.title,
        // start: task.start,
        // end: task.end
      });
      commit('updateItem',{ id, item })
    },
    async deleteItem({ getters, commit }, id) {
      const db = getFirestore();
      await deleteDoc(doc(db, `users/${getters.uid}/items`, id));
      commit('deleteItem', id)
    }
  },
  modules: {
  }
})
