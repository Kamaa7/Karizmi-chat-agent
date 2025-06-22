import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

// Define the shape of the context
interface AuthContextType {
    user: User | null;
    session: Session | null;
    signIn: typeof supabase.auth.signInWithPassword;
    signUp: typeof supabase.auth.signUp;
    signOut: typeof supabase.auth.signOut;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setUser(data.session?.user ?? null);
        };
        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event: string, session: Session | null) => {
                setSession(session);
                setUser(session?.user ?? null);
            }
        );

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    const value = {
        user,
        session,
        signIn: supabase.auth.signInWithPassword,
        signUp: supabase.auth.signUp,
        signOut: supabase.auth.signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 