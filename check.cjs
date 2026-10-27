const fs=require('fs'),vm=require('vm'),assert=require('assert');
class El{constructor(){this.children=[];this.value='';this.innerHTML='';this.textContent='';this.checked=false;}append(...x){this.children.push(...x)}replaceChildren(){this.children=[]}setAttribute(){}focus(){}}
const els={};const document={getElementById:id=>els[id]??=new El(),createElement:()=>new El(),createTextNode:text=>text,querySelectorAll:()=>[],querySelector:()=>null};
const context=vm.createContext({document,confirm:()=>true});vm.runInContext(fs.readFileSync('dist/app.js','utf8'),context);
assert.equal(els.categories.children.length,7);assert.equal(els.animals.children.length,5);assert.equal(els.questions.children.length,5);
vm.runInContext("Object.keys(animals).forEach(name=>{animal=name;render();if(document.getElementById('questions').children.length!==5)throw Error(name)});Object.keys(topics).forEach(key=>{active=key;render();if(document.getElementById('questions').children.length!==5)throw Error(key)})",context);
assert(vm.runInContext("answer('무작위 자유 질문')",context).includes('새로운 답을 만들 수는 없어요'));
assert(vm.runInContext("answer('오늘 급식 메뉴는 무엇인가요?')",context).includes('아직'));
document.getElementById('question').value='<script>alert(1)</script>';els['chat-form'].onsubmit({preventDefault(){}});assert.equal(els.messages.children.length,2);assert.equal(els.messages.children[0].children[1],'<script>alert(1)</script>');
els['save-judgment'].onclick();assert(els['judgment-status'].textContent.includes('골라'));
els.reset.onclick();assert.equal(els.question.value,'');console.log('PASS: 7 topics, 5 animals, 55 questions, free-question fallback, safe text rendering, judgment and reset.');
