const raw=`会う|あう|gặp|1
開く|あく|mở (tự mở)|1
開ける|あける|mở (một vật)|2
あげる|あげる|cho, tặng|2
遊ぶ|あそぶ|chơi|1
浴びる|あびる|tắm (vòi sen)|2
洗う|あらう|rửa, giặt|1
ある|ある|có, tồn tại (đồ vật)|1
歩く|あるく|đi bộ|1
言う|いう|nói|1
行く|いく|đi|1
要る|いる|cần|1
いる|いる|có, ở (người, động vật)|2
入れる|いれる|cho vào|2
歌う|うたう|hát|1
生まれる|うまれる|được sinh ra|2
売る|うる|bán|1
起きる|おきる|thức dậy|2
置く|おく|đặt, để|1
送る|おくる|gửi, tiễn|1
押す|おす|ấn, đẩy|1
教える|おしえる|dạy, chỉ cho|2
覚える|おぼえる|ghi nhớ|2
泳ぐ|およぐ|bơi|1
降りる|おりる|xuống xe|2
終わる|おわる|kết thúc|1
買う|かう|mua|1
返す|かえす|trả lại|1
帰る|かえる|về|1
かかる|かかる|tốn (thời gian, tiền)|1
書く|かく|viết|1
かける|かける|treo; đeo kính; gọi điện|2
貸す|かす|cho mượn|1
かぶる|かぶる|đội (mũ)|1
借りる|かりる|mượn|2
消える|きえる|tắt, biến mất|2
聞く|きく|nghe, hỏi|1
切る|きる|cắt|1
着る|きる|mặc (áo)|2
来る|くる|đến|3
曇る|くもる|trở nên nhiều mây|1
消す|けす|tắt, xóa|1
答える|こたえる|trả lời|2
困る|こまる|gặp khó khăn|1
咲く|さく|nở (hoa)|1
差す|さす|giương (ô)|1
死ぬ|しぬ|chết|1
閉まる|しまる|đóng (tự đóng)|1
閉める|しめる|đóng (một vật)|2
締める|しめる|thắt, siết|2
知る|しる|biết|1
吸う|すう|hít, hút|1
住む|すむ|sống, cư trú|1
する|する|làm|3
座る|すわる|ngồi|1
出す|だす|lấy ra, nộp|1
立つ|たつ|đứng|1
頼む|たのむ|nhờ, yêu cầu|1
食べる|たべる|ăn|2
違う|ちがう|khác, sai|1
使う|つかう|sử dụng|1
疲れる|つかれる|mệt|2
着く|つく|đến nơi|1
作る|つくる|làm, tạo ra|1
つける|つける|bật (đèn, máy)|2
勤める|つとめる|làm việc tại|2
出かける|でかける|ra ngoài|2
できる|できる|có thể, làm được|2
出る|でる|ra, rời khỏi|2
飛ぶ|とぶ|bay|1
止まる|とまる|dừng lại|1
取る|とる|lấy|1
撮る|とる|chụp (ảnh)|1
鳴く|なく|kêu (động vật)|1
なくす|なくす|làm mất|1
習う|ならう|học (từ người dạy)|1
並ぶ|ならぶ|xếp hàng|1
並べる|ならべる|xếp, bày|2
なる|なる|trở thành|1
脱ぐ|ぬぐ|cởi|1
寝る|ねる|ngủ|2
登る|のぼる|leo|1
飲む|のむ|uống|1
乗る|のる|lên, đi (xe)|1
入る|はいる|vào|1
履く|はく|mang giày, mặc quần|1
始まる|はじまる|bắt đầu|1
走る|はしる|chạy|1
働く|はたらく|làm việc|1
話す|はなす|nói chuyện|1
貼る|はる|dán|1
晴れる|はれる|trời quang|2
引く|ひく|kéo|1
弾く|ひく|chơi (đàn)|1
吹く|ふく|thổi|1
降る|ふる|rơi (mưa, tuyết)|1
曲がる|まがる|rẽ, cong|1
待つ|まつ|đợi|1
磨く|みがく|đánh, chải, mài|1
見せる|みせる|cho xem|2
見る|みる|nhìn, xem|2
持つ|もつ|cầm, mang, có|1
休む|やすむ|nghỉ|1
やる|やる|làm; cho|1
呼ぶ|よぶ|gọi|1
読む|よむ|đọc|1
分かる|わかる|hiểu|1
忘れる|わすれる|quên|2
渡す|わたす|trao, đưa|1
渡る|わたる|băng qua|1
勉強する|べんきょうする|học bài|3
電話する|でんわする|gọi điện thoại|3
結婚する|けっこんする|kết hôn|3
コピーする|コピーする|sao chép|3
練習する|れんしゅうする|luyện tập|3
旅行する|りょこうする|du lịch|3
料理する|りょうりする|nấu ăn|3
散歩する|さんぽする|đi dạo|3
洗濯する|せんたくする|giặt giũ|3
仕事する|しごとする|làm việc|3
質問する|しつもんする|đặt câu hỏi|3
掃除する|そうじする|dọn dẹp|3
テストする|テストする|kiểm tra, thử nghiệm|3`;
const verbs=raw.split('\n').map((s,id)=>{let [word,kana,meaning,group]=s.split('|');return {id,word,kana,meaning,group:+group}}).sort((a,b)=>a.kana.localeCompare(b.kana,'ja'));
const columns=[['masu','ます','Lịch sự'],['masen','ません','Phủ định lịch sự'],['mashita','ました','Quá khứ lịch sự'],['masendeshita','ませんでした','Quá khứ phủ định'],['nai','ない','Phủ định thường'],['nakatta','なかった','Quá khứ phủ định'],['te','て','Nối / yêu cầu'],['ta','た','Quá khứ thường'],['nakute','なくて','Nối phủ định'],['tai','たい','Mong muốn'],['mashou','ましょう','Rủ rê lịch sự'],['tara','たら','Điều kiện']];
function conjugate(v,w=v.word){let stem,te,ta,nai;const b=w.slice(0,-1),e=w.slice(-1);if(v.kana==='くる'){const k=w==='来る'?'来':'';stem=k||'き';te=(k||'き')+'て';ta=(k||'き')+'た';nai=(k||'こ')+'ない'}else if(v.group===3){stem=w.slice(0,-2)+'し';te=stem+'て';ta=stem+'た';nai=stem+'ない'}else if(v.group===2){stem=b;te=b+'て';ta=b+'た';nai=b+'ない'}else{const rows={'う':['い','わ','って'],'く':['き','か','いて'],'ぐ':['ぎ','が','いで'],'す':['し','さ','して'],'つ':['ち','た','って'],'ぬ':['に','な','んで'],'ぶ':['び','ば','んで'],'む':['み','ま','んで'],'る':['り','ら','って']};let r=rows[e];stem=b+r[0];nai=b+r[1]+'ない';te=b+(v.kana==='いく'?'って':r[2]);ta=te.slice(0,-1)+(te.endsWith('で')?'だ':'た');if(v.kana==='ある')nai='ない'}return {masu:stem+'ます',masen:stem+'ません',mashita:stem+'ました',masendeshita:stem+'ませんでした',nai,nakatta:nai.slice(0,-1)+'かった',te,ta,nakute:nai.slice(0,-1)+'くて',tai:stem+'たい',mashou:stem+'ましょう',tara:ta+'ら'}}

