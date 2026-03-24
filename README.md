# Cổng Việc Làm — Nền tảng tuyển dụng việc làm

Ứng dụng web tuyển dụng việc làm full-stack xây dựng bằng MERN Stack (MongoDB, Express.js, React, Node.js). Hỗ trợ hai vai trò: **Ứng viên** tìm kiếm và nộp đơn xin việc, **Nhà tuyển dụng** đăng tin và quản lý ứng viên.

---

## Mục lục

- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
- [Data Models](#data-models)
- [API Endpoints](#api-endpoints)
- [Tính năng](#tính-năng)
- [Quy trình người dùng](#quy-trình-người-dùng)
- [Quản lý trạng thái](#quản-lý-trạng-thái)
- [Cài đặt & Chạy dự án](#cài-dặt--chạy-dự-án)
- [Công cụ phát triển](#công-cụ-phát-triển)
- [Tác giả](#tác-giả)

---

## Công nghệ sử dụng

### Backend

| Thư viện | Phiên bản | Mô tả |
|----------|-----------|-------|
| **Node.js** | >= 18 | Runtime environment |
| **Express.js** | v5.2 | Framework REST API |
| **MongoDB** + **Mongoose** | v9.3 | Cơ sở dữ liệu NoSQL + ODM |
| **jsonwebtoken** | v9.0 | Xác thực JWT (token hết hạn sau 1 ngày) |
| **bcryptjs** | v3.0 | Mã hóa mật khẩu (salt rounds: 10) |
| **Cloudinary** | v1.41 | Lưu trữ ảnh (profile photo, logo công ty) và CV (PDF) |
| **Multer** | v2.1 | Middleware xử lý multipart/form-data (upload file) |
| **cookie-parser** | v1.4 | Parse JWT token từ HTTP-only cookie |
| **cors** | v2.8 | Cho phép CORS với credentials |
| **dotenv** | v17.3 | Quản lý biến môi trường |

### Frontend

| Thư viện | Phiên bản | Mô tả |
|----------|-----------|-------|
| **React** | v19.2 | UI library |
| **Vite** | v8.0 | Build tool & dev server |
| **React Router DOM** | v7.13 | Điều hướng client-side (14 routes) |
| **Redux Toolkit** | v2.11 | Quản lý state tập trung (4 slices) |
| **redux-persist** | v6.0 | Persist state vào localStorage |
| **Tailwind CSS** | v4.2 | Utility-first CSS framework |
| **shadcn/ui** | v4.0 | Component library (Radix UI primitives) |
| **Axios** | v1.13 | HTTP client gọi REST API |
| **Sonner** | v2.0 | Toast notification |
| **lucide-react** | v0.577 | Icon library |
| **class-variance-authority** | v0.7 | Quản lý variant class cho component |
| **Biome** | v2.4 | Linter & formatter |

### UI Components (shadcn/ui)

Dự án sử dụng 12 component từ shadcn/ui: `avatar`, `badge`, `button`, `card`, `carousel`, `dialog`, `input`, `label`, `popover`, `radio-group`, `select`, `table`.

---

## Cấu trúc dự án

```
job-website/
├── backend/
│   ├── controllers/
│   │   ├── user.controller.js          # Đăng ký, đăng nhập, đăng xuất, cập nhật hồ sơ
│   │   ├── company.controller.js       # CRUD công ty
│   │   ├── job.controller.js           # Đăng tin, lấy danh sách việc làm
│   │   └── application.controller.js   # Ứng tuyển, quản lý đơn ứng tuyển
│   ├── middleware/
│   │   └── isAuthenticated.js          # Middleware xác thực JWT từ cookie
│   ├── models/
│   │   ├── User.js                     # Schema: fullname, email, password, phoneNumber, role, profile
│   │   ├── Company.js                  # Schema: name, description, website, location, logo, userId
│   │   ├── Job.js                      # Schema: title, description, requirements, salary, location, jobType, experienceLevel, position, company, created_by, applications
│   │   └── Application.js             # Schema: job, applicant, status (pending/accepted/rejected)
│   ├── routes/
│   │   ├── user.route.js               # /api/v1/user/*
│   │   ├── company.route.js            # /api/v1/company/*
│   │   ├── job.route.js                # /api/v1/job/*
│   │   └── application.route.js        # /api/v1/application/*
│   ├── utils/
│   │   ├── db.js                       # Kết nối MongoDB
│   │   ├── cloudinary.js               # Cấu hình Cloudinary SDK
│   │   └── dataUri.js                  # Chuyển buffer file thành data URI
│   ├── .env                            # Biến môi trường (không commit)
│   ├── index.js                        # Entry point Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── admin/                   # Giao diện quản lý (recruiter)
    │   │   │   ├── Companies.jsx        # Danh sách công ty + tìm kiếm
    │   │   │   ├── CompaniesTable.jsx   # Bảng hiển thị công ty
    │   │   │   ├── CompanyCreate.jsx    # Tạo công ty mới
    │   │   │   ├── CompanySetup.jsx     # Cập nhật thông tin công ty + logo
    │   │   │   ├── AdminJobs.jsx        # Danh sách việc làm đã đăng
    │   │   │   ├── AdminJobsTable.jsx   # Bảng hiển thị việc làm
    │   │   │   ├── PostJob.jsx          # Đăng tin tuyển dụng mới
    │   │   │   ├── Applicants.jsx       # Danh sách ứng viên theo job
    │   │   │   └── ApplicantsTable.jsx  # Bảng ứng viên + cập nhật trạng thái
    │   │   ├── shared/                  # Component dùng chung
    │   │   │   ├── Navbar.jsx           # Thanh điều hướng (phân biệt theo role)
    │   │   │   ├── Footer.jsx           # Chân trang
    │   │   │   ├── HeroSection.jsx      # Banner tìm kiếm trang chủ
    │   │   │   ├── CategoryCarousel.jsx # Carousel danh mục nghề nghiệp
    │   │   │   ├── LatestJobs.jsx       # Section việc làm mới nhất
    │   │   │   ├── LatestJobCards.jsx   # Card việc làm (trang chủ)
    │   │   │   ├── Job.jsx              # Card việc làm (trang danh sách)
    │   │   │   ├── FilterCard.jsx       # Bộ lọc (địa điểm, ngành nghề, lương)
    │   │   │   ├── AppliedJobTable.jsx  # Bảng việc đã ứng tuyển
    │   │   │   ├── UpdateProfileDialog.jsx  # Dialog cập nhật hồ sơ
    │   │   │   ├── ProtectedRoute.jsx   # Route bảo vệ (yêu cầu đăng nhập)
    │   │   │   └── AuthRoute.jsx        # Route xác thực (chuyển hướng nếu đã đăng nhập)
    │   │   └── ui/                      # shadcn/ui primitives (12 components)
    │   ├── hooks/                       # Custom hooks gọi API
    │   │   ├── useGetAllJobs.js         # Lấy tất cả việc làm
    │   │   ├── useGetSingleJob.js       # Lấy chi tiết 1 việc làm
    │   │   ├── useGetAllAdminJobs.js    # Lấy việc làm của recruiter
    │   │   ├── useGetAllCompanies.js    # Lấy danh sách công ty
    │   │   ├── useGetCompanyById.js     # Lấy chi tiết công ty
    │   │   ├── useGetAppliedJobs.js     # Lấy việc đã ứng tuyển
    │   │   └── useGetAllApplicants.js   # Lấy danh sách ứng viên
    │   ├── pages/                       # Trang chính
    │   │   ├── Home.jsx                 # Trang chủ (HeroSection + CategoryCarousel + LatestJobs + Footer)
    │   │   ├── Login.jsx                # Đăng nhập (email, password, role)
    │   │   ├── Signup.jsx               # Đăng ký (fullname, email, phone, password, role, avatar)
    │   │   ├── Jobs.jsx                 # Danh sách việc làm (bộ lọc + grid)
    │   │   ├── Browse.jsx               # Tìm kiếm việc làm (search + filter)
    │   │   ├── Profile.jsx              # Hồ sơ cá nhân + lịch sử ứng tuyển
    │   │   └── JobDescription.jsx       # Chi tiết việc làm + nút ứng tuyển
    │   ├── redux/                       # Quản lý state
    │   │   ├── store.js                 # Redux store + redux-persist config
    │   │   ├── authSlice.js             # State: { loading, user }
    │   │   ├── jobSlice.js              # State: { allJobs, allAdminJobs, allAppliedJobs, filterdJobs, singleJob, search/filter }
    │   │   ├── companySlice.js          # State: { companies, singleCompany, searchCompanyByText }
    │   │   └── applicationSlice.js      # State: { applicants }
    │   ├── utils/
    │   │   ├── constant.js              # API endpoints, categories, filter data, mock data
    │   │   └── utils.js                 # formatCurrency, formatSalary, daysAgoFunction
    │   ├── App.jsx                      # Định nghĩa routes (14 routes)
    │   ├── main.jsx                     # Entry point (Provider, PersistGate, BrowserRouter, Toaster)
    │   └── index.css                    # Global styles + Tailwind
    ├── vite.config.js                   # Vite config (alias @, @redux)
    └── package.json
```

---

## Kiến trúc hệ thống

### Luồng xác thực

```
┌─────────────┐     POST /login      ┌──────────────────┐
│   Browser    │ ──────────────────►  │  Express Server   │
│  (React)     │                      │                   │
│              │  ◄────────────────── │  JWT Token        │
│              │   Set-Cookie: token  │  (httpOnly, 1d)   │
│              │   (httpOnly)         │                   │
└─────────────┘                      └──────────────────┘

Mọi request sau đó tự động gửi cookie "token" kèm theo.
Middleware isAuthenticated.js xác minh JWT và gán req.id = userId.
```

### Luồng upload file

```
Browser (FormData) ──► Multer (memoryStorage) ──► getDataUri() ──► Cloudinary ──► secure_url
                                                                    │
                                                    ◄───────────────┘
                                                    Lưu URL vào MongoDB
```

- **Profile Photo**: Upload ảnh → Cloudinary → Lưu vào `user.profile.profilePhoto`
- **CV/Resume**: Upload PDF → Cloudinary → Lưu vào `user.profile.resume`
- **Company Logo**: Upload ảnh → Cloudinary → Lưu vào `company.logo`

### Luồng dữ liệu Frontend

```
Component ──► Custom Hook (useEffect) ──► Axios API Call ──► Backend
    │                                        │
    │                                        ▼
    │                                  Response OK?
    │                                   ├── Yes ──► dispatch(setData) ──► Redux Store
    │                                   └── No  ──► toast.error()
    │
    └──► useSelector(store) ──► Re-render với data mới
```

---

## Data Models

### User

```javascript
{
  fullname: String (required),
  email: String (required, unique),
  password: String (required),              // bcrypt hash
  phoneNumber: Number (required),
  role: String (enum: ["student", "recruiter"]),
  profile: {
    bio: String,
    skills: [String],                        // Mảng kỹ năng
    resume: String,                          // URL Cloudinary (PDF)
    resumeOriginalName: String,              // Tên file gốc
    profilePhoto: String,                    // URL Cloudinary (ảnh)
    company: ObjectId (ref: "Company")       // Chỉ recruiter
  },
  timestamps: true                          // createdAt, updatedAt
}
```

### Company

```javascript
{
  name: String (required, unique),
  description: String,
  website: String,
  location: String,
  logo: String,                             // URL Cloudinary (ảnh)
  userId: ObjectId (ref: "User", required), // Người tạo công ty
  timestamps: true
}
```

### Job

```javascript
{
  title: String (required),
  description: String (required),
  requirements: [String],                    // Mảng yêu cầu
  salary: Number (required),                 // Đơn vị: VND
  location: String (required),
  jobType: String (required),               // Full-time, Part-time, Internship, Contract, Freelance
  experienceLevel: String (required),        // Junior, Mid-level, Senior, Lead, Manager
  position: Number (required),              // Số lượng cần tuyển
  company: ObjectId (ref: "Company", required),
  created_by: ObjectId (ref: "User", required),
  applications: [ObjectId (ref: "Application")],
  timestamps: true
}
```

### Application

```javascript
{
  job: ObjectId (ref: "Job", required),
  applicant: ObjectId (ref: "User", required),
  status: String (enum: ["pending", "accepted", "rejected"], default: "pending"),
  timestamps: true
}
```

### Quan hệ giữa các model

```
User (recruiter) ──1:N──► Company ──1:N──► Job ──1:N──► Application ◄──N:1── User (student)
```

---

## API Endpoints

Tất cả API đều trả về format: `{ success: Boolean, message?: String, data? }`

### User — `/api/v1/user`

| Method | Endpoint | Mô tả | Auth | Request Body |
|--------|----------|--------|------|-------------|
| POST | `/register` | Đăng ký tài khoản | ✗ | `{ fullname, email, phoneNumber, password, role }` |
| POST | `/login` | Đăng nhập, trả JWT trong httpOnly cookie | ✗ | `{ email, password, role }` |
| GET | `/logout` | Đăng xuất (xóa cookie) | ✗ | — |
| POST | `/profile/update` | Cập nhật hồ sơ (multipart/form-data) | ✓ | `{ fullname?, email?, phoneNumber?, bio?, skills?, profilePhoto?, resume? }` |

### Company — `/api/v1/company`

| Method | Endpoint | Mô tả | Auth | Request Body |
|--------|----------|--------|------|-------------|
| POST | `/register` | Tạo công ty mới | ✓ | `{ companyName }` |
| GET | `/get` | Lấy danh sách công ty của recruiter hiện tại | ✓ | — |
| GET | `/get/:id` | Lấy thông tin công ty theo ID | ✓ | — |
| PUT | `/update/:id` | Cập nhật thông tin & logo công ty (multipart/form-data) | ✓ | `{ name?, description?, website?, location?, logo? }` |

### Job — `/api/v1/job`

| Method | Endpoint | Mô tả | Auth | Request Body |
|--------|----------|--------|------|-------------|
| POST | `/post` | Đăng tin tuyển dụng mới | ✓ | `{ title, description, requirements, salary, location, jobType, experienceLevel, position, companyId }` |
| GET | `/get` | Lấy tất cả việc làm (hỗ trợ tìm kiếm qua `?keyword=`) | ✓ | — |
| GET | `/getadminjobs` | Lấy việc làm do recruiter hiện tại đăng | ✓ | — |
| GET | `/get/:id` | Lấy chi tiết việc làm (populate company + applications) | ✓ | — |

### Application — `/api/v1/application`

| Method | Endpoint | Mô tả | Auth | Request Body |
|--------|----------|--------|------|-------------|
| GET | `/apply/:id` | Nộp đơn ứng tuyển (tự kiểm tra trùng lặp) | ✓ | — |
| GET | `/get` | Lấy danh sách việc đã ứng tuyển (populate job + company) | ✓ | — |
| GET | `/:id/applicants` | Lấy danh sách ứng viên của một job | ✓ | — |
| POST | `/status/:id/update` | Cập nhật trạng thái đơn ứng tuyển | ✓ | `{ status }` |

---

## Tính năng

### Ứng viên (Student)

- **Đăng ký / Đăng nhập**: Chọn vai trò "Ứng viên", nhập thông tin cá nhân. Mật khẩu được mã hóa bằng bcrypt trước khi lưu vào MongoDB.
- **Tìm kiếm việc làm**: 
  - Trang chủ: Thanh tìm kiếm với keyword, carousel danh mục nghề nghiệp (8 danh mục: Frontend, Backend, Fullstack, Data Science, DevOps, Mobile, AI/ML, Graphic Design)
  - Trang `/jobs`: Danh sách đầy đủ với bộ lọc sidebar (địa điểm: Hà Nội/TP.HCM/Đà Nẵng/Cần Thơ, ngành nghề, mức lương: 0-10/10-25/25-50/trên 50 triệu)
  - Trang `/browse`: Tìm kiếm nâng cao + filter + grid hiển thị kết quả
- **Xem chi tiết việc làm** (`/description/:id`): Hiển thị đầy đủ thông tin (tiêu đề, công ty, địa điểm, loại hình, lương, số lượng, mô tả, yêu cầu, ngày đăng, số người đã ứng tuyển). Nút "Ứng tuyển ngay" chỉ hiện khi chưa đăng nhập.
- **Quản lý hồ sơ** (`/profile`): Cập nhật họ tên, email, số điện thoại, tiểu sử, kỹ năng (phân cách dấu phẩy), ảnh đại diện (upload lên Cloudinary), CV dạng PDF (upload lên Cloudinary).
- **Lịch sử ứng tuyển**: Bảng hiển thị ngày ứng tuyển, vị trí, công ty, trạng thái (Đang chờ/Đã chấp nhận/Đã từ chối).

### Nhà tuyển dụng (Recruiter)

- **Quản lý công ty** (`/admin/companies`):
  - Tạo công ty mới với tên
  - Danh sách công ty với tìm kiếm theo tên
  - Chỉnh sửa thông tin: tên, mô tả, website, địa điểm, logo
- **Quản lý tuyển dụng** (`/admin/jobs`):
  - Đăng tin tuyển dụng: tiêu đề, công ty (chọn từ dropdown), loại công việc (Full-time/Part-time/Internship/Contract/Freelance), cấp độ kinh nghiệm (Junior/Mid-level/Senior/Lead/Manager), địa điểm (10 thành phố), lương, số lượng, mô tả, yêu cầu
  - Danh sách việc làm đã đăng với tìm kiếm
  - Xem danh sách ứng viên theo từng vị trí
- **Quản lý ứng viên** (`/admin/jobs/:id/applicants`):
  - Danh sách ứng viên: họ tên, email, liên hệ, CV (link xem), ngày nộp
  - Cập nhật trạng thái: Chấp nhận / Từ chối

### Giao diện chung

- **Navbar phân biệt vai trò**: Student xem Trang chủ/Việc làm/Tìm việc; Recruiter xem Công ty/Công việc
- **Popover menu**: Avatar → Xem hồ sơ (student) / Đăng xuất
- **Protected Route**: Tự động chuyển hướng về `/login` nếu chưa đăng nhập
- **Auth Route**: Tự động chuyển hướng về `/` nếu đã đăng nhập (trang login/signup)
- **Toast notification**: Thông báo thành công/thất bại cho mọi thao tác

---

## Quy trình người dùng

### Flow Ứng viên

```
1. Truy cập trang chủ (/) → Xem HeroSection, CategoryCarousel, LatestJobs
2. Đăng ký (/signup) → Chọn role "Ứng viên" → Nhập thông tin → Đăng ký thành công
3. Đăng nhập (/login) → Chọn role "Ứng viên" → Đăng nhập
4. Tìm kiếm việc làm:
   - Từ trang chủ: Nhập keyword → Chuyển sang /browse
   - Từ CategoryCarousel: Click danh mục → Chuyển sang /browse với keyword
   - Trực tiếp /jobs: Xem danh sách + bộ lọc
5. Click "Chi tiết" → /description/:id → Xem thông tin việc làm
6. Click "Ứng tuyển ngay" → Gọi API /apply/:id
7. Vào /profile → Xem hồ sơ + lịch sử ứng tuyển + cập nhật thông tin
```

### Flow Nhà tuyển dụng

```
1. Đăng ký (/signup) → Chọn role "Nhà tuyển dụng" → Đăng ký thành công
2. Đăng nhập (/login) → Chọn role "Nhà tuyển dụng" → Tự động chuyển về /admin/companies
3. Tạo công ty (/admin/companies/create) → Nhập tên → Tiếp tục
4. Thiết lập công ty (/admin/companies/:id) → Nhập mô tả, website, địa điểm, logo
5. Đăng tin tuyển dụng (/admin/jobs/create) → Điền đầy đủ thông tin → Đăng tin
6. Quản lý việc làm (/admin/jobs) → Xem danh sách → Click "Ứng viên"
7. Quản lý ứng viên (/admin/jobs/:id/applicants) → Xem danh sách → Chấp nhận/Từ chối
```

---

## Quản lý trạng thái

### Redux Store Structure

```javascript
{
  auth: {
    loading: Boolean,          // Trạng thái loading khi đăng nhập/đăng ký
    user: Object | null        // Thông tin người dùng hiện tại (persist)
  },
  job: {
    allJobs: Array,            // Tất cả việc làm (từ API)
    allAdminJobs: Array,       // Việc làm của recruiter
    allAppliedJobs: Array,     // Việc đã ứng tuyển (student)
    singleJob: Object | null,  // Chi tiết một việc làm
    filterdJobs: Array,        // Việc làm sau khi filter
    searchJobByText: String,   // Keyword tìm kiếm
    selectedLocation: String,  // Filter địa điểm
    selectedRole: String,      // Filter ngành nghề
    selectedSalary: String     // Filter mức lương
  },
  company: {
    companies: Array,          // Danh sách công ty
    singleCompany: Object | null, // Chi tiết công ty
    searchCompanyByText: String   // Keyword tìm kiếm công ty
  },
  application: {
    applicants: Array          // Danh sách ứng viên (cho một job)
  }
}
```

### Custom Hooks

| Hook | Mô tả | API Called |
|------|--------|-----------|
| `useGetAllJobs()` | Lấy tất cả việc làm, dispatch `setAllJobs` | `GET /api/v1/job/get` |
| `useGetSingleJob(jobId)` | Lấy chi tiết việc làm, dispatch `setSingleJob` | `GET /api/v1/job/get/:id` |
| `useGetAllAdminJobs()` | Lấy việc làm của recruiter, dispatch `setAllAdminJobs` | `GET /api/v1/job/getadminjobs` |
| `useGetAllCompanies()` | Lấy công ty của recruiter, dispatch `setCompanies` | `GET /api/v1/company/get` |
| `useGetCompanyById()` | Lấy chi tiết công ty, dispatch `setSingleCompany` | `GET /api/v1/company/get/:id` |
| `useGetAppliedJobs()` | Lấy việc đã ứng tuyển, dispatch `setAllAppliedJobs` | `GET /api/v1/application/get` |
| `useGetAllApplicants(jobId)` | Lấy ứng viên của job, dispatch `setAllApplicants` | `GET /api/v1/application/:id/applicants` |

### Filter Logic (jobSlice)

Client-side filtering hoạt động trên Redux state `allJobs`:
- **Search**: Lọc theo title, description, location, company.name (không phân biệt hoa thường)
- **Location**: So sánh chính xác location
- **Role**: Lọc theo title hoặc jobTitle có chứa keyword
- **Salary**: Parse số từ salary string, phân loại theo khoảng: 0-10, 10-25, 25-50, trên 50 triệu

---

## Cài đặt & Chạy dự án

### Yêu cầu hệ thống

- **Node.js** >= 18
- **MongoDB** (local hoặc MongoDB Atlas)
- **Tài khoản Cloudinary** (miễn phí tại cloudinary.com)

### 1. Clone dự án

```bash
git clone <repository-url>
cd job-website
```

### 2. Cài đặt & chạy Backend

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend/`:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/job-website
# hoặc MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/job-website

# Server Port
PORT=8000

# JWT Secret Key (nên dùng chuỗi ngẫu nhiên dài >= 32 ký tự)
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Chạy server development:

```bash
npm run dev
# Server chạy tại http://localhost:8000
```

Các scripts có sẵn:
- `npm run dev` — Chạy với nodemon (auto-reload)
- `npm start` — Chạy production
- `npm run lint` — Kiểm tra ESLint
- `npm run check` — Kiểm tra & sửa bằng Biome
- `npm run format` — Format code bằng Biome

### 3. Cài đặt & chạy Frontend

```bash
cd frontend
npm install
npm run dev
# Frontend chạy tại http://localhost:5173
```

Các scripts có sẵn:
- `npm run dev` — Chạy Vite dev server
- `npm run build` — Build production
- `npm run preview` — Preview production build
- `npm run lint` — Kiểm tra ESLint
- `npm run check` — Kiểm tra & sửa bằng Biome

### 4. Truy cập ứng dụng

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Health check**: http://localhost:8000/home

---

## Routes (Frontend)

| Path | Component | Auth | Vai trò |
|------|-----------|------|---------|
| `/` | Home | ✗ | Tất cả |
| `/login` | Login | AuthRoute | Chưa đăng nhập |
| `/signup` | Signup | AuthRoute | Chưa đăng nhập |
| `/jobs` | Jobs | ✗ | Tất cả |
| `/browse` | Browse | ✗ | Tất cả |
| `/description/:id` | JobDescription | ✗ | Tất cả |
| `/profile` | Profile | Protected | Student |
| `/admin/companies` | Companies | Protected | Recruiter |
| `/admin/companies/create` | CompanyCreate | Protected | Recruiter |
| `/admin/companies/:id` | CompanySetup | Protected | Recruiter |
| `/admin/jobs` | AdminJobs | Protected | Recruiter |
| `/admin/jobs/create` | PostJob | Protected | Recruiter |
| `/admin/jobs/:id/applicants` | Applicants | Protected | Recruiter |

---

## Công cụ phát triển

| Công cụ | Mục đích |
|---------|----------|
| **Biome** | Lint & format code (thay thế ESLint + Prettier) |
| **ESLint** | Lint JavaScript/JSX (cấu hình song song với Biome) |
| **nodemon** | Auto-reload backend khi thay đổi code |
| **Vite** | HMR (Hot Module Replacement) cho frontend |
| **redux-persist** | Lưu state vào localStorage, giữ đăng nhập sau refresh |

---

## Tác giả

**Trần Anh Tuấn**
