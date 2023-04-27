import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { getBreeds } from "../../../network/requests/breeds";
import { FavoriteCatContext } from "../../../context/favorite-cat/FavoriteCatContext";

const BreadListPage = () => {
    const { favoriteCatList } = useContext(FavoriteCatContext);
    console.log(favoriteCatList);
    const [breedList, dispatchBreedList] = useReducer(
        function (state, { type, payload }) {
            switch (type) {
                case "POPULATE": {
                    return {
                        ...state,
                        list: payload.list,
                        totalPage: Math.ceil(payload.totalPage / state.itemLimit), /* calculcation total page count */
                        isLoading: false,
                    };
                }
                case "INC_PAGE": {
                    return { ...state, currentPage: state.currentPage + 1 };
                }
                case "DEC_PAGE": {
                    return { ...state, currentPage: state.currentPage - 1 };
                }
                case "LOADING": {
                    return { ...state, isLoading: true };
                }
                default: {
                    return { ...state, isLoading: false };
                }
            }
        },
        {
            isLoading: false,
            list: [],
            currentPage: 0,
            itemLimit: 10,
            totalPage: null,
        }
    );

    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const getBreedList = async () => {
            try {
                dispatchBreedList({ type: "LOADING" });
                const response = await getBreeds(10, breedList.currentPage, {
                    signal: abortController.signal,
                });

                dispatchBreedList({
                    type: "POPULATE",
                    payload: {
                        list: response?.data,
                        totalPage: response?.headers["pagination-count"], /* sending total item count to prevent extra dependency */
                    },
                });
            } catch (error) {
                if (error.message === "canceled") return;
                console.log(error.message);
            }
        };

        getBreedList();
        return () => abortController.abort();
    }, [breedList.currentPage]);



    return (
        <div className="breed-list-container flex-col-center">
            <button className="btn fav-btn" title="Toggle Favorites" onClick={() => setShowFavorites(prevState => !prevState)}>
                {showFavorites ? <i className="fa-solid fa-star fa-lg"></i> : <i className="fa-regular fa-star fa-lg"></i>}
            </button>
            <div className="breed-list-header">
                <h2>Breed List</h2>
                <div
                    className="spinner"
                    style={{ visibility: breedList.isLoading ? "visible" : "hidden" }}
                ></div>
            </div>
            <ul className="breed-list flex-col-center">
                {breedList.isLoading || breedList.list?.map((breed) => (
                    /* Since it is quite simple, I have let it stay here instead of extracting it to its own components: eg BreedListItem */
                    <li key={breed.id}>
                        <Link to={`cats/${breed.id}`}>{breed.name}</Link>
                    </li>
                ))}
            </ul>
            <div className="btn-group pagination-btn-container">
                <button
                    className="pagination-btn btn btn-primary"
                    disabled={breedList.isLoading || breedList.currentPage === 0}
                    onClick={() => dispatchBreedList({ type: "DEC_PAGE" })}
                >
                    Previous Page
                </button>
                <p className="fw-700 dark-color">
                    Page: {breedList.currentPage + 1}
                </p>
                <button
                    className="pagination-btn btn btn-primary"
                    disabled={
                        breedList.isLoading ||
                        breedList.totalPage === breedList.currentPage + 1
                    }
                    onClick={() => dispatchBreedList({ type: "INC_PAGE" })}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
};

export default BreadListPage;
