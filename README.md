# Kotoba — Ôn luyện JLPT N5

Ứng dụng **Next.js App Router + React**, xuất website tĩnh. Toàn bộ giao diện tương tác dùng React components, không phụ thuộc các script DOM của bản HTML cũ.

## Chạy trên máy

Yêu cầu Node.js 20.9 trở lên và npm.

```bash
npm ci
npm run dev
```

Mở http://localhost:3000. Trang tra cứu ở `/`, trang luyện tập ở `/practice`.

## Kiểm tra và build

```bash
npm test
npm run build
npm start
```

`next build` xuất trang vào `out/`. `npm start` phục vụ thư mục này bằng máy chủ tĩnh nhỏ trong `scripts/serve.mjs` để kiểm tra tại máy. Có thể triển khai `out/` lên static hosting; cấu hình Sites hiện tại nằm trong `.openai/hosting.json`.

Đường dẫn cũ `/practice.html` vẫn có trong output để các liên kết đã chia sẻ tiếp tục hoạt động. Push lên GitHub không tự triển khai Sites.

## Chức năng

- 123 động từ/cụm động từ, nghĩa tiếng Việt, cách đọc và 12 dạng chia.
- Tìm kiếm, lọc nhiều nhóm, chọn cột và xuất CSV.
- Tooltip tiêu đề cột: ý nghĩa của thể; tooltip từng từ: quy tắc chia, lý do phân nhóm và ví dụ có furigana.
- Luyện thẻ ghi nhớ, gõ cách chia, xác định nhóm và chế độ kết hợp.
- Ôn lại câu sai, ưu tiên câu yếu/chưa học, chọn số câu mỗi lượt.
- Bật/tắt furigana trên flashcard.
- Lưu bộ lọc, tùy chọn và tiến độ trên từng trình duyệt.

## Cấu trúc

- `app/`: routes, layout, metadata và CSS.
- `components/`: bảng động từ, tooltip, luyện tập và hook lưu lựa chọn.
- `lib/`: dữ liệu, chia động từ, giải thích, ví dụ, tạo bài tập và chuẩn hóa dữ liệu lưu.
- `tests/`: kiểm tra quy tắc chia, dữ liệu, chấm đáp án và tương thích tiến độ.
- `scripts/`: máy chủ phục vụ bản build tĩnh tại máy.

## Tương thích dữ liệu cũ

Giữ nguyên các khóa `localStorage`: `kotoba-table-filters-v1`, `kotoba-study-filters-v1`, `kotoba-practice-v1`, `kotoba-flashcard-furigana-v1`. Trên cùng tên miền và trình duyệt, bộ lọc/tiến độ từ bản trước được khôi phục sau khi trang tải. Tiến độ không đồng bộ giữa các thiết bị; lượt học đang dở không được khôi phục.

Danh sách từ vựng phục vụ ôn tập, không phải danh sách chính thức của JLPT. Nguồn tham khảo và lưu ý ngữ pháp nằm trong trang tra cứu. Một số dạng chia không tự nhiên với từng nghĩa; ví dụ tương ứng có ghi chú cách dùng cần tránh.
