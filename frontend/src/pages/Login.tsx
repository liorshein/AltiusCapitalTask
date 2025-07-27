import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { WebsiteSelector } from "@/components/WebsiteSelector";
import { useLogin } from "@/hooks/useLogin";
import type { LoginRequest } from "@/types";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useLogin();

    const [selectedWebsite, setSelectedWebsite] = useState<string>("");

    const handleLogin = async (loginData: LoginRequest) => {
        mutate(loginData, {
            onSuccess: (data) => {
                toast.success(data.message || "Login successful!");
                navigate("/");
            },
            onError: (error) => {
                toast.error(error.message || "Login failed. Please check your credentials.");
            },
        });
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Website Crawler
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Login to financial websites and view available deals
                    </p>
                </div>

                <div className="flex flex-col items-center space-y-6">
                    <div className="w-full max-w-md">
                        <WebsiteSelector
                            selectedWebsite={selectedWebsite}
                            onWebsiteChange={setSelectedWebsite}
                        />
                    </div>

                    <LoginForm
                        website={selectedWebsite}
                        onSubmit={handleLogin}
                        loading={isPending}
                    />
                </div>
            </div>
        </div>
    );
};

export { Login };
