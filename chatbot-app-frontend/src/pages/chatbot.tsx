import { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when new messages arrive
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      setChatHistory([...chatHistory, { text: message, sender: "user" }]);

      // Simulate bot response
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          {
            text: "I’m just a bot! I'll forward this to a human.",
            sender: "bot",
          },
        ]);
      }, 1000);

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
