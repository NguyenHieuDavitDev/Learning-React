import { useEffect, useState } from "react";

/**
 * useDebounce - Hook trì hoãn cập nhật giá trị
 *
 * Mục đích: Khi `value` thay đổi liên tục (ví dụ: người dùng đang gõ vào input),
 * hook này sẽ "chờ" một khoảng thời gian `delay` (ms) sau lần thay đổi CUỐI CÙNG
 * rồi mới trả về giá trị mới. Điều này giúp tránh gọi API hoặc xử lý nặng
 * sau mỗi lần gõ phím.
 *
 * Ví dụ: delay = 500ms, người dùng gõ "abc" liên tiếp
 * → Hook chỉ trả về "abc" sau 500ms kể từ khi gõ "c", không gọi 3 lần.
 *
 * @param value - Giá trị cần debounce (thường là chuỗi tìm kiếm)
 * @param delay - Thời gian trì hoãn tính bằng milliseconds
 * @returns debouncedValue - Giá trị đã được debounce
 */
export function useDebounce(value: string, delay: number) {
    // State lưu giá trị đã được debounce, khởi tạo bằng giá trị ban đầu
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Mỗi khi `value` hoặc `delay` thay đổi, đặt một timer mới
        // Timer sẽ cập nhật debouncedValue sau `delay` milliseconds
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function: chạy trước khi effect này chạy lại (khi value/delay đổi)
        // hoặc khi component unmount.
        // Tác dụng: HỦY timer cũ trước khi tạo timer mới → chỉ timer CUỐI CÙNG
        // mới thực sự chạy đến hết, những timer trước đó bị hủy giữa chừng.
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]); // Effect chạy lại mỗi khi value hoặc delay thay đổi

    return debouncedValue;
}
