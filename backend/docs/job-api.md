# Job API – Tài liệu Postman

**Base URL**: `http://localhost:8000`  
**Prefix chung**: `/api/v1/job`

---

## 1. Đăng tuyển công việc mới (yêu cầu đăng nhập - Recruiter)

- **Method**: POST
- **URL**: `http://localhost:8000/api/v1/job/post`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Content-Type: application/json`
  - `Cookie: token={jwt_token}`
- **Body** (raw JSON):

```json
{
  "title": "Frontend Developer",
  "description": "Làm việc với ReactJS và các công nghệ hiện đại",
  "requirements": "ReactJS, TailwindCSS, Redux Toolkit",
  "salary": 20000000,
  "location": "Hà Nội",
  "jobType": "Full-time",
  "experienceLevel": "2 năm",
  "position": 2,
  "companyId": "65f..." 
}
```

> **Lưu ý**: Trường `requirements` được gửi dạng chuỗi phân cách bởi dấu phẩy. `salary` và `position` nên là số.

- **Response**:
  - 201 (thành công):

```json
{
  "job": {
    "_id": "65g...",
    "title": "Frontend Developer",
    "description": "...",
    "requirements": ["ReactJS", "TailwindCSS", "Redux Toolkit"],
    "salary": 20000000,
    "location": "Hà Nội",
    "jobType": "Full-time",
    "experienceLevel": "2 năm",
    "position": 2,
    "company": "65f...",
    "created_by": "65e..."
  },
  "message": "Tạo công việc mới thành công",
  "success": true
}
```

- 400 (thiếu thông tin):

```json
{
  "message": "Vui lòng điền đầy đủ thông tin",
  "success": false
}
```

---

## 2. Lấy danh sách tất cả công việc (yêu cầu đăng nhập)

- **Method**: GET
- **URL**: `http://localhost:8000/api/v1/job/get`
- **Query Params**:
  - `keyword` (Tùy chọn): Tìm kiếm theo tiêu đề hoặc mô tả. Ví dụ: `?keyword=Frontend`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Cookie: token={jwt_token}`
- **Response**:
  - 200 (thành công):

```json
{
  "jobs": [
    {
      "_id": "65g...",
      "title": "Frontend Developer",
      "company": {
         "name": "Công ty ABC",
         "location": "..."
      },
      ...
    }
  ],
  "success": true
}
```

---

## 3. Lấy danh sách công việc do Admin tạo (yêu cầu đăng nhập - Recruiter)

- **Method**: GET
- **URL**: `http://localhost:8000/api/v1/job/getadminjobs`
- **Authorization**:
  - **Loại**: Cookie JWT (`token`)
- **Headers**:
  - `Cookie: token={jwt_token}`
- **Response**:
  - 200 (thành công):

```json
{
  "jobs": [
    {
      "_id": "65g...",
      "title": "Frontend Developer",
      "company": { ... },
      "created_by": "..."
    }
  ],
  "success": true
}
```

---

## 4. Lấy chi tiết công việc theo ID (yêu cầu đăng nhập)

- **Method**: GET
- **URL**: `http://localhost:8000/api/v1/job/get/{id_cong_viec}`
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
    "title": "Frontend Developer",
    "company": { ... },
    ...
  },
  "success": true
}
```

- 404 (không tìm thấy):

```json
{
  "message": "Không tìm thấy công việc",
  "success": false
}
```

---

## Ghi chú chung

- Phản hồi của API lấy danh sách công việc thường bao gồm việc **populate** thông tin công ty.
- Thứ tự công việc được sắp xếp theo thời gian tạo mới nhất (`createdAt: -1`).
- Đảm bảo người dùng có role phù hợp (thường là `recruiter` để đăng và xem công việc của mình).
