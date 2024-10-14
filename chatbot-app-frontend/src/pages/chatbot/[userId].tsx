import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Box,
  TextField,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const router = useRouter();
  const { userId } = router.query; 

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get("http://localhost:3001/chat/history", {
          params: { userId },
          withCredentials: true, 
        });
        console.log("Chat History Response:", response.data);
        const conversation = response.data.map((msg: any) => ({
          text: msg.message,
          sender: msg.sender,
        }));
        setChatHistory(conversation);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    if (userId) {
      fetchChatHistory(); 
    }
  }, [userId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { text: message, sender: "user" }]);

      try {
        const response = await axios.post(
          `http://localhost:3001/chat/message`,
          { userId, message },
          { withCredentials: true } // Send cookies with the request
        );

        setChatHistory((prev) => [
          ...prev,
          { text: response.data.botResponse, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error sending message to chatbot:", error);
        setChatHistory((prev) => [
          ...prev,
          {
            text: "Sorry, something went wrong. Please try again later.",
            sender: "bot",
          },
        ]);
      }

      setMessage(""); // Clear input after sending
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #f3e5f5 0%, #ba68c8 100%)",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 2,
            backgroundColor: "white",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            height: "70vh",
            maxHeight: "70vh",
            overflowY: "auto",
            mb: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2, textAlign: "center", color: "#4F46E5" }}
          >
            Chat with our Bot
          </Typography>

          {/* Chat History */}
          <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2, p: 1 }}>
            {chatHistory.length > 0 ? (
              chatHistory.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      p: 1.5,
                      borderRadius: "12px",
                      backgroundColor:
                        msg.sender === "user" ? "#4F46E5" : "#f3e5f5",
                      color: msg.sender === "user" ? "white" : "#000",
                      maxWidth: "70%",
                      wordWrap: "break-word",
                      transition: "transform 0.2s ease-in-out",
                      ":hover": { transform: "scale(1.03)" },
                    }}
                  >
                    {msg.text}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textAlign: "center" }}
              >
                No messages yet, start the conversation.
              </Typography>
            )}
            <div ref={messageEndRef} />
          </Box>

          {/* Message Input */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderTop: "1px solid #e0e0e0",
              pt: 2,
            }}
          >
            <TextField
              fullWidth
              label="Type your message"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              sx={{
                borderRadius: "12px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              sx={{ ml: 1 }}
              disabled={!message.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Chatbot;
