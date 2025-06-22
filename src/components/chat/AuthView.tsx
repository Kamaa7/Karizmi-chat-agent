import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';


const AuthView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const { signIn, signUp } = useAuth();
    const { toast } = useToast();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const { error } = await signIn({ email, password });
                if (error) throw error;
                 toast({ title: "Signed in successfully!" });
            } else {
                const { error } = await signUp({ email, password });
                if (error) throw error;
                toast({ title: "Account created! Please check your email to verify." });
            }
        } catch (error: any) {
             toast({ title: "Error", description: error.message, variant: 'destructive' });
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold text-center mb-4">{isLogin ? 'Sign In' : 'Sign Up'}</h2>
            <form onSubmit={handleAuth} className="space-y-4">
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full">
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </Button>
            </form>
            <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="w-full mt-2">
                {isLogin ? 'Need an account? Sign Up' : 'Have an account? Sign In'}
            </Button>
        </div>
    );
};

export default AuthView; 