import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MessageSquare, X } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';

import AuthView from '@/components/chat/AuthView';
import ChatHeader from '@/components/chat/ChatHeader';
import MessagesArea from './chat/MessagesArea';
import Dashboard from '@/components/chat/Dashboard';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<'leadForm' | 'auth' | 'chat'>('leadForm'); // leadForm, auth, chat

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (user) {
      setCurrentView('chat');
    } else {
      // Keep auth view if they were on it, otherwise default to lead form
      if(currentView !== 'auth') {
        setCurrentView('leadForm');
      }
    }
  }, [user, currentView]);


  const handleShowAuth = () => {
    setCurrentView('auth');
  }

  const renderView = () => {
    switch (currentView) {
      case 'auth':
        return <AuthView />;
      case 'chat':
        return <Dashboard />;
      case 'leadForm':
      default:
        // This is a simplified lead form view for now
        return (
            <div className="p-4 flex flex-col items-center justify-center h-full">
                <h2 className="text-lg font-semibold text-center mb-4">Welcome!</h2>
                <p className="text-sm text-muted-foreground text-center mb-6">
                    Sign in to start a conversation, view your history, and manage your account.
                </p>
                <Button onClick={handleShowAuth}>Sign In or Sign Up</Button>
            </div>
        )
    }
  };


  if (!isOpen) {
    return (
      <Button
        onClick={toggleOpen}
        className="fixed bottom-4 right-4 rounded-full w-16 h-16 shadow-lg"
      >
        <MessageSquare size={24} />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] shadow-lg flex flex-col">
       <ChatHeader toggleOpen={toggleOpen} setCurrentView={setCurrentView} currentView={currentView} />
      <CardContent className="flex-grow overflow-y-auto p-0">
        {renderView()}
      </CardContent>
    </Card>
  );
};

export default ChatWidget; 