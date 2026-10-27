// Claude artifact version: answers come from the viewer's own Claude account through the `sample` capability.
const simpleTopics={
animals:easyPairs,
meals:[{icon:'🍚 📅 ❓',q:'오늘 뭐 먹어요?'},{icon:'🍎 🍌 ❓',q:'과일이 나와요?'}],
events:[{icon:'🏫 🎉 ❓',q:'학교에 무슨 행사가 있어요?'},{icon:'🎒 🚌 ❓',q:'소풍은 언제 가요?'}],
weather:[{icon:'☀️ ☁️ ❓',q:'오늘 날씨 어때요?'},{icon:'🌧️ ☂️ ❓',q:'내일 비 와요?'}],
recycle:[{icon:'🥛 ♻️ ❓',q:'우유팩은 어디에 버려요?'},{icon:'🔋 ♻️ ❓',q:'건전지는 어디에 버려요?'}],
books:[{icon:'🐱 📚 ❓',q:'고양이 책 있어요?'},{icon:'📖 ✍️ ❓',q:'이 책은 누가 썼어요?'}],
daily:[{icon:'🎒 ✅ ❓',q:'가방에 다 넣었나요?'},{icon:'🧸 🧺 ❓',q:'장난감은 어디에 놓아요?'}]
};
const previousAnswer=answer;answer=q=>{for(const [key,pairs] of Object.entries(simpleTopics)){if(key==='animals')continue;const idx=pairs.findIndex(p=>p.q===q);if(idx>=0){if(key==='daily')return idx===0?'준비물 목록을 보고 가방에 넣은 것을 하나씩 표시해 봐요.':'장난감 자리를 정하고 놀이가 끝나면 그곳에 놓아요.';return topics[key].reply}}return previousAnswer(q)};
renderEasy=function(){const root=$('easy-questions');root.replaceChildren();(simpleTopics[active]||easyPairs).forEach(p=>{const wrap=document.createElement('div');wrap.className='easy-item';const b=document.createElement('button');b.className='easy-card';const icon=document.createElement('span');icon.className='easy-icon';icon.textContent=p.icon;const text=document.createElement('b');text.textContent=p.q;b.append(icon,text);b.onclick=()=>{$('question').value=p.q};const read=document.createElement('button');read.className='read';read.textContent='🔊';read.setAttribute('aria-label',p.q+' 소리로 듣기');read.onclick=()=>{if(!window.speechSynthesis){read.textContent='읽기 미지원';return}speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(p.q);utterance.lang='ko-KR';utterance.rate=.8;speechSynthesis.speak(utterance)};wrap.append(b,read);root.append(wrap)})};renderEasy();

const RULES='당신은 초등학생의 학습을 돕는 챗봇입니다. 한국어의 쉬운 말로 2~4문장 답하세요. 모르는 정보는 모른다고 하세요. 학교 급식표, 도서 목록, 학교 행사 자료와 실시간 날씨는 연결되어 있지 않습니다. 이 정보를 추측하지 마세요. 학생 개인정보를 묻지 마세요. 사실과 의견을 구분하고 다른 자료에서 확인하도록 도와주세요. 이 안내에는 답하지 말고, 다음 질문부터 답하세요.';
const ERRORS={not_granted:'이 페이지가 Claude를 쓰도록 허용되지 않았어요. 페이지 위쪽의 권한 설정에서 허용하면 다시 쓸 수 있어요.',sampling_disabled:'이 계정에서는 Claude 답변을 쓸 수 없어요.',rate_limited:'질문이 너무 많아 잠시 쉬어야 해요. 조금 뒤에 다시 보내 주세요.',session_expired:'Claude 로그인이 끝났어요. 다시 로그인한 뒤 보내 주세요.',refused:'이 질문에는 답할 수 없어요. 다르게 물어봐 주세요.',empty_completion:'답이 비어 있었어요. 질문을 조금 바꿔서 다시 보내 주세요.',upstream_error:'Claude와 잠시 연결이 끊겼어요. 다시 보내 주세요.'};
let sample=null,busy=false,blocked=false;
function mode(){document.querySelector('.demo').textContent=sample&&!blocked?'● Claude 답변 모드':'● API 없는 시연 모드';document.querySelector('.chat-heading span').textContent=sample&&!blocked?'Claude 답변 · 중요한 내용은 확인해요':'질문 → 찾아보기 → 내 판단';const small=document.querySelector('.welcome small');if(small)small.textContent=sample&&!blocked?'무엇이든 물어보면 Claude가 쉬운 말로 답해요. 답을 읽은 뒤에는 다른 자료에서도 확인해 봐요.':'지금은 시연 모드예요. 준비된 질문에 예시 답변을 보여줘요.'}
mode();
window.claude?.use('sample').then(s=>{sample=s;mode()}).catch(()=>{});

