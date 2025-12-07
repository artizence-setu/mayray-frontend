"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useSignup } from "@/features/auth/useSignup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Yup validation
const registerSchema = Yup.object({
  first_name: Yup.string().min(2).required("First name is required"),
  last_name: Yup.string().min(2).required("Last name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase & number"
    )
    .required("Password is required"),
  
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const register = useSignup();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      register.mutate(
        {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: (data) => {
            toast.success(data.message || "Registration successful!");
            router.push("/login");
          },
          onError: (err: any) => {
            toast.error(err.message);
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create an account</h1>
          <p className="text-muted-foreground">Start your learning journey today</p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">

              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="John"
                    className="pl-10"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={formik.touched.first_name && formik.errors.first_name ? "true" : "false"}
                  />
                </div>
                {formik.touched.first_name && formik.errors.first_name && (
                  <p className="text-sm text-destructive">{formik.errors.first_name}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Doe"
                    className="pl-10"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={formik.touched.last_name && formik.errors.last_name ? "true" : "false"}
                  />
                </div>
                {formik.touched.last_name && formik.errors.last_name && (
                  <p className="text-sm text-destructive">{formik.errors.last_name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={formik.touched.email && formik.errors.email ? "true" : "false"}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-destructive">{formik.errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={formik.touched.password && formik.errors.password ? "true" : "false"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-destructive">{formik.errors.password}</p>
                )}
              </div>

            

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading || !formik.isValid}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-foreground font-medium hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
