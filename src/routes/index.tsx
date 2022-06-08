/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useHttp } from "../hooks/http";
import { useActions } from "../hooks/redux/useActions";
import { useTypedSelector } from "../hooks/redux/useSelectedTypes";
import { SignUp } from "../pages/auth/sign-up";
import { Main } from "../pages/main";

export const Pages: React.FC = () => {
  const [permission, setpermission] = useState<boolean>(false);
  const { user } = useTypedSelector((s) => s.app);

  const actions = useActions();

  const http = useHttp();

  useEffect(() => {
    (async function () {
      try {
        let username = localStorage.getItem("username");
        if (username && username !== "null") {
          const check = await http("/user/getUser", "POST", { username });
          if (check) {
            actions.setUser(check);
          }
        }
      } catch (error) {
        console.log(error);
      }

      setpermission(true);
    })();
  }, []);

  if (permission) {
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        {!user && <Route path="/enter" element={<SignUp />} />}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }

  return (
    <div
      className="d-flex justify-content-center w-100 align-items-center text-muted"
      style={{ height: "100vh" }}
    >
      loading...
    </div>
  );
};
