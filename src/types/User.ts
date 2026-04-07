// Định nghĩa kiểu dữ liệu User dùng chung trong toàn bộ ứng dụng.
// Sử dụng `type` thay vì `interface` vì đây là dữ liệu thuần túy, không cần mở rộng.
export type User = {
    id: number;     // ID duy nhất của từng user (từ API)
    name: string;   // Tên hiển thị của user
    email: string;  // Email của user
};
