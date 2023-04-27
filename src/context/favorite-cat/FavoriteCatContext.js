import React, { createContext, useEffect, useState } from 'react';

export const FavoriteCatContext = createContext();

const FavoriteCatProvider = ({ children }) => {
    const [favoriteCatList, setFavoriteCatList] = useState([]);

    const addToFavorites = (id) => setFavoriteCatList(prevState => ([ ...prevState, id ]));
    const removeFromFavorites = (id) => setFavoriteCatList(prevState => prevState.filter(favID => favID !== id));

    
    /* need to get existing favs from localStorage */
    useEffect(() => {

        return () => {

        };
    }, []);
    return (
        <FavoriteCatContext.Provider value={{favoriteCatList, addToFavorites, removeFromFavorites}}>
            {children}
        </FavoriteCatContext.Provider>
    )
}

export default FavoriteCatProvider