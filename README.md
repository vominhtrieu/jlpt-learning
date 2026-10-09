# Kotoba — Ôn luyện JLPT N5

Website HTML/CSS/JavaScript thuần, không cần bước build.

## Chạy trên máy

```bash
python3 -m http.server 8000 --directory dist
```

Mở http://localhost:8000 để xem bảng động từ; http://localhost:8000/practice.html để luyện tập.

## Chức năng

- 123 động từ/cụm động từ với nghĩa tiếng Việt, cách đọc và 12 dạng chia.
- Tìm kiếm, lọc nhiều nhóm, chọn cột, xuất CSV.
- Giải thích quy tắc chia và phân nhóm khi hover/chạm vào từ.
- Thẻ ghi nhớ, bài chia động từ, bài xác định nhóm, ôn lại câu sai.
- Lưu tiến độ và tùy chọn bằng localStorage trên từng trình duyệt.

## Cấu trúc

Toàn bộ mã nguồn chạy trực tiếp nằm trong `dist/` (không phải sản phẩm build). `index.html` là trang tra cứu; `practice.html` là trang luyện tập. `data.js` chứa từ vựng và hàm chia; `explain.js` chứa giải thích; `preferences.js` lưu lựa chọn. `.openai/hosting.json` là cấu hình triển khai Sites hiện tại.

Có thể triển khai thư mục `dist/` trên dịch vụ hosting tĩnh. GitHub repository này lưu bản mã nguồn; việc push lên GitHub không tự cập nhật trang Sites.

Danh sách từ vựng phục vụ ôn tập, không phải danh sách chính thức của JLPT. Nguồn tham khảo và lưu ý ngữ pháp nằm trong trang tra cứu.
