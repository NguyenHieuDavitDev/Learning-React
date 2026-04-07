// Props nhận vào một callback `onSearch` được gọi mỗi khi người dùng gõ vào ô tìm kiếm.
// Component cha (UserList) truyền hàm cập nhật state vào.
type Props = {
    onSearch: (value: string) => void;
};

// Component input tìm kiếm đơn giản — không tự quản lý state (uncontrolled-style).
// Mỗi lần người dùng gõ, `onSearch` được gọi với giá trị hiện tại của input,
// để component cha xử lý logic lọc/debounce.
export default function SearchBar({ onSearch }: Props) {
    return (
        <input
            placeholder="Search user..."
            // onChange kích hoạt mỗi khi giá trị input thay đổi,
            // truyền giá trị text lên component cha qua callback onSearch
            onChange={(e) => onSearch(e.target.value)}
        />
    );
}
