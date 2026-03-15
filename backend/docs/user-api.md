# User API – Tài liệu Postman

**Base URL**: `http://localhost:8000`  
**Prefix chung**: `/api/v1/user`

---

## 1. Đăng ký tài khoản

- **Method**: POST
- **URL**: `http://localhost:8000/api/v1/user/register`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "fullname": "Nguyen Van A",
  "email": "user@example.com",
  "phoneNumber": "0123456789",
  "password": "123456",
  "role": "student"
}
```

- **Response**:
  - 201 (thành công):

```json
{
  "message": "Tạo tài khoản thành công",
  "success": true
}
```

- 400 (thiếu trường):

```json
{
  "message": "Thiếu thông tin",
  "success": false
}
```

- 400 (email đã tồn tại):

```json
{
  "message": "Email này đã được đăng ký",
  "success": false
}
```

- 500 (lỗi server):

```json
{
  "message": "Lỗi máy chủ nội bộ",
  "success": false
}
```

---

## 2. Đăng nhập

- **Method**: POST
- **URL**: `http://localhost:8000/api/v1/user/login`
- **Authorization**: Không (nhận cookie JWT sau khi đăng nhập)
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "email": "user@example.com",
  "password": "123456",
  "role": "student"
}
```

- **Response**:
  - 200 (thành công) – cookie `token` được set trong trình duyệt/Postman:

```json
{
  "message": "Chào mừng trở lại Nguyen Van A",
  "success": true,
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "fullname": "Nguyen Van A",
    "phoneNumber": "0123456789",
    "profile": {
      "bio": "",
      "skills": [],
      "profilePhoto": ""
    },
    "role": "student"
  }
}
```

- 400 (thiếu trường):

```json
{
  "message": "Thiếu thông tin",
  "success": false
}
```

- 400 (sai email hoặc mật khẩu):

```json
{
  "message": "Email hoặc mật khẩu không chính xác",
  "success": false
}
```

- 400 (sai role):

```json
{
  "message": "Tài khoản không tồn tại với vai trò này",
  "success": false
}
```

- 500 (lỗi server):

```json
{
  "message": "Lỗi máy chủ nội bộ",
  "success": false
}
```

---

## 3. Đăng xuất

- **Method**: GET
- **URL**: `http://localhost:8000/api/v1/user/logout`
- **Authorization**: Không bắt buộc (thường gọi sau khi đã login)
- **Headers**:
  - `Cookie: token={jwt_token}` (Postman có thể tự đính kèm nếu đã login)
- **Body**: Không
- **Response**:
  - 200 (thành công):

```json
{
  "message": "Đăng xuất thành công",
  "success": true
}
```

- 500 (lỗi server):

```json
{
  "message": "Lỗi máy chủ nội bộ",
  "success": false
}
```

---

## 4. Cập nhật hồ sơ (yêu cầu đăng nhập)

- **Method**: POST
- **URL**: `http://localhost:8000/api/v1/user/profile/update`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Content-Type: application/json`
  - `Cookie: token={jwt_token}` (nếu Postman không tự gửi)
- **Body** (raw JSON, các trường đều _tùy chọn_):

```json
{
  "fullname": "Nguyen Van B",
  "email": "newemail@example.com",
  "phoneNumber": "0987654321",
  "bio": "Lập trình viên MERN",
  "skills": "JavaScript, React, Node.js"
}
```

> **Lưu ý**: Trường `skills` phải gửi dạng chuỗi phân cách bởi dấu phẩy: `"JavaScript, React, Node.js"`. Server sẽ tự động chuyển thành mảng.

- **Response**:
  - 200 (thành công):

```json
{
  "message": "Cập nhật hồ sơ thành công",
  "success": true,
  "user": {
    "_id": "...",
    "email": "newemail@example.com",
    "fullname": "Nguyen Van B",
    "phoneNumber": "0987654321",
    "profile": {
      "bio": "Lập trình viên MERN",
      "skills": ["JavaScript", "React", "Node.js"],
      "profilePhoto": ""
    },
    "role": "student"
  }
}
```

- 401 (chưa đăng nhập):

```json
{
  "message": "Người dùng chưa được xác thực",
  "success": false
}
```

- 401 (token không hợp lệ):

```json
{
  "message": "Token không hợp lệ",
  "success": false
}
```

- 404 (không tìm thấy user):

```json
{
  "message": "Không tìm thấy người dùng",
  "success": false
}
```

- 500 (lỗi server):

```json
{
  "message": "Lỗi máy chủ nội bộ",
  "success": false
}
```

---

## Ghi chú chung

- **Cookie JWT**: Sau khi đăng nhập thành công, server sẽ set cookie `token` với các thuộc tính:
  - `httpOnly: true`
  - `maxAge: 24 giờ`
  - `sameSite: strict`
- **Các role hợp lệ**: `student`, `recruiter` (tùy theo thiết kế hệ thống)

- **Postman Tips**:
  - Bật **"Save cookies"** để tự động lưu và gửi cookie trong các request tiếp theo
  - Kiểm tra tab **Cookies** để xem token đã được set chưa
