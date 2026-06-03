import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import RootNavigator from './navigation';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator/>
    </QueryClientProvider>
  );
}