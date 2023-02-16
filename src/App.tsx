import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import store from './redux/store';
import Alert from './widgets/Alert';
import axios from 'axios';
import { setAuthToken } from './repositories/SecurityRepository';

axios.defaults.baseURL = 'https://crypto-pyramid.azurewebsites.net/api/v1';

function App() {
  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }
  
  return (
    <Provider store={store}>
        <Alert>
          <HashRouter>
            <Routes>
              <Route path="*" element={<Index />} />
            </Routes>
          </HashRouter>
        </Alert>
    </Provider>
  );
}

export default App;
