import "../styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();
function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
export default appWithTranslation(App);