const demoSubmit=$('chat-form').onsubmit;
$('chat-form').onsubmit=async e=>{if(!sample||blocked)return demoSubmit(e);e.preventDefault();if(busy)return;const q=$('question').value.trim();if(!q)return;busy=true;const send=$('chat-form').querySelector('.send');send.disabled=true;send.textContent='답변 중…';addMessage(q,'user');$('question').value='';
addMessage('생각하는 중…','bot');const bubble=$('messages').lastElementChild,label=bubble.querySelector('strong');label.textContent='Claude 답변 · 다른 자료에서 확인해요';const body=document.createElement('span');[...bubble.childNodes].forEach(n=>{if(n!==label)n.remove()});body.textContent='생각하는 중…';bubble.append(body);
const turns=records.filter(r=>r.live).slice(-6).flatMap(r=>[{role:'user',content:r.question},{role:'assistant',content:r.answer}]);
try{const {text}=await sample([{role:'user',content:RULES},...turns,{role:'user',content:q}],{modelTier:'quick',cache:false,onText:({text})=>{body.textContent=text;$('messages').scrollTop=$('messages').scrollHeight}});
records.push({question:q,answer:text.slice(0,10000),judgment:'',reason:'',topic:topics[active].name,live:true});latest=records.length-1;body.textContent=text;document.querySelectorAll('[name=judgment]').forEach(x=>x.checked=false);$('reason').value='';$('judgment-status').textContent=''}
catch(err){if(['not_granted','sampling_disabled','not_declared','capability_disabled','capability_removed'].includes(err.code)){blocked=true;mode()}label.textContent='연결 오류 · AI 답변 아님';body.textContent=(err.text?err.text+'\n\n':'')+(ERRORS[err.code]||'답변을 받지 못했어요. 다시 보내 주세요.')+`\n(오류 코드: ${err.code||'unknown'}${err.message?' – '+err.message:''})`;$('question').value=q}
finally{busy=false;send.disabled=false;send.textContent='질문 보내기 ↗'}};
reportRows=function(){return records.map((r,i)=>({title:`${i+1}. ${r.question}`,body:[`${r.live?'Claude 답변':'시연 답변'}: ${r.answer.replace(/\n\n[\s\S]*/,'')}`,`내 판단: ${r.judgment||'아직 남기지 않았어요.'}`,`확인 자료와 근거: ${r.reason||'기록하지 않았어요.'}`]}))};

// The viewer blocks <a download> and confirm(); save the PDF through `downloads` and confirm reset with a second tap.
$('download-pdf').onclick=async()=>{if(!records.some(r=>r.judgment)){$('pdf-status').textContent='먼저 판단을 하나 남겨 주세요.';return}const b=$('download-pdf');b.disabled=true;$('pdf-status').textContent='정리 파일을 만들고 있어요…';try{renderSummary();const blob=await createReportPdf();const downloads=await window.claude?.use('downloads');if(!downloads){$('pdf-status').textContent='이 화면에서는 파일 저장을 쓸 수 없어요.';return}await downloads.save({filename:'궁금한교실_배움기록.pdf',data:blob});$('pdf-status').textContent='PDF 파일을 저장했어요.'}catch(e){$('pdf-status').textContent=e?.code==='cancelled'||e?.code==='declined'?'저장을 취소했어요.':'파일을 만들지 못했어요. 다시 눌러 주세요.'}finally{b.disabled=false}};
const resetAll=$('reset').onclick;let armed=null;$('reset').onclick=()=>{if(!armed){$('reset').textContent='한 번 더 누르면 지워져요';armed=setTimeout(()=>{armed=null;$('reset').textContent='새로 시작하기'},3000);return}clearTimeout(armed);armed=null;$('reset').textContent='새로 시작하기';window.confirm=()=>true;try{resetAll()}finally{delete window.confirm}};
