const animals={
'고양이':['🐱',[
['고양이 수염은 어떤 일을 하나요?','수염은 주변 물체와 공기의 움직임을 느끼는 데 도움을 줘요. 좁은 곳을 살필 때도 도움이 돼요.'],
['고양이는 왜 가르릉 소리를 내나요?','편안할 때 가르릉 소리를 내기도 해요. 하지만 아프거나 불안할 때도 낼 수 있어, 소리만으로 기분을 정하기는 어려워요.'],
['고양이는 왜 발톱을 긁나요?','발톱의 바깥층을 관리하고 몸을 쭉 펴는 행동이에요. 자신의 흔적을 남기는 역할도 해요.'],
['고양이는 어두운 곳에서도 볼 수 있나요?','사람보다 적은 빛에서도 잘 볼 수 있어요. 하지만 빛이 전혀 없으면 볼 수 없어요.'],
['고양이는 모두 물을 싫어하나요?','모든 고양이가 물을 싫어하는 것은 아니에요. 고양이마다 경험과 성향이 달라요.']]],
'강아지':['🐶',[
['강아지는 왜 산책을 하나요?','몸을 움직이고 주변의 다양한 냄새와 환경을 경험할 수 있어요. 산책 방법과 시간은 건강과 나이에 맞춰야 해요.'],
['강아지는 왜 냄새를 맡나요?','냄새로 주변에 대한 정보를 얻어요. 사람이나 다른 동물의 흔적을 알아보는 데도 도움이 돼요.'],
['강아지가 꼬리를 흔들면 항상 기쁜가요?','항상 기쁘다는 뜻은 아니에요. 긴장하거나 경계할 때도 흔들 수 있어 몸 전체의 모습을 함께 봐야 해요.'],
['강아지는 왜 혀를 내밀고 헐떡이나요?','몸의 열을 내보내는 데 도움이 돼요. 더위뿐 아니라 운동이나 긴장 등 여러 이유가 있어요.'],
['강아지는 사람보다 소리를 잘 듣나요?','사람이 듣기 어려운 높은 소리를 들을 수 있어요. 다만 듣는 능력은 나이와 건강에 따라 달라요.']]],
'토끼':['🐰',[
['토끼의 귀는 왜 길까요?','소리를 듣고 몸의 열을 조절하는 데 도움이 돼요. 귀의 길이는 토끼 종류마다 달라요.'],
['토끼는 당근만 먹나요?','당근만 먹지 않아요. 반려 토끼에게는 건초가 중요한 먹이예요.'],
['토끼의 이는 계속 자라나요?','토끼의 이는 계속 자라요. 먹이를 씹으며 적절히 닳는 것이 중요해요.'],
['토끼는 어떻게 움직이나요?','힘이 센 뒷다리를 사용해 뛰어요. 천천히 이동할 때와 달릴 때의 모습은 달라요.'],
['토끼는 모두 눈이 빨간가요?','모두 빨갛지는 않아요. 갈색 등 다양한 눈 색깔이 있어요.']]],
'햄스터':['🐹',[
['햄스터 볼은 왜 볼록해지나요?','볼 안의 주머니에 먹이를 담아 옮길 수 있어요. 먹이를 보관할 곳으로 가져가기도 해요.'],
['햄스터는 언제 활동하나요?','대체로 저녁이나 밤에 활동하는 경우가 많아요. 종류와 환경에 따라 차이가 있어요.'],
['햄스터는 왜 쳇바퀴를 타나요?','움직이고 달리는 활동을 할 수 있기 때문이에요. 몸에 맞는 안전한 크기가 중요해요.'],
['햄스터는 모두 함께 키워도 되나요?','종류에 따라 다르며 함께 살면 싸울 수 있어요. 특히 골든햄스터는 따로 키워야 해요.'],
['햄스터도 이를 관리해야 하나요?','앞니가 계속 자라기 때문에 적절히 닳아야 해요. 먹기 어려워 보이면 보호자가 수의사에게 확인해야 해요.']]],
'펭귄':['🐧',[
['펭귄은 모두 남극에 사나요?','모두 남극에 살지는 않아요. 남아프리카나 갈라파고스 등 다른 지역에 사는 펭귄도 있어요.'],
['펭귄은 새인가요?','펭귄은 새예요. 깃털이 있고 알을 낳아요.'],
['펭귄은 하늘을 날 수 있나요?','하늘을 날지는 못해요. 대신 날개를 이용해 물속에서 헤엄쳐요.'],
['펭귄은 무엇을 먹나요?','종류와 사는 곳에 따라 물고기, 크릴, 오징어 등을 먹어요.'],
['펭귄은 왜 무리 지어 있나요?','번식하거나 몸의 열을 지키는 등 여러 이유가 있어요. 모든 펭귄의 생활 방식이 같은 것은 아니에요.']]]};
const topics={
animals:{name:'동물',title:'동물 친구들',icon:'🐾'},
meals:{name:'급식',title:'오늘 뭐 먹어요?',icon:'🍚',q:['오늘 급식 메뉴는 무엇인가요?','내일 급식에는 무엇이 나오나요?','이번 주에 어떤 과일이 나오나요?','이번 주에 제가 좋아하는 음식이 나오나요?','급식 메뉴 이름이 어려워요. 어떤 음식인가요?'],reply:'학교 급식표는 아직 이 시연 앱에 연결되지 않았어요. 선생님과 해당 날짜의 급식표에서 메뉴를 확인해 봐요.'},
events:{name:'학교 행사',title:'학교에서 무슨 일이 있나요?',icon:'🏫',q:['가장 가까운 학교 행사는 무엇인가요?','우리 학교 운동회는 언제인가요?','학교 행사는 어디에서 하나요?','현장체험학습에 무엇을 준비해야 하나요?','비가 오면 행사 일정이 바뀌나요?'],reply:'학교 행사 자료는 아직 연결되지 않았어요. 계획된 일정은 바뀔 수 있으니 선생님과 최근 학교 안내를 확인해 봐요.'},
weather:{name:'날씨',title:'하늘이 궁금해요',icon:'☀️',q:['오늘 우리 동네 날씨는 어떤가요?','내일 비가 올까요?','오늘은 어제보다 추운가요?','이번 주에 비가 예보된 날은 언제인가요?','학교 행사 날의 날씨 예보가 나왔나요?'],reply:'이 시연 앱은 실시간 날씨를 가져오지 않아요. 직접 찾아보기에서 기상청 예보를 찾아 지역, 날짜, 발표 시각을 함께 확인해 봐요.'},
recycle:{name:'분리배출',title:'어디에 버릴까요?',icon:'♻️',q:['우유팩은 어떻게 분리배출하나요?','페트병은 어떻게 분리배출하나요?','음식물이 묻은 종이는 어디에 버리나요?','다 쓴 건전지는 어디에 버리나요?','과자 봉지는 어디에 버리나요?'],reply:'물건의 재질과 상태, 지역 수거 기준에 따라 방법이 달라질 수 있어요. 우리 지역의 공식 분리배출 안내를 찾아봐요. 지역마다 수거 방법이 다를 수 있으니 안내의 지역과 날짜도 살펴봐요.'},
books:{name:'도서',title:'책 속으로 떠나요',icon:'📚',q:['학교 도서관에 고양이 책이 있나요?','이 책을 쓴 사람은 누구인가요?','이 책은 어떤 내용인가요?','책을 몇 권 빌릴 수 있나요?','빌린 책은 언제까지 돌려줘야 하나요?'],reply:'도서 목록은 아직 연결되지 않았어요. 책 정보는 표지나 도서 목록에서 확인하고, 대출 규칙과 현재 대출 가능 여부는 도서관 담당 선생님께 물어봐요.'},
daily:{name:'일상생활',title:'매일의 작은 궁금증',icon:'🌱',q:['준비물을 잊지 않으려면 어떻게 할까요?','젖은 신발은 어떻게 말리나요?','친구에게 고마움을 어떻게 표현할까요?','아침에 일어나는 것을 어떻게 준비할까요?','사용한 물건을 어떻게 정리하면 좋을까요?'],answers:['준비물 목록을 만들고 가방에 넣을 때 하나씩 표시해 보세요. 자기 전에 한 번 더 확인해도 좋아요.','신발의 관리 표시를 먼저 확인해요. 가능한 신발은 깔창을 빼고 통풍이 되는 곳에서 말려요. 뜨거운 열은 신발을 손상시킬 수 있어요.','어떤 점이 고마웠는지 구체적으로 말해 보세요. 짧은 편지로 마음을 전할 수도 있어요.','전날 필요한 물건을 준비하고, 보호자와 일정한 잠자리 시간을 정해 볼 수 있어요. 자신에게 맞는 방법을 찾아봐요.','물건마다 놓을 자리를 정하고, 사용한 뒤 그 자리에 돌려놓아 보세요. 글이나 그림 표시도 도움이 돼요.']}
};
let active='animals',animal='고양이';const records=[];let latest=-1;const $=id=>document.getElementById(id);const initial=$('messages').innerHTML;
function render(){ $('categories').replaceChildren();Object.entries(topics).forEach(([key,t])=>{const b=document.createElement('button');b.className='category'+(active===key?' active':'');b.setAttribute('aria-pressed',String(active===key));const i=document.createElement('i');i.textContent=t.icon;const n=document.createElement('span');n.textContent=t.name;const arrow=document.createElement('span');arrow.textContent='↗';b.append(i,n,arrow);b.onclick=()=>{active=key;render()};$('categories').append(b)});const t=topics[active];$('topic-title').textContent=t.title;$('topic-icon').textContent=t.icon;$('animals').replaceChildren();if(active==='animals')Object.entries(animals).forEach(([name,[icon]])=>{const b=document.createElement('button');b.className='animal'+(animal===name?' active':'');b.textContent=icon+' '+name;b.setAttribute('aria-pressed',String(animal===name));b.onclick=()=>{animal=name;render()};$('animals').append(b)});$('questions').replaceChildren();const qs=active==='animals'?animals[animal][1].map(p=>p[0]):t.q;qs.forEach(q=>{const b=document.createElement('button');b.className='question-card';const mark=document.createElement('span');mark.textContent='↗';b.append(mark,document.createTextNode(q));b.onclick=()=>{$('question').value=q;$('question').focus()};$('questions').append(b)});if(typeof renderEasy==='function')renderEasy()}
function addMessage(text,who){const box=document.createElement('div');box.className='message '+who;const label=document.createElement('strong');label.textContent=who==='user'?'나의 질문':'시연용 안내 · 실제 AI 답변 아님';box.append(label,document.createTextNode(text));$('messages').append(box);$('messages').scrollTop=$('messages').scrollHeight}
function answer(q){for(const [,pairs] of Object.values(animals)){const p=pairs.find(p=>p[0]===q);if(p)return p[1]+'\n\n미리 준비한 설명이에요. 도감이나 관련 기관 자료에서도 확인해 봐요.'}for(const t of Object.values(topics)){const idx=t.q?.indexOf(q);if(idx>=0)return t.answers?t.answers[idx]+'\n\n미리 준비한 생활 속 제안이에요. 상황에 맞는 방법을 선생님과 이야기해 봐요.':t.reply}return '질문을 잘 적어 주었어요! 지금은 API 없는 시연 모드여서 이 질문을 이해하고 새로운 답을 만들 수는 없어요.\n준비된 예시 질문으로 연습하거나, 「직접 찾아보기」를 눌러 선생님과 검색해 봐요.'}
$('chat-form').onsubmit=e=>{e.preventDefault();const q=$('question').value.trim();if(!q){$('question').focus();return}const response=answer(q);records.push({question:q,answer:response,judgment:'',reason:'',topic:topics[active].name});latest=records.length-1;addMessage(q,'user');addMessage(response,'bot');$('question').value='';document.querySelectorAll('[name=judgment]').forEach(x=>x.checked=false);$('reason').value='';$('judgment-status').textContent=''};
$('save-judgment').onclick=()=>{const j=document.querySelector('[name=judgment]:checked');$('judgment-status').textContent=j?'내 판단: '+j.value+($('reason').value.trim()?' · '+$('reason').value.trim():' · 근거는 선생님께 말해 보세요.'):'먼저 판단을 하나 골라 주세요.'};
$('reset').onclick=()=>{if(!confirm('대화와 판단을 지우고 새로 시작할까요?'))return;$('messages').innerHTML=initial;$('question').value='';$('reason').value='';$('judgment-status').textContent='';document.querySelectorAll('[name=judgment]').forEach(x=>x.checked=false);records.length=0;latest=-1;if($('result'))$('result').hidden=true;active='animals';animal='고양이';render()};render();
