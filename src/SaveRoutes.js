import React, { useState } from 'react';
import { FavList } from './FavList';

export const SaveRoutes = ({ search }) => {
  const [favorite, setFavorite] = useState([]);

  function onClickHandler(e) {
    e.preventDefault();
    setFavorite(search);
  }

  return (
    <div>
      <button onClick={onClickHandler}>Set Favorite</button> {favorite}
      <FavList />
    </div>
  );
};
