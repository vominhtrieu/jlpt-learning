import { conjugate } from './verbs.js';
// Original Vietnamese learning examples. Ruby annotations are supplied explicitly.
const exampleRows=`会う|友達[ともだち]に|Tôi|gặp bạn|a
開く|ドアが|Cửa|mở|s
開ける|窓[まど]を|Tôi|mở cửa sổ|a
あげる|妹[いもうと]にプレゼントを|Tôi|tặng quà cho em gái|a
遊ぶ|公園[こうえん]で|Tôi|chơi ở công viên|a
浴びる|シャワーを|Tôi|tắm vòi sen|a
洗う|手[て]を|Tôi|rửa tay|a
ある|机[つくえ]の上[うえ]に本[ほん]が|Trên bàn|có sách|s
歩く|公園[こうえん]を|Tôi|đi bộ trong công viên|a
言う|「ありがとう」と|Tôi|nói “cảm ơn”|a
行く|学校[がっこう]へ|Tôi|đi đến trường|a
要る|お金[かね]が|Tôi|cần tiền|s
いる|家[いえ]に|Tôi|ở nhà|a
入れる|かばんに本[ほん]を|Tôi|cho sách vào cặp|a
歌う|日本[にほん]の歌[うた]を|Tôi|hát bài hát Nhật Bản|a
生まれる|赤[あか]ちゃんが|Em bé|chào đời|s
売る|古[ふる]い本[ほん]を|Tôi|bán sách cũ|a
起きる|六時[ろくじ]に|Tôi|thức dậy lúc sáu giờ|a
置く|ここに荷物[にもつ]を|Tôi|đặt hành lý ở đây|a
送る|友達[ともだち]にメールを|Tôi|gửi email cho bạn|a
押す|ボタンを|Tôi|nhấn nút|a
教える|子供[こども]に日本語[にほんご]を|Tôi|dạy tiếng Nhật cho trẻ em|a
覚える|新[あたら]しい言葉[ことば]を|Tôi|ghi nhớ từ mới|a
泳ぐ|プールで|Tôi|bơi ở hồ bơi|a
降りる|次[つぎ]の駅[えき]で|Tôi|xuống ở ga tiếp theo|a
終わる|授業[じゅぎょう]が|Buổi học|kết thúc|s
買う|新[あたら]しい靴[くつ]を|Tôi|mua giày mới|a
返す|図書館[としょかん]に本[ほん]を|Tôi|trả sách cho thư viện|a
帰る|家[いえ]に|Tôi|về nhà|a
かかる|駅[えき]まで一時間[いちじかん]|Việc đi đến ga|mất một giờ|n
書く|手紙[てがみ]を|Tôi|viết thư|a
かける|母[はは]に電話[でんわ]を|Tôi|gọi điện cho mẹ|a
貸す|友達[ともだち]に傘[かさ]を|Tôi|cho bạn mượn ô|a
かぶる|帽子[ぼうし]を|Tôi|đội mũ|a
借りる|図書館[としょかん]で本[ほん]を|Tôi|mượn sách ở thư viện|a
消える|電気[でんき]が|Đèn|tắt|n
聞く|音楽[おんがく]を|Tôi|nghe nhạc|a
切る|紙[かみ]を|Tôi|cắt giấy|a
着る|白[しろ]いシャツを|Tôi|mặc áo sơ mi trắng|a
来る|ここに|Tôi|đến đây|a
曇る|空[そら]が|Trời|trở nên nhiều mây|n
消す|電気[でんき]を|Tôi|tắt đèn|a
答える|先生[せんせい]の質問[しつもん]に|Tôi|trả lời câu hỏi của thầy cô|a
困る|お金[かね]がなくて|Tôi|gặp khó khăn vì không có tiền|n
咲く|桜[さくら]の花[はな]が|Hoa anh đào|nở|s
差す|傘[かさ]を|Tôi|che ô|a
死ぬ|魚[さかな]が|Cá|chết|n
閉まる|店[みせ]が|Cửa hàng|đóng cửa|n
閉める|ドアを|Tôi|đóng cửa|a
締める|ベルトを|Tôi|thắt dây lưng|a
知る|その話[はなし]を|Tôi|biết chuyện đó|a
吸う|新鮮[しんせん]な空気[くうき]を|Tôi|hít thở không khí trong lành|a
住む|日本[にほん]に|Tôi|sống ở Nhật Bản|a
する|宿題[しゅくだい]を|Tôi|làm bài tập về nhà|a
座る|ここに|Tôi|ngồi ở đây|a
出す|先生[せんせい]に宿題[しゅくだい]を|Tôi|nộp bài tập cho thầy cô|a
立つ|入口[いりぐち]に|Tôi|đứng ở lối vào|a
頼む|友達[ともだち]に手伝[てつだ]いを|Tôi|nhờ bạn giúp|a
食べる|朝[あさ]ご飯[はん]を|Tôi|ăn sáng|a
違う|答[こた]えが|Đáp án|khác|n
使う|この辞書[じしょ]を|Tôi|dùng quyển từ điển này|a
疲れる|仕事[しごと]で|Tôi|mệt vì công việc|n
着く|駅[えき]に|Tôi|đến ga|a
作る|晩[ばん]ご飯[はん]を|Tôi|nấu bữa tối|a
つける|電気[でんき]を|Tôi|bật đèn|a
勤める|日本[にほん]の会社[かいしゃ]に|Tôi|làm việc tại công ty Nhật|a
出かける|買[か]い物[もの]に|Tôi|ra ngoài mua sắm|a
できる|日本語[にほんご]で会話[かいわ]が|Tôi|có thể trò chuyện bằng tiếng Nhật|s
出る|部屋[へや]を|Tôi|ra khỏi phòng|a
飛ぶ|飛行機[ひこうき]が空[そら]を|Máy bay|bay trên trời|s
止まる|電車[でんしゃ]が|Tàu điện|dừng lại|n
取る|机[つくえ]の上[うえ]の本[ほん]を|Tôi|lấy sách trên bàn|a
撮る|写真[しゃしん]を|Tôi|chụp ảnh|a
鳴く|猫[ねこ]が|Mèo|kêu|s
なくす|鍵[かぎ]を|Tôi|làm mất chìa khóa|n
習う|日本語[にほんご]を|Tôi|học tiếng Nhật|a
並ぶ|店[みせ]の前[まえ]に|Tôi|xếp hàng trước cửa hàng|a
並べる|机[つくえ]を|Tôi|xếp bàn|a
なる|医者[いしゃ]に|Tôi|trở thành bác sĩ|a
脱ぐ|靴[くつ]を|Tôi|cởi giày|a
寝る|十時[じゅうじ]に|Tôi|đi ngủ lúc mười giờ|a
登る|山[やま]に|Tôi|leo núi|a
飲む|水[みず]を|Tôi|uống nước|a
乗る|バスに|Tôi|lên xe buýt|a
入る|教室[きょうしつ]に|Tôi|vào lớp học|a
履く|新[あたら]しい靴[くつ]を|Tôi|mang giày mới|a
始まる|授業[じゅぎょう]が|Buổi học|bắt đầu|s
走る|公園[こうえん]を|Tôi|chạy trong công viên|a
働く|日本[にほん]で|Tôi|làm việc ở Nhật Bản|a
話す|友達[ともだち]と|Tôi|nói chuyện với bạn|a
貼る|壁[かべ]に写真[しゃしん]を|Tôi|dán ảnh lên tường|a
晴れる|空[そら]が|Trời|quang đãng|s
引く|ドアを|Tôi|kéo cửa|a
弾く|ピアノを|Tôi|chơi đàn piano|a
吹く|強[つよ]い風[かぜ]が|Gió mạnh|thổi|n
降る|雨[あめ]が|Mưa|rơi|n
曲がる|次[つぎ]の角[かど]を右[みぎ]に|Tôi|rẽ phải ở góc tiếp theo|a
待つ|ここで友達[ともだち]を|Tôi|đợi bạn ở đây|a
磨く|歯[は]を|Tôi|đánh răng|a
見せる|先生[せんせい]に写真[しゃしん]を|Tôi|cho thầy cô xem ảnh|a
見る|映画[えいが]を|Tôi|xem phim|a
持つ|このかばんを|Tôi|cầm chiếc cặp này|a
休む|家[いえ]で|Tôi|nghỉ ở nhà|a
やる|宿題[しゅくだい]を|Tôi|làm bài tập về nhà|a
呼ぶ|先生[せんせい]を|Tôi|gọi thầy cô|a
読む|本[ほん]を|Tôi|đọc sách|a
分かる|先生[せんせい]の説明[せつめい]が|Tôi|hiểu lời giải thích của thầy cô|s
忘れる|約束[やくそく]を|Tôi|quên lời hẹn|n
渡す|友達[ともだち]に手紙[てがみ]を|Tôi|đưa thư cho bạn|a
渡る|橋[はし]を|Tôi|đi qua cầu|a
勉強する|図書館[としょかん]で|Tôi|học bài ở thư viện|a
電話する|母[はは]に|Tôi|gọi điện cho mẹ|a
結婚する|来年[らいねん]|Tôi|kết hôn vào năm sau|a
コピーする|この書類[しょるい]を|Tôi|sao chép tài liệu này|a
練習する|毎日[まいにち]|Tôi|luyện tập mỗi ngày|a
旅行する|日本[にほん]を|Tôi|du lịch Nhật Bản|a
料理する|家[いえ]で|Tôi|nấu ăn ở nhà|a
散歩する|公園[こうえん]を|Tôi|đi dạo trong công viên|a
洗濯する|家[いえ]で|Tôi|giặt giũ ở nhà|a
仕事する|家[いえ]で|Tôi|làm việc ở nhà|a
質問する|先生[せんせい]に|Tôi|hỏi thầy cô|a
掃除する|部屋[へや]を|Tôi|dọn phòng|a
テストする|新[あたら]しい機械[きかい]を|Tôi|kiểm tra máy mới|a`;
const exampleContexts=Object.fromEntries(exampleRows.split('\n').map(row=>{const [word,prefix,subject,meaning,type]=row.split('|');return [word,{prefix,subject,meaning,type}]}));
function exampleRuby(text){return text.replace(/([一-龯々]+)\[([^\]]+)\]/g,'<ruby>$1<rt>$2</rt></ruby>')}
function verbExample(v,form){
 const ctx=exampleContexts[v.word],forms=conjugate(v),readings=conjugate(v,v.kana),word=form==='dictionary'?v.word:forms[form],reading=form==='dictionary'?v.kana:readings[form];
 const target=`<mark><ruby>${word}<rt>${reading}</rt></ruby></mark>`;
 let prefix=ctx.prefix,subject=ctx.subject,meaning=ctx.meaning,note='',label='Ví dụ',suffix='。',vi='';
 // Avoid future-time words in past-tense examples.
 if(v.word==='結婚する'&&['mashita','masendeshita','nakatta','ta','te','nakute'].includes(form)){prefix='去年[きょねん]';meaning='kết hôn vào năm ngoái'}
 const clause=subject+' '+meaning;
 if(['tai','mashou'].includes(form)&&ctx.type!=='a'){
  return {html:`「${exampleRuby(prefix)}${target}」とは${exampleRuby('普通[ふつう]')}${exampleRuby('言[い]')}いません。`,vi:`Thông thường không nói “${subject.toLowerCase()} ${form==='tai'?'muốn ':'hãy '}${meaning}”.`,label:'Lưu ý cách dùng',note:'Dạng chia trong bảng có thể tạo được về mặt hình thức, nhưng không phù hợp với nghĩa/ngữ cảnh này. Câu này là ví dụ nhận diện cách dùng cần tránh, không phải mẫu để nói theo.'};
 }
 switch(form){
 case 'dictionary': case 'masu':vi=clause+'.';break;
 case 'masen':case 'nai':vi=subject+' không '+meaning+'.';break;
 case 'mashita':case 'ta':vi=subject+' đã '+meaning+'.';break;
 case 'masendeshita':case 'nakatta':vi=subject+' đã không '+meaning+'.';break;
 case 'te':suffix=ctx.type==='n'?'、困[こま]っています。':'、よかったです。';vi=ctx.type==='n'?clause+' nên tôi đang gặp khó khăn.':'Thật tốt vì '+subject.toLowerCase()+' đã '+meaning+'.';break;
 case 'nakute':suffix=ctx.type==='n'?'、よかったです。':'、困[こま]っています。';vi=ctx.type==='n'?'May mà '+subject.toLowerCase()+' không '+meaning+'.':subject+' không '+meaning+' nên tôi đang gặp khó khăn.';break;
 case 'tai':suffix='です。';vi=subject+' muốn '+meaning+'.';break;
 case 'mashou':vi='Chúng ta hãy '+meaning+' nhé.';break;
 case 'tara':suffix='、教[おし]えてください。';vi='Nếu '+subject.toLowerCase()+' '+meaning+' thì hãy cho tôi biết.';break;
 }
 // Tailor requests to the listener rather than an implicit first-person actor.
 if(form==='tara'&&subject==='Tôi')vi='Nếu bạn '+meaning+' thì hãy cho tôi biết.';
 if(v.word==='知る'&&['dictionary','masu'].includes(form)){prefix='ニュースでその事件[じけん]を';vi='Tôi biết được vụ việc đó qua tin tức.';note='Ở đây 知る là “biết được/tiếp nhận thông tin”. Để nói trạng thái “đã biết”, thường dùng 知っています.'}
 if(v.word==='知る'&&['nai','masen','nakatta','masendeshita','nakute'].includes(form))note='Khi nói “không biết”, dùng 知らない／知りません.';
 return {html:exampleRuby(prefix)+target+exampleRuby(suffix),vi,label,note};
}

export { verbExample, exampleContexts, exampleRuby };
