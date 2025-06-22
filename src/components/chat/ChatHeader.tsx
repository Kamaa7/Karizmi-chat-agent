import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { X, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


interface ChatHeaderProps {
    toggleOpen: () => void;
    setCurrentView: (view: 'leadForm' | 'auth' | 'chat') => void;
    currentView: 'leadForm' | 'auth' | 'chat';
}

const ChatHeader = ({ toggleOpen, setCurrentView, currentView }: ChatHeaderProps) => {
    const { user, signOut } = useAuth();
    const { toast } = useToast();

    const handleLogout = async () => {
        try {
            await signOut();
            setCurrentView('leadForm');
            toast({ title: "Signed out." });
        } catch (error: any) {
            toast({ title: "Error signing out", description: error.message, variant: 'destructive' });
        }
    }

    return (
        <div className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center">
                {user ? (
                     <div className="flex items-center">
                        <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mr-2">
                            {user.email?.charAt(0).toUpperCase()}
                        </span>
                        <span className="text-sm font-semibold">{user.email}</span>
                    </div>
                ) : (
                    <h2 className="text-lg font-semibold">Karizmi</h2>
                )}
            </div>
            <div className="flex items-center">
                {user && (
                    <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                        <LogOut className="h-5 w-5" />
                    </Button>
                )}
                <Button variant="ghost" size="icon" onClick={toggleOpen} title="Close chat">
                    <X className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
};

export default ChatHeader; 