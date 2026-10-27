// Keep the conversation visible; secondary activities open only when requested.
const main=document.querySelector('main'),panel=document.querySelector('.panel');
document.querySelector('.intro').remove();
const aside=document.querySelector('aside');main.prepend(aside);
const toolbar=document.createElement('div');toolbar.className='chat-tools';
const choose=document.createElement('button');choose.className='quiet';choose.textContent='💡 예시 질문 고르기';
const judge=document.createElement('button');judge.className='quiet';judge.textContent='🌼 내 판단 · PDF';
const search=document.querySelector('.search');search.innerHTML='🔎 직접 찾아보기 ↗';toolbar.append(choose,search,judge);panel.prepend(toolbar);
function dialog(title){const d=document.createElement('dialog');d.className='activity-dialog';const head=document.createElement('div');head.className='dialog-heading';const h=document.createElement('h2');h.textContent=title;const close=document.createElement('button');close.className='quiet';close.textContent='닫기 ✕';close.onclick=()=>d.close();head.append(h,close);d.append(head);d.setAttribute('aria-label',title);document.body.append(d);d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}});return d}
const picker=dialog('💡 궁금한 질문을 골라요');picker.append(document.querySelector('.panel-head'),$('animals'),document.querySelector('.easy'),$('questions'));
choose.onclick=()=>picker.showModal();$('categories').addEventListener('click',e=>{if(e.target.closest('button'))picker.showModal()});
picker.addEventListener('click',e=>{if(e.target.closest('.question-card,.easy-card')){picker.close();$('question').focus()}});
const reflection=dialog('🌼 확인하고 내 생각 남기기');const details=document.querySelector('details');details.open=true;reflection.append(details,$('result'));judge.onclick=()=>reflection.showModal();
document.querySelector('.search-bar').remove();
document.querySelector('.welcome').innerHTML='어떤 것이 궁금한가요? 🌷<br>위에서 주제를 고르거나, 아래에 직접 질문해 보세요.<small>지금은 시연 모드예요. 준비된 질문에 예시 답변을 보여줘요.</small>';
document.querySelector('.chat-heading span').textContent='질문 → 찾아보기 → 내 판단';
$('question').rows=1;
const oldReset=$('reset').onclick;$('reset').onclick=()=>{oldReset();};
function fitViewport(){document.documentElement.style.setProperty('--app-height',(window.visualViewport?.height||window.innerHeight)+'px')}
window.visualViewport?.addEventListener('resize',fitViewport);window.addEventListener('resize',fitViewport);fitViewport();
