import store from "./store";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import MainApp from "./pages";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <Suspense fallback={<></>}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="container">
              <MainApp />
            </div>
          </Router>
        </QueryClientProvider>
      </Provider>
    </Suspense>
  );
};

export default App;
