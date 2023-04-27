import React, { useContext, useEffect, useState } from "react";
import { getCatById } from "../../../network/requests/cats";
import { useParams } from "react-router-dom";
import { FavoriteCatContext } from "../../../context/favorite-cat/FavoriteCatContext";

const CatDetailPage = () => {
    const { id: id_routeParam } = useParams();
    const { favoriteCatList, addToFavorites, removeFromFavorites } = useContext(FavoriteCatContext);

    const [isCatDetailLoading, setIsCatDetailLoading] = useState(false);
    const [isFavorited, setIsFavorited] = useState(favoriteCatList.includes(id_routeParam));
    const [catDetail, setCatDetail] = useState({
        id: "",
        name: "",
        temperament: [],
        origin: "",
        description: "",
        wiki: "",
        imgURL: "",
    });

    useEffect(() => {
        const abortController = new AbortController();

        const getCatDetails = async () => {
            try {
                setIsCatDetailLoading(true);
                const response = await getCatById(id_routeParam, {
                    signal: abortController.signal,
                });
                /* destructuring response to set catDetails */
                const {
                    data: [{
                        url: imgURL,
                        breeds: [
                            { name, temperament, origin, description, wikipedia_url: wiki },
                        ],
                    }],
                } = response;

                setCatDetail({ id: id_routeParam, name, temperament, origin, description, wiki, imgURL });
                setIsCatDetailLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getCatDetails();
        // return () => abortController.abort();
    }, []);

    const toggleFavorite = () => {
        if (!isFavorited) {
            addToFavorites(catDetail.id)
            setIsFavorited(true);
        }
        else {
            removeFromFavorites(catDetail.id);
            setIsFavorited(false);
        }
    }

    return (
        <div className="cat-detail-container">
            <button style={{ top: "10px", right: "10px" }} className="btn fav-btn" title="Add to / Remove from Favorites" onClick={toggleFavorite}>
                {isFavorited ? <i className="fa-solid fa-star fa-lg"></i> : <i className="fa-regular fa-star fa-lg"></i>}
            </button>
            {isCatDetailLoading
                ? (<div className="spinner"></div>)
                : (
                    <div>

                        <div className="img-container">
                            <img
                                src={catDetail.imgURL}
                                alt={`cat ${catDetail.name}`}
                            />
                        </div>
                        <div className="cat-detail-content">

                            <ul>
                                <li>{catDetail.name}</li>
                                <li>{catDetail.description}</li>
                                <li>{catDetail.origin}</li>
                                <li>{catDetail.temperament}</li>
                                <li><a href={catDetail.wiki} target="_blank" rel="noreferrer">Check on Wikipedia</a></li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CatDetailPage;
