import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { fetchUsers } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";
import SearchBar from "./SearchBar";

// Component chính hiển thị danh sách user với chức năng tìm kiếm có debounce.
export default function UserList() {
    // `users`: toàn bộ danh sách user gốc từ API — không bao giờ thay đổi sau khi fetch.
    const [users, setUsers] = useState<User[]>([]);

    // `filtered`: danh sách user sau khi lọc theo từ khóa tìm kiếm — dùng để render.
    const [filtered, setFiltered] = useState<User[]>([]);

    // `query`: giá trị người dùng đang gõ vào ô tìm kiếm (cập nhật liên tục).
    const [query, setQuery] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // `debouncedQuery`: phiên bản trễ của `query` — chỉ cập nhật sau khi người dùng
    // ngừng gõ 500ms. Tránh lọc lại mỗi lần gõ một ký tự, giúp tối ưu hiệu năng.
    const debouncedQuery = useDebounce(query, 500);

    // Effect 1: Fetch dữ liệu từ API một lần duy nhất khi component mount.
    // Dependency array rỗng `[]` đảm bảo chỉ chạy một lần.
    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                const data = await fetchUsers();
                // Lưu cả danh sách gốc lẫn danh sách hiển thị ban đầu
                setUsers(data);
                setFiltered(data);
            } catch (err) {
                setError("Error fetching users");
            } finally {
                // Luôn tắt loading dù thành công hay thất bại
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    // Effect 2: Lọc danh sách mỗi khi từ khóa debounced hoặc danh sách gốc thay đổi.
    // Tìm kiếm không phân biệt hoa thường bằng cách chuyển cả hai về chữ thường.
    useEffect(() => {
        const result = users.filter((user) =>
            user.name.toLowerCase().includes(debouncedQuery.toLowerCase())
        );

        setFiltered(result);
    }, [debouncedQuery, users]); // Chạy lại khi query debounced hoặc users thay đổi

    // Hiển thị trạng thái loading/error trước khi render danh sách
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {/* SearchBar nhận setQuery làm callback — mỗi lần gõ sẽ cập nhật `query`,
                sau đó useDebounce trì hoãn trước khi trigger lọc */}
            <SearchBar onSearch={setQuery} />

            {/* Render danh sách user đã lọc, dùng `id` làm key để React tối ưu re-render */}
            {filtered.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    );
}
