import { useState } from 'react';
import './App.css';
import { User } from './models/User';
import Menu from './components/Menu';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import Register from './views/Register';
import Login from './views/Login';

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div className="App">
      {user ? (
        <>
          <Menu />
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component user={user} />}
              />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
