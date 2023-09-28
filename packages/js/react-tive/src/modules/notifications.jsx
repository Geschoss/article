import { useContext, useState, createContext } from 'react';

const NotificationContext = createContext([]);

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [notifications, setList] = useState([]);

  const fetchNotification = () => {
    setLoading(true);
    fetch(`https://gorest.co.in/public/v2/posts`)
      .then((data) => data.json())
      .then((data) => setList(data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  return (
    <NotificationContext.Provider
      value={{ loading, notifications, fetchNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