const formDescriptions={masu:'ます diễn tả hành động ở hiện tại/thói quen hoặc tương lai với cách nói lịch sự.',masen:'ません là dạng phủ định lịch sự, diễn tả không làm hoặc sẽ không làm.',mashita:'ました là dạng quá khứ khẳng định lịch sự, diễn tả đã làm.',masendeshita:'ませんでした là dạng quá khứ phủ định lịch sự, diễn tả đã không làm.',nai:'ない là dạng phủ định thông thường, diễn tả không làm hoặc sẽ không làm.',nakatta:'なかった là dạng quá khứ phủ định thông thường, diễn tả đã không làm.',nakute:'なくて là dạng nối phủ định, thường nối ý hoặc nêu nguyên nhân tùy câu; không tự mang nghĩa quá khứ.',te:'Thể て dùng để nối hành động hoặc kết hợp với mẫu như てください・ています; bản thân て không xác định thì.',ta:'Thể た là dạng quá khứ khẳng định thông thường, cũng dùng trong các cấu trúc diễn tả hành động hoàn tất.',tara:'たら tạo điều kiện “nếu…” hoặc “sau khi…” tùy ngữ cảnh, được tạo từ thể た cộng ら.',tai:'たい diễn tả mong muốn làm một việc; thêm sau thân dùng với ます, không thêm sau toàn bộ ます.',mashou:'ましょう là dạng rủ rê/đề nghị lịch sự, thường mang nghĩa “cùng … nhé” hoặc “để tôi …”.'};

export { verbs, columns, conjugate, formDescriptions };
