import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { WEBSITES } from "@/config/websites";
import type { LoginRequest } from "../types";

const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

type LoginFormProps = {
    website: string;
    onSubmit: (loginData: LoginRequest) => void;
    loading: boolean;
};

export const LoginForm = ({ website, onSubmit, loading }: LoginFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        setValue,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    useEffect(() => {
        reset();
    }, [website]);

    const onFormSubmit = (data: LoginFormData) => {
        onSubmit({ website, email: data.email, password: data.password });
    };

    const handleTestLogin = () => {
        const testCreds = WEBSITES[website].test_credentials;
        setValue("email", testCreds.email);
        setValue("password", testCreds.password);
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Login Credentials</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(onFormSubmit)}
                    className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading || !isValid}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleTestLogin}
                            disabled={loading}>
                            Use Test Credentials
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
