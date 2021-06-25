import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import jwt from "jsonwebtoken";

import "./Home.css";

import { LOGOUT } from "../../constants/actionTypes";
import { ReactComponent as BrandLogo } from "../../images/pixar.svg";
import { getImages, favoriteImage } from "../../actions/image";

const Home = ({ favourites }) => {
  const [page, setPage] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const images = useSelector((state) => state.image);
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) history.push("/login");

  const userId = jwt.decode(user.data.token)._id;

  const favoriteImageList = images.filter((image) => {
    if (image.favourites.find((id) => id === userId)) return image;
  });

  const logoutHandler = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
  };

  const loadMoreHandler = () => {
    setPage((prevState) => prevState + 1);
  };

  const favoriteHandler = (id) => {
    dispatch(favoriteImage(id, user.data.token));
  };

  useEffect(() => {
    dispatch(getImages(page));
  }, [page]);

  return (
      <div className="home">
        <nav className="login__navbar">
          <section>
            <BrandLogo />
            <Link to="/login">
              <h3>Pixar.</h3>
            </Link>
          </section>
          <section className="home__links">
            <Link to="/home">Home</Link>
            <Link to="/favourites">Favorites</Link>
            <button className="home__logout" onClick={logoutHandler}>
              Logout
            </button>
          </section>
        </nav>
        <h2>{favourites ? "Favourites" : "Home"}</h2>
        {!favourites ? (
            <div className="home__images">
              <div className="home__imageBox home__imageBox-1">
                {images.map((image, index) => {
                  if (index % 3 === 0)
                    return (
                      <div>
                        <img src={image.download_url} alt={image.author} />
                        <div className="home__imageInfo">
							<p>{image.author}</p><p className="icon" onClick={() => favoriteHandler(image._id)}><FavoriteIcon /></p>
                        </div>
                      </div>
                    );
                })}
              </div>
              <div className="home__imageBox home__imageBox-2">
                {images.map((image, index) => {
                  if (index % 3 === 1)
                    return (
                      <div>
                        <img src={image.download_url} alt={image.author} />
                        <div className="home__imageInfo">
							<p>{image.author}</p><p className="icon" onClick={() => favoriteHandler(image._id)}><FavoriteIcon /></p>
                        </div>
                      </div>
                    );
                })}
              </div>
              <div className="home__imageBox-3 home__imageBox">
                {images.map((image, index) => {
                  if (index % 3 === 2)
                    return (
                      <div><img src={image.download_url} alt={image.author} />
                        <div className="home__imageInfo">
                          <p>{image.author}</p><p className="icon" onClick={() => favoriteHandler(image._id)}><FavoriteIcon /></p>
                        </div>
                      </div>
                    );
                })}
              </div>
            </div>
          ) : (
          <div className="home__images">
            <div className="home__imageBox home__imageBox-1">
              {favoriteImageList.map((image, index) => {
                if (index % 3 === 0)
                  return (
                    <div>
                      <img src={image.download_url} alt={image.author} />
                      <div className="home__imageInfo">
					  	<p>{image.author}</p><p className="icon" onClick={() => favoriteHandler(image._id)}><FavoriteIcon /></p>
                      </div>
                    </div>
                  );
              })}
            </div>
            <div className="home__imageBox home__imageBox-2">
              {favoriteImageList.map((image, index) => {
                if (index % 3 === 1)
                  return (
                    <div>
                      <img src={image.download_url} alt={image.author} />
                      <div className="home__imageInfo">
						  <p>{image.author}</p><p className="icon" onClick={() => favoriteHandler(image._id)}><FavoriteIcon /></p>
                      </div>
                    </div>
                  );
              })}
            </div>
            <div className="home__imageBox-3 home__imageBox">
              {favoriteImageList.map((image, index) => {
                if (index % 3 === 2)
                  return (
                    <div>
                      <img src={image.download_url} alt={image.author} />
                      <div className="home__imageInfo">
						  <p>{image.author}</p><p className="icon" onClick={() => favoriteHandler(image._id)}><FavoriteIcon /></p>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
        )}

        <button className="home__loadMore" onClick={loadMoreHandler}>
          Load More Shots
        </button>
      </div>
  );
};

export default Home;
//
