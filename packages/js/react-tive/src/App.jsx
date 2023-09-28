import { useEffect } from 'react';
import { List } from './List';
import { useNotification, NotificationProvider } from './modules/notifications';
import './App.css';

function Aside() {
  const { notifications } = useNotification();
  return <div>{notifications.length}</div>;
}

function Page() {
  const { loading, notifications, fetchNotification } = useNotification();
  useEffect(() => {
    fetchNotification();
  }, [])

  return (
    <div>
      <button onClick={() => fetchNotification()}>fetch</button>
      {loading && <div> loading </div>}
      <div>{<List list={notifications} />}</div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <NotificationProvider>
        <Aside />
        <Page />
      </NotificationProvider>
    </div>
  );
}

export default App;
