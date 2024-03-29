import { TVShowListItem } from "../TVShowListItem/TVShowListItem";
import s from "./style.module.css";

export function TVShowList({ tvShowList, onClickItem }) {
  return (
    <>
      <div className={s.title}>You may also like:</div>
      <div className={s.list}>
        {tvShowList.map((tvShow) => {
          return (
            <span key={tvShow.id} className={s.list_item}>
              <TVShowListItem onClick={onClickItem} tvShow={tvShow} />
            </span>
          );
        })}
      </div>
    </>
  );
}
