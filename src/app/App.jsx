import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Chat, Login } from '@/pages';

function App() {
  return (
  <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
