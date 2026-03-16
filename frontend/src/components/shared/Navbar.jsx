import { LogOut, User2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Navbar() {
  const [user, setUser] = useState(null);

  const navLinks = [
    { href: "/", name: "Trang chủ" },
    { href: "/jobs", name: "Việc làm" },
    { href: "/browse", name: "Tìm việc" },
  ];

  return (
    <nav className="bg-white border-border border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <Link className="flex-shrink-0" to="/">
            <h1 className="font-bold text-2xl tracking-tight">
              Cổng Việc <span className="text-[#F83002]">Làm</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-5">
            <ul className="flex items-center gap-5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    className="font-medium text-muted-foreground hover:text-foreground text-sm transition-colors"
                    to={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost">Đăng nhập</Button>
                </Link>
                <Link to="/signup">
                  <Button>Đăng ký</Button>
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="relative hover:bg-muted rounded-full w-10 h-10 cursor-pointer"
                    size="icon"
                    variant="ghost"
                  >
                    <Avatar>
                      <AvatarImage alt={user.name} src={user.photoUrl} />
                      <AvatarFallback>
                        {user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-88">
                  <div className="flex items-center gap-3 p-2">
                    <Avatar>
                      <AvatarImage alt={user.name} src={user.photoUrl} />
                      <AvatarFallback>
                        {user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">
                        {user.name || "Người dùng"}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {user.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <Button
                      asChild
                      className="justify-start gap-2 w-full"
                      variant="ghost"
                    >
                      <Link to="/profile">
                        <User2 className="size-4" />
                        Xem hồ sơ
                      </Link>
                    </Button>
                    <Button
                      className="justify-start gap-2 w-full text-destructive hover:text-destructive"
                      onClick={() => setUser(null)}
                      variant="ghost"
                    >
                      <LogOut className="size-4" />
                      Đăng xuất
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
