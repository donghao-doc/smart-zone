import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return (
    <div className="App">
      <RouterProvider
        router={router}
        future={
          {
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          } as any
        }
      />
    </div>
  );
}

export default App;
