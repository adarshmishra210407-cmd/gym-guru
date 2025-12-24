import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Training from './components/Training';
import AICoach from './components/AICoach';
import Diet from './components/Diet';
import Profile from './components/Profile';
import Login from './components/Login';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useGame();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'training': return <Training />;
      case 'coach': return <AICoach />;
      case 'diet': return <Diet />;
      case 'profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default App;