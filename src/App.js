import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import AppHeader from './components/shared/app-header/AppHeader';
import BreedListPage from './pages/app/breed-list/BreedListPage';
import CatDetailPage from './pages/app/cat-detail/CatDetailPage';
import AboutPage from './pages/shared/about/AboutPage';
import ContactPage from './pages/shared/contact/ContactPage';
import NotFoundPage from './pages/shared/not-found/NotFoundPage';
import FavoriteCatProvider from './context/favorite-cat/FavoriteCatContext';

function App() {
  return (
    <main>
      <Router>
        <FavoriteCatProvider>
          <main>
            <AppHeader />
            <Routes>
              <Route path='/' element={<BreedListPage />} />
              <Route path='/cats/:id' element={<CatDetailPage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/contact' element={<ContactPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </main>
        </FavoriteCatProvider>
      </Router>
    </main>
  );
}

export default App;
