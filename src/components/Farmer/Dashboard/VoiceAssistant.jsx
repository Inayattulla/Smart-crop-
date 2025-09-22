import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, X, Volume2, Send } from "lucide-react";
import { Button } from "../../../ui/button";
import { ScrollArea } from "../../../ui/ScrollArea";
import { Input } from "../../../ui/Input";
import "./VoiceAssistant.css";

export function VoiceAssistant({ isOpen, onClose, userRole }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "assistant",
      content: `Hello! I'm your AI farming assistant. I can help you with crop suggestions, weather updates, market prices, and answer any farming questions you have. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceCommand(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        
        // Add error message
        const errorMessage = {
          id: Date.now().toString(),
          type: "assistant",
          content: "Sorry, I didn't catch that. Could you please try again?",
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, errorMessage]);
      };
    }
  }, []);

  const getVoiceCommands = () => {
    switch (userRole) {
      case "farmer":
        return [
          "What crops should I plant this season?",
          "Show me today's weather",
          "What are the current market prices?",
          "How do I treat rice leaf blight?",
          "When should I harvest my wheat?",
          "Show me government schemes"
        ];
      case "buyer":
        return [
          "Show me available rice crops",
          "Find organic vegetables near me",
          "What are today's crop prices?",
          "Track my recent orders",
          "Connect me with farmers",
          "Show market trends"
        ];
      case "officer":
        return [
          "Show pending approval requests",
          "Display farmer analytics",
          "Update weather alerts",
          "Schedule farmer visits",
          "Review soil test reports",
          "Generate monthly report"
        ];
      default:
        return [];
    }
  };

  // Function to format API response with better styling
  const formatAIResponse = (text) => {
    // Convert markdown-like formatting to HTML
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
      .replace(/\n\n/g, '</p><p>') // Paragraphs
      .replace(/\n/g, '<br />'); // Line breaks
    
    // Add list formatting if we detect list patterns
    if (formattedText.includes('- ') || formattedText.includes('* ')) {
      formattedText = formattedText
        .replace(/((?:- |\* ).*(?:<br \/>)?)+/g, (match) => {
          const items = match.split(/<br \/>/).filter(item => item.trim());
          return `<ul>${items.map(item => `<li>${item.replace(/^(- |\* )/, '')}</li>`).join('')}</ul>`;
        });
    }
    
    // Add numbered list formatting
    if (formattedText.includes('1. ') || formattedText.match(/\d+\. /)) {
      formattedText = formattedText
        .replace(/((?:\d+\. ).*(?:<br \/>)?)+/g, (match) => {
          const items = match.split(/<br \/>/).filter(item => item.trim());
          return `<ol>${items.map(item => `<li>${item.replace(/\d+\. /, '')}</li>`).join('')}</ol>`;
        });
    }
    
    return `<p>${formattedText}</p>`;
  };

  const queryAI = async (prompt) => {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          messages: [
            {
              role: "system",
              content: `You are an AI farming assistant specialized in helping ${userRole}s. Provide helpful, concise, and accurate responses. Format your response with clear paragraphs, bullet points for lists, and bold text for important information.`
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });

      const data = await response.json();
      const rawResponse = data.choices[0].message.content;
      return formatAIResponse(rawResponse);
    } catch (error) {
      console.error("Error querying AI:", error);
      return "I'm having trouble connecting right now. Please try again later.";
    }
  };

  const handleVoiceCommand = async (command) => {
    const newUserMessage = {
      id: Date.now().toString(),
      type: "user",
      content: command,
      timestamp: new Date().toLocaleTimeString(),
      isHtml: false
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Get AI response
    const aiResponse = await queryAI(command);
    
    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: aiResponse,
      timestamp: new Date().toLocaleTimeString(),
      isHtml: true
    };

    setMessages(prev => [...prev, assistantMessage]);
    
    // Text-to-speech (using plain text without HTML tags)
    if ('speechSynthesis' in window) {
      const plainText = aiResponse.replace(/<[^>]*>/g, '');
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      // Fallback to simulated voice if recognition is not available
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const commands = getVoiceCommands();
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        handleVoiceCommand(randomCommand);
      }, 3000);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleVoiceCommand(textInput);
      setTextInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTextSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="voice-assistant-overlay">
      <div className="voice-assistant-container">
        <div className="voice-assistant-header">
          <div className="header-content">
            <div className="header-icon">
              {isListening ? (
                <Mic className="header-icon-svg" />
              ) : (
                <Volume2 className="header-icon-svg" />
              )}
            </div>
            <div className="header-text">
              <h2>AI Voice Assistant</h2>
              <p>
                {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Ready to help"}
              </p>
            </div>
          </div>
          <button
            className="close-button"
            onClick={onClose}
          >
            <X className="close-icon" />
          </button>
        </div>

        <div className="voice-assistant-content">
          {/* Messages */}
          <ScrollArea className="messages-container">
            <div className="messages-wrapper">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-row ${message.type === "user" ? "message-user-row" : "message-assistant-row"}`}
                >
                  <div
                    className={`message-bubble ${message.type === "user" ? "message-user" : "message-assistant"}`}
                  >
                    {message.isHtml ? (
                      <div 
                        className="message-content" 
                        dangerouslySetInnerHTML={{ __html: message.content }} 
                      />
                    ) : (
                      <p className="message-content">{message.content}</p>
                    )}
                    <p
                      className={`message-timestamp ${message.type === "user" ? "timestamp-user" : "timestamp-assistant"}`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} className="messages-end" />
            </div>
          </ScrollArea>

          {/* Quick Commands */}
          <div className="quick-commands">
            <p className="quick-commands-label">Quick Commands:</p>
            <div className="commands-container">
              {getVoiceCommands().slice(0, 3).map((command, index) => (
                <button
                  key={index}
                  className="command-button"
                  onClick={() => handleVoiceCommand(command)}
                >
                  {command}
                </button>
              ))}
            </div>
          </div>

          {/* Input Controls */}
          <div className="input-controls">
            <div className="input-wrapper">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-input"
                />
                <button
                  className="send-button"
                  onClick={handleTextSubmit}
                  disabled={!textInput.trim()}
                >
                  <Send className="send-icon" />
                </button>
              </div>
            </div>
            
            <div className="voice-controls">
              <button
                className={`mic-button ${isListening ? "mic-button-listening" : "mic-button-idle"}`}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? (
                  <MicOff className="mic-icon" />
                ) : (
                  <Mic className="mic-icon" />
                )}
              </button>
              
              {(isListening || isSpeaking) && (
                <button
                  className="stop-button"
                  onClick={() => {
                    stopListening();
                    setIsSpeaking(false);
                    if ('speechSynthesis' in window) {
                      speechSynthesis.cancel();
                    }
                  }}
                >
                  <div className="stop-button-content">
                    <X className="stop-icon" />
                    <span className="stop-text">STOP</span>
                  </div>
                </button>
              )}
            </div>
            
            <div className="status-container">
              {(isListening || isSpeaking) && (
                <div className="status-alert">
                  <p>
                    {isListening ? "🎤 LISTENING..." : "🔊 SPEAKING..."}
                  </p>
                  <p>
                    Tap the red ❌ STOP button to cancel immediately
                  </p>
                </div>
              )}
              <p className="status-text">
                {isListening 
                  ? "Voice detection active - speak your command clearly" 
                  : isSpeaking 
                  ? "AI is responding - please wait or stop anytime"
                  : "Tap the microphone to start voice command"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}