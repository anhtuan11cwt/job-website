# Application API – Tài liệu Postman

**Base URL**: `http://localhost:8000`  
**Prefix chung**: `/api/v1/application`

---

## 1. Nộp đơn ứng tuyển công việc (yêu cầu đăng nhập)

- **Method**: GET
- **URL**: `http://localhost:8000/api/v1/application/apply/{id_cong_viec}`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Cookie: token={jwt_token}`
- **Response**:
  - 201 (thành công):

```json
{
  "message": "Đã nộp đơn thành công",
  "success": true
}
```

  - 400 (đã nộp đơn trước đó hoặc thiếu mã công việc):

```json
{
  "message": "Bạn đã nộp đơn cho công việc này rồi",
  "success": false
}
```

  - 404 (không tìm thấy công việc):

```json
{
  "message": "Không tìm thấy công việc",
  "success": false
}
```

---

## 2. Lấy danh sách công việc đã ứng tuyển (yêu cầu đăng nhập)

- **Method**: GET
- **URL**: `http://localhost:8000/api/v1/application/get`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Cookie: token={jwt_token}`
- **Response**:
  - 200 (thành công):

```json
{
  "applications": [
    {
      "_id": "65f...",
      "applicant": "65e...",
      "job": {
        "_id": "65g...",
        "title": "Software Engineer",
        "company": {
          "name": "Tech Corp",
          "location": "Hà Nội"
        }
      },
      "status": "pending",
      "createdAt": "2024-03-20T..."
    }
  ],
  "success": true
}
```

---

## 3. Lấy danh sách ứng viên của một công việc (yêu cầu đăng nhập - Recruiter)

- **Method**: GET
- **URL**: `http://localhost:8000/api/v1/application/{id_cong_viec}/applicants`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Cookie: token={jwt_token}`
- **Response**:
  - 200 (thành công):

```json
{
  "job": {
    "_id": "65g...",
    "applications": [
      {
        "_id": "65f...",
        "applicant": {
          "fullname": "Nguyễn Văn A",
          "email": "vana@example.com",
          "phoneNumber": "0123456789"
        },
        "status": "pending"
      }
    ]
  },
  "success": true
}
```

  - 404 (không tìm thấy công việc):

```json
{
  "message": "Không tìm thấy công việc",
  "success": false
}
```

---

## 4. Cập nhật trạng thái đơn ứng tuyển (yêu cầu đăng nhập - Recruiter)

- **Method**: POST
- **URL**: `http://localhost:8000/api/v1/application/status/{id_don_ung_tuyen}/update`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Content-Type: application/json`
  - `Cookie: token={jwt_token}`
- **Body** (raw JSON):

```json
{
  "status": "Accepted"
}
```

> **Lưu ý**: Các giá trị `status` thông thường là: `pending`, `accepted`, `rejected`. Backend sẽ tự động chuyển về chữ thường để lưu trữ.

- **Response**:
  - 200 (thành công):

```json
{
  "message": "Cập nhật trạng thái thành công",
  "success": true
}
```

  - 400 (thiếu trạng thái):

```json
{
  "message": "Yêu cầu trạng thái",
  "success": false
}
```

  - 404 (không tìm thấy đơn ứng tuyển):

```json
{
  "message": "Không tìm thấy đơn ứng tuyển",
  "success": false
}
```

---

## Ghi chú chung

- API nộp đơn (`/apply/:id`) hiện đang sử dụng phương thức **GET** thay vì POST.
- Dữ liệu trả về từ các API lấy danh sách thường được **populate** thông tin liên quan (Job, Company, Applicant).
- Thứ tự các bản ghi được sắp xếp theo thời gian tạo mới nhất (`createdAt: -1`).
