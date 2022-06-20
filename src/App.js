import Home from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

import store from "./store";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const renderLoader = () => <p></p>;

const RootComponent = () => (
  <div className="container">
    {/* <Home /> */}
    <Dashboard />
  </div>
);

const App = () => {
  const queryClient = new QueryClient();
  return (
    <Suspense fallback={renderLoader()}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <RootComponent />
          </Router>
        </QueryClientProvider>
      </Provider>
    </Suspense>
  );
};

export default App;
