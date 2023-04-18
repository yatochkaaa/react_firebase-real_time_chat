import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { Container, Grid, Box, TextField, Button, Avatar } from "@mui/material";
import Loader from "./Loader";
import { Context } from "../index";

const Chat = () => {
  const [message, setMessage] = React.useState("");
  const { auth, db } = React.useContext(Context);
  const [user] = useAuthState(auth);
  const { uid, displayName, photoURL } = user;
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "messages"), {
        uid,
        displayName,
        photoURL,
        text: message,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    setMessage("");
  };

  const getMessages = () => {
    
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      setMessages([]);

      // eslint-disable-next-line array-callback-return
      querySnapshot.docs.map((doc) => {
        setMessages((prevState) => {
          return [...prevState, doc.data()];
        });
      });
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        container
        sx={{ height: window.innerHeight - 50 }}
        justifyContent={"center"}
        mt={2}
      >
        <Box
          width={"80%"}
          height={"70vh"}
          sx={{ border: "1px solid gray", overflowY: "auto" }}
        >
          {messages.map((message) => (
            <Box
              m={3}
              p={1}
              width="fit-content"
              sx={{
                border:
                  user.uid === message.uid
                    ? "1px solid blue"
                    : "1px solid gray",
                marginLeft: user.uid === message.uid ? "auto" : "12px",
                borderRadius: "12px",
              }}
            >
              <Grid container>
                <Avatar src={message.photoURL} />
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </Box>
          ))}
        </Box>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          width={"80%"}
        >
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            maxRows={2}
            variant="outlined"
          />
          <Button
            onClick={sendMessage}
            sx={{ marginTop: "8px" }}
            variant="outlined"
          >
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
