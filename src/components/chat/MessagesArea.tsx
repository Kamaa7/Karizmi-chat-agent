const MessagesArea = () => {
    // This will eventually hold the messages
    return (
        <div className="flex-grow p-4 overflow-y-auto">
            <div className="flex flex-col space-y-4">
                {/* Example Messages */}
                <div className="flex items-end">
                    <div className="bg-muted rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Hi there! How can I help you today?</p>
                    </div>
                </div>
                <div className="flex items-end justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                        <p className="text-sm">I have a question about my account.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesArea; 