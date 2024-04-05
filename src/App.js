import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;