import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { USER_API_END_POINT } from "@/utils/constant";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Đăng nhập không thành công",
      );
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="font-bold text-2xl text-center">
            Đăng nhập vào tài khoản
          </CardTitle>
          <CardDescription className="text-center">
            Nhập email và mật khẩu để đăng nhập
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                onChange={changeEventHandler}
                placeholder="Nhập email của bạn"
                required
                type="email"
                value={input.email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  className="pr-10"
                  id="password"
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Nhập mật khẩu của bạn"
                  required
                  type={showPassword ? "text" : "password"}
                  value={input.password}
                />
                <Button
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="button"
                  variant="ghost"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Vai trò</Label>
              <RadioGroup
                className="flex gap-4"
                defaultValue="student"
                onValueChange={(value) => setInput({ ...input, role: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="student" value="student" />
                  <Label className="cursor-pointer" htmlFor="student">
                    Ứng viên
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="recruiter" value="recruiter" />
                  <Label className="cursor-pointer" htmlFor="recruiter">
                    Nhà tuyển dụng
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button className="w-full" type="submit">
              Đăng nhập
            </Button>
          </form>
          <div className="mt-4 text-sm text-center">
            Bạn chưa có tài khoản?{" "}
            <Link className="text-primary hover:underline" to="/signup">
              Đăng ký
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
