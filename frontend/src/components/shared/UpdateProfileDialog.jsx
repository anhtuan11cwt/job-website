import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

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
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

function UpdateProfileDialog({ open, setOpen }) {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {};

      if (input.fullname && input.fullname !== user?.fullname) {
        payload.fullname = input.fullname;
      }
      if (input.email && input.email !== user?.email) {
        payload.email = input.email;
      }
      if (
        input.phoneNumber &&
        input.phoneNumber !== String(user?.phoneNumber ?? "")
      ) {
        payload.phoneNumber = input.phoneNumber;
      }
      const originalSkills = (user?.profile?.skills || []).join(", ");
      if (input.bio && input.bio !== user?.profile?.bio) {
        payload.bio = input.bio;
      }
      if (input.skills && input.skills !== originalSkills) {
        payload.skills = input.skills;
      }

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Cập nhật hồ sơ thành công");
        setOpen(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Cập nhật hồ sơ không thành công",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent
        className="sm:max-w-[525px]"
        onInteractOutside={(event) => event.preventDefault()}
      >
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
                onChange={fileChangeHandler}
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
            <Button disabled={loading} type="submit">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Vui lòng đợi
                </>
              ) : (
                "Cập nhật"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfileDialog;
