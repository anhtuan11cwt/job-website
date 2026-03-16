import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function UpdateProfileDialog({ open, setOpen }) {
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    bio: user?.profile?.bio || "",
    email: user?.email || "",
    file: null,
    fullname: user?.fullname || "",
    phoneNumber: user?.profile?.phoneNumber || "",
    skills: user?.profile?.skills?.join(", ") || "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const fileEventHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("resume", input.file);
    }
    console.log("Form Data:", Object.fromEntries(formData));
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Cập nhật hồ sơ</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin cá nhân của bạn tại đây.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="fullname">
                Họ tên
              </Label>
              <Input
                className="col-span-3"
                id="fullname"
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Nhập họ tên của bạn"
                value={input.fullname}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="email">
                Email
              </Label>
              <Input
                className="col-span-3"
                id="email"
                name="email"
                onChange={changeEventHandler}
                placeholder="Nhập email của bạn"
                type="email"
                value={input.email}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="phoneNumber">
                Số điện thoại
              </Label>
              <Input
                className="col-span-3"
                id="phoneNumber"
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="Nhập số điện thoại"
                value={input.phoneNumber}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="bio">
                Tiểu sử
              </Label>
              <Input
                className="col-span-3"
                id="bio"
                name="bio"
                onChange={changeEventHandler}
                placeholder="Nhập tiểu sử ngắn về bạn"
                value={input.bio}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="skills">
                Kỹ năng
              </Label>
              <Input
                className="col-span-3"
                id="skills"
                name="skills"
                onChange={changeEventHandler}
                placeholder="Nhập kỹ năng (phân cách bằng dấu phẩy)"
                value={input.skills}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="resume">
                Sơ yếu lý lịch
              </Label>
              <Input
                accept="application/pdf"
                className="col-span-3"
                id="resume"
                name="resume"
                onChange={fileEventHandler}
                type="file"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setOpen(false)}
              type="button"
              variant="outline"
            >
              Hủy
            </Button>
            <Button type="submit">Cập nhật</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfileDialog;
