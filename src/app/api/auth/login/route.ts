import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";

const users = [
  {
    email: "admin@gmail.com",
    password: await bcrypt.hash("admin123456", 10),
  },
];

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = users.find((u) => u.email === email);
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "7d" });

  const res = NextResponse.json({ message: "Logged in" });
 res.cookies.set({
  name: "token",
  value: token,
  httpOnly: true,    
  path: "/",        
  maxAge: 7 * 24 * 60 * 60, 
  sameSite: "lax",  
  secure: process.env.NODE_ENV === "production", 
});


  return res;
}
