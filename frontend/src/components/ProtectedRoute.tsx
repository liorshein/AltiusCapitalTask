import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";
import { Navigator } from "./Navigator";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
    children: ReactNode;
    redirectTo?: string;
};

const ProtectedRoute = ({
    children,
    redirectTo = "/login",
}: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to={redirectTo}
                replace
            />
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigator />
            <main>
                {children}
            </main>
        </div>
    );
};

export { ProtectedRoute };
