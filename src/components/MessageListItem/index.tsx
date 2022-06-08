import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { IMessage } from "../../interfaces";
import date from "date-and-time";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const MessageItem: React.FC<{ message: IMessage }> = ({ message }) => {
  const app = useTypedSelector((s) => s.app);
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(`#${message.id}`)}
      className="d-flex px-3 message-item justify-content-between"
      key={message.id}
    >
      <div>
        <span className="text-dark">
          {
            app.users!.find((user: any) => +user!.id! === +message!.recipient!)
              ?.username
          }
        </span>
        <span className="text-muted px-3">{message.title}</span>
      </div>
      <span className="text-muted">
        {date.format(new Date(message!.createdAt!), "YYYY-MM-DD HH:mm:ss")}
      </span>
    </Button>
  );
};
