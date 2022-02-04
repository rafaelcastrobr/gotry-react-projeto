import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import PagesPromotionSearch from './Promotion/Search/Search';
import PagesPromotionForm from './Promotion/Form/Form';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/create' element={<PagesPromotionForm />} />
        <Route path='/edit/:id' element={<PagesPromotionForm />} />
        <Route path="/" element={<PagesPromotionSearch />} />
      </Routes>
    </Router>
  )
}

export default Root;