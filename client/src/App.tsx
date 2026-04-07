/*
  TRUST-LAB Editorial Systems Lab reminder for this file:
  The application shell should privilege research clarity, restrained motion, and bilingual coherence.
  Routing must reinforce the GitHub-first narrative rather than feel like a generic product scaffold.
  Does this choice reinforce or dilute our design philosophy?
*/

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { TrustLabLanguageProvider } from "./contexts/TrustLabLanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Demo from "./pages/Demo";
import Home from "./pages/Home";
import Methodology from "./pages/Methodology";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/methodology" component={Methodology} />
      <Route path="/demo" component={Demo} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TrustLabLanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </TrustLabLanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
