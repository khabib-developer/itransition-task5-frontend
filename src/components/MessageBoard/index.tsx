import { IMessage } from "../../interfaces";
import date from "date-and-time";
import { Button, Paper } from "@mui/material";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";

export const MessageBoard: React.FC<{
  message: IMessage;
  handleReply: any;
}> = ({ message, handleReply }) => {
  const app = useTypedSelector((s) => s.app);
  return (
    <Paper
      elevation={3}
      className="p-4 message-board d-flex flex-column justify-content-between"
    >
      <div>
        <span className="text-muted">
          {
            app.users!.find((user: any) => +user!.id! === +message!.recipient!)
              ?.username
          }
        </span>
        <h2 className="pt-3">{message.title}</h2>
      </div>
      <div className="">
        <p>{message.text}</p>
      </div>
      <div>
        <div style={{ fontSize: ".8em", fontWeight: "300" }} className="pb-3">
          {date.format(new Date(message!.createdAt!), "YYYY-MM-DD HH:mm:ss")}
        </div>
        <Button
          onClick={() => handleReply(message)}
          className="text-white bg-dark px-3"
        >
          Reply
        </Button>
      </div>
    </Paper>
  );
};
