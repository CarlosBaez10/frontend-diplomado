import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { AuthContext, UIContext, UserContext } from "src/context";
import searchIcon from "src/assets/icon/search.svg";
import errorIcon from "src/assets/icon/error.svg";
import styles from "./filter.module.css";
import useAxios from "src/hooks/useAxios";

const Filter = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const filterQuery = queryParams.get("filter") || "";
  const typeUser = queryParams.get("q") || "wiedii";
  const [text, setText] = useState<string>("");
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();

  const debouncedSearch = useRef(
    debounce(async (filter: string) => {
      const params = new URLSearchParams(location.search);
      const q = params.get("q") || "wiedii";
      queryParams.set("q", q);
      if (filter.length) {
        queryParams.set("page", "1");
        queryParams.set("filter", filter);
      } else {
        queryParams.delete("page");
        queryParams.delete("filter");
      }
      const newSearch = `?${queryParams.toString()}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate({ search: newSearch });
    }, 500)
  );

  useEffect(() => {
    return () => {
      debouncedSearch.current.cancel();
    };
  }, []);

  useEffect(() => {
    setText(filterQuery);
    return () => {};
  }, [filterQuery]);

  const handleClean = () => {
    setText("");
    debouncedSearch.current("");
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setText(value);
    debouncedSearch.current(value);
  };

  return (
    <div className={styles.filter}>
      <label htmlFor="search_user">
        {typeUser.toLowerCase() !== "empresas"
          ? "Listado de usuarios"
          : "Listado de empresas"}{" "}
        - Total: {userState.total}
        <input
          id="search_user"
          name="search"
          type="text"
          value={text}
          onChange={handleChangeSearch}
          autoComplete="off"
          placeholder="Buscar..."
        />
        <img
          className={text.length ? styles.clean : ""}
          onClick={handleClean}
          src={!text.length ? searchIcon : errorIcon}
          alt="search icon"
        />
      </label>
      <div className={styles.filter_actions}>
      </div>
    </div>
  );
};

export default Filter;
