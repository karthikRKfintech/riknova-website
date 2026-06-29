import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import BookDemoModal from "./components/BookDemoModal";
import { BookDemoModalProvider } from "./hooks/useBookDemoModal";
import { router } from "./router";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <InternetIdentityProvider>
      <BookDemoModalProvider>
        <RouterProvider router={router} />
        <BookDemoModal />
      </BookDemoModalProvider>
    </InternetIdentityProvider>
  </QueryClientProvider>,
);
