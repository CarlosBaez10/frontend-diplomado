import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Pagination from "src/components/UI/Pagination";
import { UserContext } from "src/context";
import Empty from "src/components/UI/Empty";
import useAxios from "src/hooks/useAxios";
import { UserService } from "src/services";
import { getType } from "src/utilities";
import styles from "./table.module.css";

const Table = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const typeUser = params.get("q") || "wiedii";
  const page = params.get("page") || "1";
  const filter = params.get("filter") || "";
  const {
    userState,
    setUsers,
    setTotal,
    setTotalPages,
  } = useContext(UserContext);
  const { callEndpoint } = useAxios();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const type = getType(typeUser);
      const res = await callEndpoint(UserService.getUsers(page, type, filter));
      if (res) {
        const { data } = res.data;
        setTotal(data.total);
        setTotalPages(data.total_pages);
        setUsers(data.users);
      }
      setLoading(false);
    };
    if (
      ["wiedii", "externos", "administradores"].includes(
        typeUser.toLowerCase()
      )
    ) {
      getUsers();
    }
    return () => {};
  }, [typeUser, page, filter]);

  return (
    <div className={styles.table}>
      <Empty
        loading={loading}
        title={`¡No se encontrarón ${
          typeUser.toLowerCase() === "empresas" ? "empresas" : "usuarios"
        }!`}
        text={`En esta pantalla encontrarás ${
          typeUser.toLowerCase() === "empresas"
            ? "todas las empresas agregadas"
            : "todos los usuarios agregados"
        }. Desde aquí puedes acceder a su información y gestionarla.`}
      />
      {typeUser.toLowerCase() !== "empresas" && userState.users.length > 0 && (
        <>
          <div className={styles.table_head}>
            <ul>
              <li>ID</li>
              <li>Documento</li>
              <li>Nombres</li>
              <li>Apellidos</li>
              <li>Correo</li>
              <li>Teléfono</li>
            </ul>
          </div>
          <div className={styles.table_content}>
            {userState.users.map((user, i) => (
              <ul key={i}>
                <li>{user.id}</li>
                <li>
                  {user.type_document} {user.document}
                </li>
                <li>{user.names}</li>
                <li>{user.surnames}</li>
                <li title={user.email}>{user.email}</li>
                <li>{user.phone}</li>
              </ul>
            ))}
          </div>
          {userState.total_pages > 1 && (
            <div className={styles.pagination}>
              <Pagination pages={userState.total_pages} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Table;
