"use client"

import { useState } from "react"
import Link from "next/link"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLogin } from "@/features/auth/useLogin"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth"

const loginSchema = Yup.object({
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
    const login = useLogin();

const router = useRouter()
const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
  onSubmit: async (values) => {
    setIsLoading(true);
  login.mutate(values, {
    onSuccess: (data) => {
      toast.success("Login successful!");

      useAuthStore.getState().setTokens(
        data.tokens.access,
        data.tokens.refresh
      );

      router.push("/profile");
    },

    onError: (err) => {
      toast.error(err.message); // axios interceptor gives correct message
    },
    onSettled: () => {
            setIsLoading(false);
          },
  });
},

  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="grid grid-cols-2">
            <div className="">
                Logo
                </div>
        </div>
        <div>
 <Card className="border-border shadow-lg ">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-foreground font-medium hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
        </div>
       

       

        
      </div>
    </div>
  )
}
