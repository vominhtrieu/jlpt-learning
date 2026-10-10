function explainConjugation(v,form){
 const f=conjugate(v),r=conjugate(v,v.kana),stem=f.masu.slice(0,-2),b=v.word.slice(0,-1),end=v.kana.slice(-1),group=['','I · Godan','II · Ichidan','III · Bất quy tắc'][v.group];
 if(form==='dictionary')return explainVerbGroup(v);
 const title=form==='dictionary'?'Thể từ điển':columns.find(c=>c[0]===form).slice(1).join(' · ');
 let steps=[],note='';
 const stemStep=()=>v.kana==='くる'?'来る（くる） → 来（き）: đổi cách đọc thành き trước đuôi này.':v.group===3?`${v.word} → ${stem}: đổi する thành し.`:v.group===2?`${v.word} → ${stem}: bỏ る.`:`${v.word} → ${stem}: đổi ${end} thành ${{'う':'い','く':'き','ぐ':'ぎ','す':'し','つ':'ち','ぬ':'に','ぶ':'び','む':'み','る':'り'}[end]} (hàng い).`;
 const naiSteps=()=>v.kana==='ある'?['ある có phủ định đặc biệt là ない; không dùng あらない trong tiếng Nhật chuẩn hiện đại.']:v.kana==='くる'?['来る（くる） → 来ない（こない）: 来 đọc là こ trước ない.']:v.group===3?[`${v.word} → ${f.nai}: thay する bằng しない.`]:v.group===2?[`${v.word} → ${b} + ない → ${f.nai}: bỏ る, thêm ない.`]:[`${v.word} → ${f.nai}: đổi ${end} thành ${{'う':'わ','く':'か','ぐ':'が','す':'さ','つ':'た','ぬ':'な','ぶ':'ば','む':'ま','る':'ら'}[end]}, rồi thêm ない.`];
 const teSteps=()=>{if(v.kana==='いく')return [`${v.word} → ${f.te}: 行く là ngoại lệ; dùng って, không phải いて.`];if(v.kana==='くる')return ['来る（くる） → 来て（きて）: 来 đọc là き.'];if(v.group===3)return [`${v.word} → ${f.te}: thay する bằng して.`];if(v.group===2)return [`${v.word} → ${b} + て → ${f.te}: bỏ る, thêm て.`];const rule={'う':'う・つ・る → って','つ':'う・つ・る → って','る':'う・つ・る → って','む':'む・ぶ・ぬ → んで','ぶ':'む・ぶ・ぬ → んで','ぬ':'む・ぶ・ぬ → んで','く':'く → いて','ぐ':'ぐ → いで','す':'す → して'}[end];return [`Nhóm I: ${rule}.`,`${v.word} → ${f.te}.`]};
 if(form==='dictionary'){steps=[`${v.word}（${v.kana}）là thể từ điển, chưa thêm đuôi lịch sự hoặc quá khứ.`,`Từ này thuộc nhóm ${group}.`];if(v.group===1&&end==='る')note='Đuôi る không đồng nghĩa với nhóm II. Từ này chia theo nhóm I.'}
 else if(['masu','masen','mashita','masendeshita','tai','mashou'].includes(form)){const suffix={masu:'ます',masen:'ません',mashita:'ました',masendeshita:'ませんでした',tai:'たい',mashou:'ましょう'}[form];steps=[stemStep(),`${stem} + ${suffix} → ${f[form]}.`];if(form==='tai'||form==='mashou')note='Dạng này chỉ tự nhiên khi chủ thể, ý nghĩa và ngữ cảnh phù hợp.'}
 else if(['nai','nakatta','nakute'].includes(form)){steps=naiSteps();if(form==='nakatta')steps.push(`${f.nai} → ${f.nakatta}: thay ない bằng なかった.`);if(form==='nakute')steps.push(`${f.nai} → ${f.nakute}: thay ない bằng なくて.`)}
 else if(['te','ta','tara'].includes(form)){steps=teSteps();if(form!=='te')steps.push(`${f.te} → ${f.ta}: đổi ${f.te.endsWith('で')?'で → だ':'て → た'}.`);if(form==='tara')steps.push(`${f.ta} + ら → ${f.tara}.`)}
 if(v.kana==='くる')note+=(note?' ':'')+'Lưu ý cách đọc: きます・きて・きた nhưng こない.';
 const detail=conjugationReason(v,form);steps=[...detail, ...steps];return {title,group,steps,note,result:form==='dictionary'?v.word:f[form],reading:form==='dictionary'?v.kana:r[form]};
}
function explainVerbGroup(v){
 const group=['','I · Godan','II · Ichidan','III · Bất quy tắc'][v.group],end=v.kana.slice(-1),before=v.kana.slice(-2,-1),f=conjugate(v),r=conjugate(v,v.kana);
 const ie='いきぎしじちぢにひびぴみりえけげせぜてでねへべぺめれ'.includes(before);
 const steps=[`${v.word}（${v.kana}）nghĩa là “${v.meaning}”, thuộc nhóm ${group}.`];let note='';
 if(v.group===3){
  if(v.kana==='くる'){
   steps.push('Đây là 来る（くる, đến）, một trong hai động từ bất quy tắc cơ bản: する và 来る. Vì vậy xếp vào nhóm III, dù từ có đuôi る.','Phần trước đuôi biến đổi không theo mẫu nhóm I hoặc II: くる → きます → こない → きて. Không thể chỉ bỏ る và giữ nguyên く.','Cần nhớ riêng ba cách đọc của 来: く trong 来る, き trong 来ます・来て, こ trong 来ない.');
  }else{
   steps.push(v.kana==='する'?'する（làm）là một trong hai động từ bất quy tắc cơ bản, nên thuộc nhóm III.':`Từ này có cấu tạo là phần chỉ hoạt động + する. Chính する ở cuối quyết định cách chia, nên cả cụm thuộc nhóm III.`, `する đổi thành し trước ます・ない・て: ${v.word} → ${f.masu} → ${f.nai} → ${f.te}.`,v.kana==='する'?'Đừng áp dụng quy tắc nhóm I (る → り) hoặc chỉ bỏ る như nhóm II; cần nhớ riêng する → し.':'Giữ nguyên phần đứng trước する; chỉ biến đổi する. Không phân nhóm dựa trên âm cuối của danh từ đứng trước nó.');
  }
 }else if(v.group===2){
  steps.push(`Dấu hiệu gợi ý: từ kết thúc bằng る, âm trước る là ${before}, thuộc hàng ${'いきぎしじちぢにひびぴみり'.includes(before)?'い':'え'}. Kiểu “âm i/e + る” thường gặp ở nhóm II, nhưng cũng có ngoại lệ nhóm I.`,`Cách chia xác nhận nhóm II: giữ nguyên phần ${v.word.slice(0,-1)}, bỏ る rồi thêm đuôi. ${v.word} → ${f.masu}（${r.masu}）; ${v.word} → ${f.nai}（${r.nai}）.`,`Thể て cũng chỉ bỏ る rồi thêm て: ${v.word} → ${f.te}（${r.te}）. Phần thân không đổi âm như nhóm I.`);
  if(v.word==='着る')steps.push('Phân biệt từ đồng âm: 着る（きる, mặc）→ 着ます（きます）, nhóm II; 切る（きる, cắt）→ 切ります（きります）, nhóm I.');
  if(v.word==='いる')steps.push('Phân biệt từ đồng âm: いる（tồn tại, người/động vật）→ います, nhóm II; 要る（いる, cần）→ 要ります（いります）, nhóm I.');
  note='Không kết luận “mọi từ đuôi いる／える đều là nhóm II”. Với từ mới, hãy tra nhóm hoặc học kèm thể ます; ví dụ 帰る・入る・走る vẫn thuộc nhóm I.';
 }else{
  if(end!=='る')steps.push(`Dấu hiệu nhận biết: âm cuối là ${end}, không phải る; từ này cũng không phải する hay cụm với する. Trong hệ ba nhóm động từ đang học, các động từ như vậy thuộc nhóm I.`);
  else if(ie)steps.push(`Từ kết thúc bằng “âm i/e + る” (âm trước る là ${before}) nhưng vẫn là nhóm I. Đây là trường hợp phải ghi nhớ riêng; không thể chắc chắn về nhóm chỉ từ cách viết hoặc cách đọc.`);
  else steps.push(`Từ kết thúc bằng る nhưng âm ngay trước る là ${before}, không thuộc hàng い hoặc え. Đây là dấu hiệu nhóm I: động từ nhóm II có dạng kết thúc “âm i/e + る”.`);
  const irow={'う':'い','く':'き','ぐ':'ぎ','す':'し','つ':'ち','ぬ':'に','ぶ':'び','む':'み','る':'り'};
  steps.push(`Cách chia xác nhận nhóm I: trước ます, âm cuối ${end} đổi sang ${irow[end]} (hàng い), chứ không đơn giản bỏ âm cuối: ${v.word} → ${f.masu}（${r.masu}）.`);
  steps.push(v.kana==='ある'?'Lưu ý riêng: ある → あります xác nhận mẫu nhóm I, nhưng phủ định là ない, không dùng あらない trong tiếng Nhật chuẩn hiện đại.':`Trước ない, âm cuối đổi sang hàng あ (riêng う → わ): ${v.word} → ${f.nai}（${r.nai}）. Sự thay đổi âm cuối theo đuôi chia là đặc trưng nhóm I.`);
  if(v.word==='切る')steps.push('Phân biệt: 切る（cắt）→ 切ります là nhóm I; 着る（mặc）→ 着ます là nhóm II. Cả hai đều đọc きる nên cần gắn từ với nghĩa.');
  if(v.word==='要る')steps.push('Phân biệt: 要る（cần）→ 要ります là nhóm I; いる（tồn tại）→ います là nhóm II. Cùng đọc いる nhưng nghĩa và cách chia khác nhau.');
  if(v.kana==='いく')steps.push('行く vẫn thuộc nhóm I. Riêng thể て・た là ngoại lệ 行って・行った; ngoại lệ này không biến nó thành nhóm III.');
 }
 return {title:'Vì sao thuộc nhóm này?',group,steps,note,result:v.word,reading:v.kana};
}
function conjugationReason(v,form){
 const group=['','I (Godan)','II (Ichidan)','III (bất quy tắc)'][v.group],end=v.kana.slice(-1);
 let identify=`${v.word}（${v.kana} — ${v.meaning}）là động từ nhóm ${group}.`;
 if(v.group===1&&end==='る')identify+=' Dù có đuôi る, từ này vẫn thuộc nhóm I; không áp dụng cách bỏ る của nhóm II.';
 if(v.word==='切る')identify+=' Phân biệt 切る（cắt, nhóm I）với 着る（mặc, nhóm II）, dù cả hai đều đọc là きる.';
 if(v.word==='要る')identify+=' Phân biệt 要る（cần, nhóm I）với いる（tồn tại, nhóm II）, dù cùng đọc là いる.';
 if(v.group===3)identify+=v.kana==='くる'?' 来る là một trong hai động từ bất quy tắc cơ bản.':v.kana==='する'?' する là một trong hai động từ bất quy tắc cơ bản.':' Đây là cụm có する ở cuối; giữ phần đứng trước và chỉ chia する.';
 const lines=[identify];
 if(form==='dictionary'){
 lines.push(v.group===1?'Vì thuộc nhóm I, âm cuối thay đổi theo thể: trước ます chuyển sang hàng い, trước ない chuyển sang hàng あ (riêng う → わ), còn て・た có quy tắc biến âm riêng.':v.group===2?'Vì thuộc nhóm II, cách chia cơ bản là giữ phần trước る, bỏ る rồi thêm đuôi cần dùng: ます, ない, て hoặc た.':'Vì thuộc nhóm III, phải nhớ cách chia riêng của する hoặc 来る, thay vì áp dụng quy tắc nhóm I/II.');
 return lines;
 }

 if(['masu','masen','mashita','masendeshita','tai','mashou'].includes(form)){
 lines.push(v.group===1?`Vì là nhóm I, trước hết chuyển kana cuối từ hàng う sang hàng い để tạo thân dùng với ます. Với từ này, âm cuối là ${end}; giữ nguyên phần đứng trước âm đó.`:v.group===2?'Vì là nhóm II, tạo thân bằng cách bỏ る cuối từ. Không đổi âm đứng trước る sang hàng い như nhóm I.':v.kana==='くる'?'Vì 来る bất quy tắc, thân dùng với ます đọc là き. Chữ 来 được giữ khi viết kanji, nhưng cách đọc thay đổi từ く thành き.':'Vì する bất quy tắc, thân dùng với ます là し. Nếu có phần đứng trước する, giữ nguyên phần đó.');
 }else if(['nai','nakatta','nakute'].includes(form)){
 lines.push(v.kana==='ある'?'ある thuộc nhóm I nhưng dạng phủ định là ngoại lệ: phải dùng ない. Tạo các dạng phủ định khác từ ない này.':v.group===1?`Vì là nhóm I, tạo thể ない bằng cách đổi âm cuối sang hàng あ rồi thêm ない.${end==='う'?' Riêng đuôi う phải đổi thành わ, không phải あ.':''}`:v.group===2?'Vì là nhóm II, tạo thể ない bằng cách bỏ る và thêm ない, giữ nguyên các âm còn lại.':v.kana==='くる'?'Vì 来る bất quy tắc, trước ない phải đọc 来 là こ: こない, không phải きない hay くない.':'Vì する bất quy tắc, phủ định là しない. Thay phần する bằng しない và giữ nguyên phần đứng trước.');
 if(form!=='nai')lines.push('Sau khi có thể ない, chia phần ない như tính từ đuôi い: '+(form==='nakatta'?'bỏ い cuối, thêm かった để diễn tả quá khứ.':'bỏ い cuối, thêm くて để nối câu.'));
 }else{
 lines.push(v.kana==='いく'?'行く thuộc nhóm I nhưng là ngoại lệ ở thể て・た. Không áp dụng đuôi く → いて của những từ như 書く; phải dùng 行って・行った.':v.group===1?`Vì là nhóm I, thể て phụ thuộc âm cuối, không được chỉ thêm て vào thể từ điển. Từ này kết thúc bằng ${end}, nên áp dụng quy tắc biến âm tương ứng bên dưới.`:v.group===2?'Vì là nhóm II, chỉ cần bỏ る rồi thêm て để tạo thể nối; không dùng các biến âm って・んで của nhóm I.':v.kana==='くる'?'Vì 来る bất quy tắc, thể て là 来て（きて）. Chữ 来 đọc là き trong cả 来て và 来た.':'Vì する bất quy tắc, thể て là して. Giữ phần đứng trước する nếu đây là một cụm động từ.');
 if(form==='ta'||form==='tara')lines.push('Có thể dùng thể て làm bước trung gian để nhớ thể た: kết thúc bằng て thì đổi thành た; kết thúc bằng で thì đổi thành だ.');
 }
 return lines;
}
const explanation=document.createElement('div');explanation.id='conjugation-tip';explanation.className='conjugation-tip';explanation.setAttribute('role','tooltip');explanation.hidden=true;document.body.appendChild(explanation);
let tipTarget=null,tipTimer;
function closeExplanation(){clearTimeout(tipTimer);if(tipTarget)tipTarget.removeAttribute('aria-describedby');tipTarget=null;explanation.hidden=true}
function positionExplanation(){if(!tipTarget)return;const rect=tipTarget.getBoundingClientRect(),width=explanation.offsetWidth,height=explanation.offsetHeight;let top=rect.bottom+10;if(top+height>window.innerHeight-12)top=rect.top-height-10;top=Math.max(12,Math.min(top,window.innerHeight-height-12));explanation.style.top=top+'px';explanation.style.left=Math.max(12,Math.min(rect.left,window.innerWidth-width-12))+'px'}
function openExplanation(target){clearTimeout(tipTimer);if(tipTarget&&tipTarget!==target)tipTarget.removeAttribute('aria-describedby');tipTarget=target;if(target.classList.contains('explain-header')){const key=target.dataset.form,col=columns.find(c=>c[0]===key);explanation.innerHTML=`<div class="tip-label">Ý NGHĨA CỦA THỂ</div><b>${col[1]} · ${col[2]}</b><div class="header-explanation">${formDescriptions[key]}</div><div class="tip-dismiss">Nhấn Esc hoặc chạm ra ngoài để đóng</div>`;explanation.hidden=false;target.setAttribute('aria-describedby',explanation.id);positionExplanation();return;}const v=verbs.find(x=>x.id===+target.dataset.verb),info=explainConjugation(v,target.dataset.form),example=verbExample(v,target.dataset.form);explanation.innerHTML=`<div class="tip-label">NHÓM ${info.group}</div><b>${info.title}</b><section class="tip-example"><div class="tip-label">${example.label}</div><div class="example-japanese" lang="ja">${example.html}</div><p class="example-translation">${example.vi}</p>${example.note?`<p class="example-note">${example.note}</p>`:''}</section><div class="tip-result" lang="ja">${info.result}<small>${info.reading}</small></div><ol>${info.steps.map(s=>`<li>${s}</li>`).join('')}</ol>${info.note?`<p>${info.note}</p>`:''}<div class="tip-dismiss">Nhấn Esc hoặc chạm ra ngoài để đóng</div>`;explanation.hidden=false;target.setAttribute('aria-describedby',explanation.id);positionExplanation()}
function delayedClose(){clearTimeout(tipTimer);tipTimer=setTimeout(closeExplanation,200)}
document.addEventListener('pointerover',e=>{const target=e.target.closest('.explain-word,.explain-header');if(target&&e.pointerType!=='touch')openExplanation(target)});
document.addEventListener('pointerout',e=>{const target=e.target.closest('.explain-word,.explain-header');if(target&&!target.contains(e.relatedTarget)&&!explanation.contains(e.relatedTarget))delayedClose()});
explanation.addEventListener('pointerenter',()=>clearTimeout(tipTimer));explanation.addEventListener('pointerleave',delayedClose);
document.addEventListener('focusin',e=>{if(e.target.matches('.explain-word,.explain-header'))openExplanation(e.target)});
document.addEventListener('focusout',e=>{if(e.target.matches('.explain-word,.explain-header'))delayedClose()});
document.addEventListener('click',e=>{const target=e.target.closest('.explain-word,.explain-header');if(target)openExplanation(target);else if(!explanation.contains(e.target))closeExplanation()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeExplanation()});
window.addEventListener('resize',closeExplanation);document.addEventListener('scroll',e=>{if(e.target!==explanation)closeExplanation()},true);
