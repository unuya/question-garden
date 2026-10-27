// GitHub Pages version: no server. The browser calls the Claude API directly with a key kept only in this browser.
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
renderEasy=function(){const root=$('easy-questions');root.replaceChildren();(simpleTopics[active]||easyPairs).forEach(p=>{const wrap=document.createElement('div');wrap.className='easy-item';const b=document.createElement('button');b.className='easy-card';const icon=document.createElement('span');icon.className='easy-icon';icon.textContent=p.icon;const text=document.createElement('b');text.textContent=p.q;b.append(icon,text);b.onclick=()=>{$('question').value=p.q};const read=document.createElement('button');read.className='read';read.textContent='🔊';read.setAttribute('aria-label',p.q+' 소리로 듣기');read.onclick=()=>{if(!window.speechSynthesis){alert('이 기기에서는 읽어주기를 지원하지 않아요.');return}speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(p.q);utterance.lang='ko-KR';utterance.rate=.8;speechSynthesis.speak(utterance)};wrap.append(b,read);root.append(wrap)})};renderEasy();

const SDK_URL='https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk@0.133.0/+esm';
const STORE='question-garden-claude';
const DEFAULT_MODEL='claude-haiku-5-5';
let Anthropic=null;const sdk=()=>Anthropic?Promise.resolve(Anthropic):import(SDK_URL).then(m=>Anthropic=m.default);
const load=()=>{try{return JSON.parse(localStorage.getItem(STORE))}catch{return null}};
const store=v=>{try{v?localStorage.setItem(STORE,JSON.stringify(v)):localStorage.removeItem(STORE)}catch{}};
try{localStorage.removeItem('question-garden-gemini')}catch{}
// API keys are plain ASCII; pasted keys can pick up spaces, zero-width or full-width characters.
const cleanKey=k=>String(k||'').normalize('NFKC').replace(/[\s​-‍﻿]/g,'');
const validKey=k=>/^sk-ant-[\x21-\x7e]{10,200}$/.test(k);
let conf=load();if(conf&&!validKey(conf.key=cleanKey(conf.key))){conf=null;store(null)}

