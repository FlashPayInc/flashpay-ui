import Home from "./pages/Landing";

import store from "./store";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

const renderLoader = () => <p></p>;

const RootComponent = () => (
  <div className="container">
    <Home />
  </div>
);

const App = () => {
  const queryClient = new QueryClient();
  return (
    <Suspense fallback={renderLoader()}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RootComponent />
        </QueryClientProvider>
      </Provider>
    </Suspense>
  );
};

export default App;
