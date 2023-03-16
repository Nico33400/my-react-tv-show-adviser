import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import { Logo } from "./components/Logo/Logo";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { BACKDROP_BASE_URL } from "./config";
import "./global.css";
import s from "./style.module.css";
import logo from "./assets/images/logo.png";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
  const [currentTVShow, setcurrentTVShow] = useState(); // Hooks
  const [recommendationList, setRecommendationList] = useState([]);

  async function fetchPopulars() {
    try {
      const populars = await TVShowAPI.fetchPopulars();
      if (populars.length > 0) {
        setcurrentTVShow(populars[0]);
      }
    } catch (error) {
      alert("Erreur durant la recherche des séries populaires");
    }
  }

  async function fetchRecommendations(tvShowId) {
    try {
      const recommandations = await TVShowAPI.fetchRecommendations(tvShowId);
      if (recommandations.length > 0) {
        setRecommendationList(recommandations.slice(0, 10));
      }
    } catch (error) {
      alert("Erreur durant la recherche des séries à recommander");
    }
  }

  async function searchTVShow(tvShowName) {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
      if (searchResponse.length > 0) {
        setcurrentTVShow(searchResponse[0]);
      }
    } catch (error) {
      alert("Erreur durant la recherche des séries par titre");
    }
  }

  // Hooks pour se mettre en écoute
  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              image={logo}
              title="WatchIt"
              subtitle="Find a show you may like"
            />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={searchTVShow} />
          </div>
        </div>
      </div>
      <div className={s.details}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommendations}>
        {recommendationList && recommendationList.length > 0 && (
          <TVShowList
            onClickItem={setcurrentTVShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}
