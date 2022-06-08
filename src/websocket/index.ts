import { IMessage, IUser, type, wsmsg } from "../interfaces";

class WsConnect {
  socket: any = null;

  url: string = "ws://localhost:4000/connect";

  connect(
    id: number,
    setstatus: any,
    actions: any = null,
    receivedMessages: IMessage[] = [],
    sentMessages: IMessage[] = [],
    users: IUser[] = []
  ) {
    const start = () => {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        setstatus(true);
        this.socket.send(JSON.stringify({ payload: id, type: type.connect }));
      };

      this.socket.onclose = function (event: any) {
        console.log(event);

        setstatus(false);
        setTimeout(start, 1000);
      };
    };

    start();
    this.socket.onmessage = (messageEvent: MessageEvent): any => {
      const msg: wsmsg = JSON.parse(messageEvent.data);
      const payload: any = msg.payload!;
      switch (msg.type) {
        case type.connect:
          return;
        case type.message:
          if (payload.sender !== id) {
            actions.setInfo("new message");
            actions.setReceivedMessages([...receivedMessages, payload]);
            return;
          }
          actions.setSuccess("Successfully!");
          actions.setSentMessages([...sentMessages, payload]);
          return;
        case type.newUser:
          actions.setUsers([...users, payload]);
          return;
        default:
          console.log("connected");

          return;
      }
    };

    this.socket.onerror = function (error: any) {
      console.log(error);
      setstatus(false);
    };
  }
}

export default new WsConnect();
