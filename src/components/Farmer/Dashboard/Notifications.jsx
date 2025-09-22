import React, { useState } from "react";
import { X, Bell, Cloud, TrendingUp, ShoppingCart, FileText, AlertTriangle } from "lucide-react";
import "./Notifications.css";

const NotificationPanel = ({ isOpen, onClose, userRole }) => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "weather",
      title: "Weather Alert",
      message: "Heavy rainfall expected in your area tomorrow. Protect your crops accordingly.",
      time: "5 min ago",
      isRead: false
    },
    {
      id: "2",
      type: "ai",
      title: "AI Recommendation",
      message: "Based on soil analysis, consider planting maize in the upcoming season.",
      time: "1 hour ago",
      isRead: false
    },
    {
      id: "3",
      type: "market",
      title: "Price Update",
      message: "Rice prices increased by 8% in your region. Good time to sell!",
      time: "2 hours ago",
      isRead: true
    },
    {
      id: "4",
      type: "scheme",
      title: "Government Scheme",
      message: "New subsidy scheme for organic farming is now available. Apply now!",
      time: "1 day ago",
      isRead: true
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "weather":
        return <Cloud className="notification-icon weather-icon" />;
      case "ai":
        return <TrendingUp className="notification-icon ai-icon" />;
      case "market":
        return <ShoppingCart className="notification-icon market-icon" />;
      case "scheme":
        return <FileText className="notification-icon scheme-icon" />;
      case "order":
        return <ShoppingCart className="notification-icon order-icon" />;
      case "alert":
        return <AlertTriangle className="notification-icon alert-icon" />;
      default:
        return <Bell className="notification-icon default-icon" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "weather":
        return "notification-card weather-notification";
      case "ai":
        return "notification-card ai-notification";
      case "market":
        return "notification-card market-notification";
      case "scheme":
        return "notification-card scheme-notification";
      case "order":
        return "notification-card order-notification";
      case "alert":
        return "notification-card alert-notification";
      default:
        return "notification-card default-notification";
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="notification-overlay">
      <div className="notification-panel">
        <div className="notification-header">
          <div className="notification-title-container">
            <Bell className="notification-bell-icon" />
            <h2 className="notification-title">Notifications</h2>
          </div>
          <button
            className="notification-close-btn"
            onClick={onClose}
          >
            <X className="close-icon" />
          </button>
        </div>

        <div className="notification-scroll-area">
          <div className="notification-content">
            {notifications.length === 0 ? (
              <div className="notification-empty-state">
                <Bell className="empty-bell-icon" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-card ${getNotificationColor(notification.type)} ${!notification.isRead ? 'unread-notification' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-card-content">
                    <div className="notification-card-inner">
                      {getNotificationIcon(notification.type)}
                      <div className="notification-text-content">
                        <div className="notification-header-row">
                          <h4 className="notification-item-title">{notification.title}</h4>
                          {!notification.isRead && (
                            <span className="notification-badge">New</span>
                          )}
                        </div>
                        <p className="notification-message">{notification.message}</p>
                        <p className="notification-time">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;