import './App.css';
import Homepage from './Homepage';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import GlobalStyles from './GlobalStyles';
import Header from './Header';
import Profile from './Profile';
import Inbox from './Inbox';
import BookDetails from './BookDetails';
import FriendProfile from './FriendProfile';
import Author from './Author';
import Section from './Section';
import ReadBooks from './ReadBooks';
import ToReadBooks from './ToReadBooks';
import FavoriteBooks from './FavoriteBooks';
import { useState } from 'react';
import ErrorPage from './ErrorPage';

function App() {
  const [error, setError] = useState(false);
  return (
    <BrowserRouter>
    <GlobalStyles />
    <Header />
    <Routes>
      
      <Route path="/" element={<Homepage />} />
      <Route path="/book/:bookId" element={<BookDetails />} />
      <Route path="/yourprofile" element={<Profile />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/profile/:userId" element={<FriendProfile />} />
      <Route path="/author/:author" element={<Author />} />
      <Route path="/genre/:section" element={<Section />} />
      <Route path="/readbooks/:userId" element={<ReadBooks />} />
      <Route path="/toreadbooks/:userId" element={<ToReadBooks />} />
      <Route path="/favoritebooks/:userId" element={<FavoriteBooks />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
