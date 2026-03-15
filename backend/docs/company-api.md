# Company API – Tài liệu Postman

**Base URL**: `http://localhost:8000`  
**Prefix chung**: `/api/v1/company`

---

## 1. Đăng ký công ty (yêu cầu đăng nhập)

- **Method**: POST
- **URL**: `http://localhost:8000/api/v1/company/register`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Content-Type: application/json`
  - `Cookie: token={jwt_token}`
- **Body** (raw JSON):

```json
{
  "companyName": "Công ty Công nghệ ABC"
}
```

- **Response**:
  - 201 (thành công):

```json
{
  "company": {
    "_id": "65f...",
    "name": "Công ty Công nghệ ABC",
    "userId": "65e...",
    "createdAt": "...",
    "updatedAt": "..."
  },
  "message": "Đăng ký công ty thành công",
  "success": true
}
```

- 400 (thiếu tên công ty):

```json
{
  "message": "Tên công ty là bắt buộc",
  "success": false
}
```

- 400 (công ty đã tồn tại):

```json
{
  "message": "Bạn không thể đăng ký công ty trùng lặp",
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

## 2. Lấy danh sách công ty của người dùng (yêu cầu đăng nhập)

- **Method**: GET
- **URL**: `http://localhost:8000/api/v1/company/get`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Cookie: token={jwt_token}`
- **Body**: Không
- **Response**:
  - 200 (thành công):

```json
{
  "companies": [
    {
      "_id": "65f...",
      "name": "Công ty Công nghệ ABC",
      "userId": "65e...",
      "location": "Hà Nội",
      "website": "https://abc.com"
    }
  ],
  "message": "Lấy danh sách công ty thành công",
  "success": true
}
```

- 404 (không tìm thấy công ty):

```json
{
  "message": "Không tìm thấy công ty",
  "success": false
}
```

---

## 3. Lấy thông tin chi tiết công ty theo ID (yêu cầu đăng nhập)

- **Method**: GET
- **URL**: `http://localhost:8000/api/v1/company/get/{id_cong_ty}`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Cookie: token={jwt_token}`
- **Body**: Không
- **Response**:
  - 200 (thành công):

```json
{
  "company": {
    "_id": "65f...",
    "name": "Công ty Công nghệ ABC",
    "description": "...',
    "website": "...",
    "location": "...",
    "logo": "...",
    "userId": "..."
  },
  "message": "Lấy thông tin công ty thành công",
  "success": true
}
```

- 404 (không tìm thấy công ty):

```json
{
  "message": "Không tìm thấy công ty",
  "success": false
}
```

---

## 4. Cập nhật thông tin công ty (yêu cầu đăng nhập)

- **Method**: PUT
- **URL**: `http://localhost:8000/api/v1/company/update/{id_cong_ty}`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Content-Type: application/json`
  - `Cookie: token={jwt_token}`
- **Body** (raw JSON, các trường đều tùy chọn):

```json
{
  "name": "Công ty Công nghệ XYZ",
  "description": "Mô tả công ty mới",
  "website": "https://xyz.com",
  "location": "TP. Hồ Chí Minh"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "company": {
    "_id": "65f...",
    "name": "Công ty Công nghệ XYZ",
    "description": "Mô tả công ty mới",
    "website": "https://xyz.com",
    "location": "TP. Hồ Chí Minh",
    "userId": "..."
  },
  "message": "Cập nhật thông tin thành công",
  "success": true
}
```

- 404 (không tìm thấy công ty):

```json
{
  "message": "Không tìm thấy công ty",
  "success": false
}
```

---

## Ghi chú chung

- Tài liệu này áp dụng cho role **recruiter**. 
- API cập nhật công ty sử dụng method `PUT` theo route file.
- Đảm bảo bạn đã đăng nhập để có `token` trong cookie.
