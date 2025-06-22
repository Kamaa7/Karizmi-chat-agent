import MessagesArea from './MessagesArea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="h-full flex flex-col">
            <MessagesArea />
            <div className="p-4 border-t">
                 <div className="relative">
                    <Input
                        placeholder="Type your message..."
                        className="pr-12"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="absolute top-1/2 right-1 -translate-y-1/2"
                        >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 