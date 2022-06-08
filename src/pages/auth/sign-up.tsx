/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http";
import { useActions } from "../../hooks/redux/useActions";

export const SignUp: React.FC = (): any => {
  const actions = useActions();

  const http = useHttp();

  const navigate = useNavigate();

  const [username, setusername] = useState<string>("");

  useEffect(() => {}, []);

  const handleVerify = async (e: any) => {
    e.preventDefault();
    const user = await http("/user/enter", "POST", { username });
    actions.setUser(user);
    navigate("/");
  };

  return (
    <div
      className="bg-light w-100 d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Paper elevation={6} className="auth-wrapper py-5 px-4">
        <h4
          className="py-3 text-muted text-center"
          style={{ fontWeight: "300" }}
        >
          To join to our application write your name
        </h4>
        <form className="d-flex flex-column" onSubmit={handleVerify}>
          <TextField
            id="standard-basic"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            label="username"
            variant="standard"
          />
          <Button
            variant="contained"
            type="submit"
            className="mt-4 bg-dark"
            onClick={handleVerify}
          >
            Join
          </Button>
        </form>
      </Paper>
    </div>
  );
};
