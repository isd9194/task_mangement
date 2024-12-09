import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from "./UserComponent/Registration";
import MyLogin from "./UserComponent/Login";

import NotFound from './NotFound';
import AddTask from './Task/AddTask';
import Header from './GlobalComponent/Header';
import ViewTask from './Task/ViewTask';
import AdminDashboard from './GlobalComponent/Dashboard';
import CreateUser from './UserComponent/CreateUser';
import UserTask from './Task/UserTask';
import { Provider } from 'react-redux';
import redux_store, { persistor } from './Redux_store/store';
import { PersistGate } from 'redux-persist/integration/react';
import UserList from './UserComponent/UserList';



//================ Route session=====================
const App = () => {

    return (<Router>
        
        <Provider store={redux_store}>
            <PersistGate persistor={persistor}>
            <Header />
        <Routes>
             <Route path='/usertask' element={<UserTask />} />

             <Route path='/createuser' element={<CreateUser/>} />
            <Route path='/Admin_dashboard' element={<AdminDashboard />} />
            <Route path='/list' element={<ViewTask />} />
            <Route path='/userlist' element={<UserList />} />
            
            <Route path='/registration/login' element={<MyLogin />} />
            <Route path="/login" element={<MyLogin />} />

            <Route path='task' element={<AddTask />} />


            <Route path='/' element={<Registration />} />



            <Route path='*' element={<NotFound />} />
        </Routes>
        </PersistGate>
        </Provider>
    </Router>
    )
};
export default App;

//================ Route session=====================


