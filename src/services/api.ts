import type { User } from "../types/User";

// Gọi API để lấy danh sách users từ JSONPlaceholder (dữ liệu giả để test).
// Trả về Promise<User[]> — danh sách user sau khi parse JSON.
// Ném lỗi nếu server trả về status không thành công (4xx, 5xx),
// vì `fetch` mặc định không tự ném lỗi khi HTTP status là lỗi.
export const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    // Kiểm tra thủ công vì fetch() chỉ reject khi có lỗi mạng,
    // không reject khi server trả về lỗi HTTP (404, 500, v.v.)
    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    // Parse body response thành JSON và trả về với kiểu User[]
    return res.json();
};