const today=()=>new Date().toLocaleDateString('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'long',day:'numeric',weekday:'long'});
const system=()=>`당신은 초등학생의 학습을 돕는 챗봇입니다. 한국어의 쉬운 말로 2~4문장 답하세요.
오늘은 ${today()}입니다.${conf.region?` 학교는 ${conf.region}에 있습니다.`:''}
- 날씨, 분리배출 방법, 최근 소식처럼 지금·우리 지역 정보가 필요한 질문은 웹 검색으로 확인하고 그 내용을 바탕으로 답하세요.${conf.region?' 지역을 말하지 않으면 학교 지역 기준으로 찾으세요.':''}
- 동물·과학처럼 이미 알려진 지식은 검색하지 말고 바로 답하세요.
- 학교 급식표, 학교 도서관 책 목록, 학교 행사 일정은 아직 연결되어 있지 않습니다. 검색하거나 추측하지 말고 선생님께 확인하도록 안내하세요.
- 모르는 것은 모른다고 하세요. 학생 개인정보를 묻지 마세요. 사실과 의견을 구분하고, 답을 다른 자료에서도 확인해 보도록 이끌어 주세요.`;

const settings=dialog('⚙️ 교사용 Claude 연결');settings.innerHTML='<div class="dialog-heading"><h2>⚙️ 교사용 Claude 연결</h2><button class="quiet" id="close-settings">닫기 ✕</button></div><p><b>Claude API 키</b>를 넣으면 이 브라우저가 Claude에 직접 질문을 보내요. Claude는 날씨나 분리배출처럼 최신 정보가 필요하면 스스로 웹을 검색하고, 참고한 사이트를 답 아래에 보여줘요.</p><p>키는 <b>이 기기의 브라우저에만</b> 저장돼요. ⚠️ 이 기기를 쓰는 사람은 개발자 도구로 키를 볼 수 있으니, Claude 콘솔에서 <b>월 사용 한도</b>를 꼭 걸어두세요. 학생 개인정보는 입력하지 마세요.</p><form id="api-form" autocomplete="off"><label for="api-key">Claude API 키</label><input id="api-key" type="password" required autocomplete="new-password" maxlength="300" placeholder="sk-ant-…  (Claude 콘솔에서 발급)"><label for="api-region">학교 지역</label><input id="api-region" maxlength="40" placeholder="예: 서울 마포구"><label for="api-model">모델 이름</label><input id="api-model" required maxlength="80" value="'+DEFAULT_MODEL+'"><p>질문 하나에 보통 1원도 안 들고, 웹 검색을 하면 검색 1번에 약 1센트가 더 들어요. 사용한 만큼 충전한 크레딧에서 빠져요.</p><button class="send" type="submit">키 확인하고 연결하기</button></form><button id="disconnect" class="quiet">연결 해제 · 시연 모드로 돌아가기</button><p id="api-status" role="status"></p>';
const settingsButton=document.createElement('button');settingsButton.className='quiet';settingsButton.textContent='⚙️ API 설정';document.querySelector('header').append(settingsButton);settingsButton.onclick=()=>settings.showModal();$('close-settings').onclick=()=>settings.close();let busy=false;

// Every failure shows the HTTP status and the API's error body, or the browser's network error. One question = one request: no automatic retries.
const redact=(s,key)=>key?String(s).split(key).join('***'):String(s);
function explain(e,key){if(Anthropic&&e instanceof Anthropic.APIConnectionError)return `Claude에 연결하지 못했어요 (네트워크 오류).\n${e.name}: ${e.message}${e.cause?.message?' ('+e.cause.message+')':''}\n인터넷 연결, 학교 방화벽, 광고 차단 확장 프로그램을 확인해 주세요.`;if(Anthropic&&e instanceof Anthropic.APIError)return redact(`Claude 오류 · HTTP ${e.status??'?'}\n${e.error?JSON.stringify(e.error,null,1).slice(0,3000):e.message}`,key);if(/import|module|dynamically/i.test(e?.message||''))return `Claude 연결 도구를 불러오지 못했어요.\n${e.name}: ${e.message}`;return redact(`${e?.name||'Error'}: ${e?.message||e}`,key)}
const client=key=>new Anthropic({apiKey:key,dangerouslyAllowBrowser:true,maxRetries:0,timeout:90000});

function mode(){document.querySelector('.demo').textContent=conf?'● Claude 연결 모드':'● API 없는 시연 모드';document.querySelector('.chat-heading span').textContent=conf?'Claude 답변 · 출처를 눌러 확인해요':'질문 → 찾아보기 → 내 판단'}
$('api-form').onsubmit=async e=>{e.preventDefault();const key=cleanKey($('api-key').value),model=$('api-model').value.trim(),region=$('api-region').value.trim();if(!validKey(key)){$('api-status').textContent='Claude API 키는 sk-ant- 로 시작해요. Claude 콘솔에서 키를 다시 복사해 붙여넣어 주세요.';return}if(!/^[\w.\-]+$/.test(model)){$('api-status').textContent='모델 이름을 확인해 주세요. 예: '+DEFAULT_MODEL;return}$('api-status').textContent='키를 확인하고 있어요…';try{await sdk();await client(key).messages.countTokens({model,messages:[{role:'user',content:'안녕'}]});/* free, and unlike /v1/models its errors carry CORS headers */conf={key,model,region};store(conf);$('api-key').value='';mode();$('api-status').textContent='키를 확인하고 연결했어요. 질문을 보내 보세요.'}catch(err){$('api-status').textContent=explain(err,key)}};
$('disconnect').onclick=()=>{conf=null;store(null);$('api-key').value='';mode();$('api-status').textContent='연결을 해제하고 이 기기에서 키를 지웠어요.'};
if(conf){$('api-model').value=conf.model;$('api-region').value=conf.region||'';$('api-status').textContent='이 브라우저에 저장된 Claude 연결이 있어요.'}mode();

// The answer is the text after the last search; sources are the pages Claude searched or cited.
function readAnswer(content){let last=-1;content.forEach((b,i)=>{if(b.type==='web_search_tool_result')last=i});const text=content.slice(last+1).filter(b=>b.type==='text').map(b=>b.text).join('').trim();const seen=new Map();for(const b of content){if(b.type==='web_search_tool_result'&&Array.isArray(b.content))b.content.forEach(r=>r.url&&!seen.has(r.url)&&seen.set(r.url,r.title||r.url));if(b.type==='text')(b.citations||[]).forEach(c=>c.url&&!seen.has(c.url)&&seen.set(c.url,c.title||c.url))}return {text,sources:[...seen].slice(0,4)}}
function showSources(bubble,sources){if(!sources.length)return;const box=document.createElement('div');box.className='sources';const t=document.createElement('b');t.textContent='🔎 Claude가 찾아본 곳';box.append(t);for(const [url,title] of sources){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=title;box.append(a)}bubble.append(box)}

const demoSubmit=$('chat-form').onsubmit;
$('chat-form').onsubmit=async e=>{if(!conf)return demoSubmit(e);e.preventDefault();if(busy)return;const q=$('question').value.trim();if(!q)return;busy=true;const send=$('chat-form').querySelector('.send');send.disabled=true;send.textContent='답변 중…';addMessage(q,'user');$('question').value='';
addMessage('생각하는 중…','bot');const bubble=$('messages').lastElementChild,label=bubble.querySelector('strong'),body=bubble.lastChild;label.textContent='Claude 답변 · 다른 자료에서 확인해요';
const history=records.filter(r=>r.live).slice(-6).flatMap(r=>[{role:'user',content:r.question},{role:'assistant',content:r.answer}]);const messages=[...history,{role:'user',content:q}];
try{await sdk();const api=client(conf.key);let final;for(let round=0;round<3;round++){let shown='';const stream=api.messages.stream({model:conf.model,max_tokens:1024,output_config:{effort:'low'},system:system(),messages,tools:[{type:'web_search_20250305',name:'web_search',max_uses:2,user_location:{type:'approximate',country:'KR',timezone:'Asia/Seoul',...(conf.region?{city:conf.region}:{})}}]});
stream.on('streamEvent',ev=>{if(ev.type==='content_block_start'&&ev.content_block.type==='server_tool_use'){shown='';body.textContent='🔎 웹에서 찾아보는 중…'}});stream.on('text',delta=>{shown+=delta;body.textContent=shown;$('messages').scrollTop=$('messages').scrollHeight});
final=await stream.finalMessage();if(final.stop_reason!=='pause_turn')break;messages.push({role:'assistant',content:final.content})}
const {text,sources}=readAnswer(final.content);if(!text)throw Error(`Claude가 답변 글을 주지 않았어요 (종료 이유: ${final.stop_reason}).`);
records.push({question:q,answer:text.slice(0,10000),judgment:'',reason:'',topic:topics[active].name,live:true});latest=records.length-1;body.textContent=text;showSources(bubble,sources);$('messages').scrollTop=$('messages').scrollHeight;document.querySelectorAll('[name=judgment]').forEach(x=>x.checked=false);$('reason').value='';$('judgment-status').textContent=''}
catch(err){label.textContent='연결 오류 · AI 답변 아님';body.textContent=explain(err,conf.key)+'\n설정을 확인하거나 시연 모드로 돌아가 주세요.';$('question').value=q}
finally{busy=false;send.disabled=false;send.textContent='질문 보내기 ↗'}};
reportRows=function(){return records.map((r,i)=>({title:`${i+1}. ${r.question}`,body:[`${r.live?'Claude 답변':'시연 답변'}: ${r.answer.replace(/\n\n[\s\S]*/,'')}`,`내 판단: ${r.judgment||'아직 남기지 않았어요.'}`,`확인 자료와 근거: ${r.reason||'기록하지 않았어요.'}`]}))};
