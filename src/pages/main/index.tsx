/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import wsConnect from "../../websocket";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import LogoutIcon from "@mui/icons-material/Logout";
import { useActions } from "../../hooks/redux/useActions";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { IMessage, IUser, type } from "../../interfaces";
import { MessageItem } from "../../components/MessageListItem";
import { MessageBoard } from "../../components/MessageBoard";
import { useHttp } from "../../hooks/http";

export const Main: React.FC = (): any => {
  const app = useTypedSelector((s) => s.app);
  const actions = useActions();
  const navigate = useNavigate();
  const [permission, setpermission] = useState<boolean>(false);
  const [tab, settab] = useState<number>(1);
  const [status, setstatus] = useState<boolean>(false);
  const http = useHttp();

  const location = useLocation();

  const [selectedmessage, setselectedmessage] = useState<IMessage | null>(null);

  const handleLogout = () => {
    actions.setUser(null);
    navigate("/enter");
  };
  useEffect(() => {
    (async function () {
      if (app.user) {
        const users = await http("/user/getUsers");

        const receivedMessages = await http(
          "/user/getReceivedMessages",
          "POST",
          {
            id: app.user.id,
          }
        );

        const sentMessages = await http("/user/getSentMessages", "POST", {
          id: app.user.id,
        });

        actions.setUsers(
          users.filter((user: IUser) => user.id !== app!.user!.id)
        );

        actions.setReceivedMessages(receivedMessages);

        actions.setSentMessages(sentMessages);

        wsConnect.connect(
          app!.user!.id,
          setstatus,
          actions,
          receivedMessages,
          sentMessages,
          users
        );
        setpermission(true);
        return;
      }
      navigate("/enter");
    })();
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && location.hash.length > 1 && app.user) {
      const message = [...app.receivedMessages, ...app.sentMessages].find(
        (message) =>
          message.id === Number(location.hash.slice(1, location.hash.length))
      );
      if (message) {
        setselectedmessage(message);
      }
      return;
    }
    setselectedmessage(null);
  }, [location]);

  const [openForm, setOpenForm] = useState<boolean>(false);

  const [username, setusername] = useState<string>("");

  const [title, settitle] = useState<string>("");

  const [message, setmessage] = useState<string>("");

  const setTab = (number: number) => {
    settab(number);
    setselectedmessage(null);
    navigate("/");
  };

  const handleSender = async () => {
    const recipient = app.users.find((user) => user.username === username);
    if (!recipient) {
      actions.setError("Wrong recipient");
      return;
    }

    if (title === "" || message === "") {
      actions.setError("Fill in all the fields");
      return;
    }

    wsConnect.socket.send(
      JSON.stringify({
        type: type.message,
        payload: {
          sender: app!.user!.id,
          recipient: recipient.id,
          title,
          text: message,
        },
      })
    );

    handleClose();
  };

  const handleReply = (message: IMessage) => {
    const name =
      app.users!.find((user: any) => +user!.id! === +message!.sender!)
        ?.username ||
      app.users!.find((user: any) => +user!.id! === +message!.recipient!)
        ?.username;
    setusername(name!);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    settitle("");
    setusername("");
    setmessage("");
  };

  if (!permission)
    return (
      <div
        className="d-flex align-items-center justify-content-center text-muted"
        style={{ height: "100vh" }}
      >
        loading...
      </div>
    );
  return (
    <div className="p-4">
      <div className="container d-flex justify-content-between">
        <div>
          <span>
            Username: <span className="text-muted"> {app.user?.username}</span>
          </span>
          <span className="px-2 d-none d-md-inline">
            Status:{" "}
            {status ? (
              <span className="text-success">Connected</span>
            ) : (
              <span className="text-danger">Connecting</span>
            )}{" "}
          </span>
        </div>
        <div>
          <LogoutIcon style={{ cursor: "pointer" }} onClick={handleLogout} />
        </div>
      </div>

      <div className="container pt-5">
        <div className="row px-0 mx-0 flex-column flex-md-row">
          <div className="col-12 col-md-2 px-0 d-flex flex-column">
            <Button
              className="bg-dark text-white"
              onClick={() => setOpenForm(true)}
            >
              Write a letter
            </Button>
            <Button
              className={`text-dark mt-4 ${tab === 1 ? "active-border" : ""}`}
              onClick={() => {
                setTab(1);
              }}
            >
              Inbox
            </Button>
            <Button
              className={`text-dark mt-3 ${tab === 2 ? "active-border" : ""}`}
              onClick={() => setTab(2)}
            >
              Sent
            </Button>
          </div>
          <div className="col-12 col-md-10 px-md-5 px-0 pt-3 pt-md-0">
            {selectedmessage ? (
              <MessageBoard
                handleReply={handleReply}
                message={selectedmessage}
              />
            ) : tab === 1 ? (
              <div className="d-flex flex-column message-list">
                {app.receivedMessages.length === 0 ? (
                  <div className="text-muted">No messages received yet</div>
                ) : (
                  app.receivedMessages?.map((message: IMessage) => (
                    <MessageItem key={message.id} message={message} />
                  ))
                )}
              </div>
            ) : (
              <div className="d-flex flex-column message-list">
                {app.sentMessages.length === 0 ? (
                  <div className="text-muted">no messages sent</div>
                ) : (
                  app.sentMessages?.map((message: IMessage) => (
                    <MessageItem key={message.id} message={message} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <Dialog open={openForm} fullWidth onClose={() => setOpenForm(false)}>
          <DialogContent>
            <div className="">
              <Autocomplete
                value={{ label: username }}
                onChange={(event, newValue) => {
                  if (typeof newValue?.label === "string") {
                    setusername(newValue?.label);
                  }
                }}
                disablePortal
                id="combo-box-demo"
                options={app.users.map((user) => ({ label: user.username }))}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Username"
                    onInput={(e: any) => setusername(e.target.value)}
                    value={username}
                  />
                )}
              />
            </div>
            <div className="pt-2">
              <TextField
                autoFocus
                margin="dense"
                id="title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                label="title"
                type="text"
                fullWidth
                variant="standard"
              />
            </div>
            <div className="pt-2">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                className="w-100 p-2"
                placeholder="Text"
                // style={{ width: 200 }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button className="text-muted" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="text-muted" onClick={handleSender}>
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
