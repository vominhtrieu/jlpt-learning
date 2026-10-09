/* Separate UI preferences from learning history; storage failure never blocks use. */
(()=>{
 function read(key){try{const value=JSON.parse(localStorage.getItem(key)||'null');return value&&typeof value==='object'&&!Array.isArray(value)?value:null}catch{return null}}
 function write(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
 function list(value,allowed){return Array.isArray(value)&&value.every(x=>allowed.includes(x))?[...new Set(value)]:null}
 const columnKeys=columns.map(c=>c[0]);
 if(document.getElementById('search')){
  const key='kotoba-table-filters-v1',saved=read(key),groupBoxes=[...document.querySelectorAll('[name="verb-group"]')],columnBoxes=[...document.querySelectorAll('#column-picker input')];
  if(saved){
   if(typeof saved.search==='string')$('search').value=saved.search;
   if(typeof saved.reading==='boolean')$('reading').checked=saved.reading;
   const groups=list(saved.groups,['1','2','3']);if(groups!==null)groupBoxes.forEach(i=>i.checked=groups.includes(i.value));
   const forms=list(saved.forms,columnKeys);if(forms!==null){selected=forms;columnBoxes.forEach(i=>i.checked=forms.includes(i.value))}
   const count=groupBoxes.filter(i=>i.checked).length;$('all-groups').checked=count===3;$('all-groups').indeterminate=count>0&&count<3;
   const presets={basic:['masu','nai','te','ta'],polite:['masu','masen','mashita','masendeshita','mashou'],all:columnKeys};
   document.querySelectorAll('[data-preset]').forEach(b=>{const preset=presets[b.dataset.preset];b.classList.toggle('active',preset.length===selected.length&&preset.every(x=>selected.includes(x)))});
   render();
  }
  function save(){write(key,{search:$('search').value,reading:$('reading').checked,groups:groupBoxes.filter(i=>i.checked).map(i=>i.value),forms:[...selected]})}
  $('search').addEventListener('input',save);
  document.addEventListener('change',e=>{if(e.target.matches('#reading,#all-groups,[name="verb-group"],#column-picker input'))save()});
  document.addEventListener('click',e=>{if(e.target.closest('[data-preset]'))save()});
 }
 if(document.getElementById('setup')){
  const key='kotoba-study-filters-v1',saved=read(key),modeBoxes=[...document.querySelectorAll('[name="mode"]')],groupBoxes=[...document.querySelectorAll('[name="study-group"]')],formBoxes=[...document.querySelectorAll('[name="study-form"]')];
  if(saved){
   if(['vocab','forms','group','mixed'].includes(saved.mode))modeBoxes.forEach(i=>i.checked=i.value===saved.mode);
   const groups=list(saved.groups,['1','2','3']);if(groups!==null)groupBoxes.forEach(i=>i.checked=groups.includes(i.value));
   const forms=list(saved.forms,columnKeys);if(forms!==null)formBoxes.forEach(i=>i.checked=forms.includes(i.value));
   if(['10','20','50','all'].includes(saved.length))$('length').value=saved.length;
   if(['weak','random'].includes(saved.order))$('order').value=saved.order;
   updateSetup();
  }
  function save(){write(key,{mode:modeBoxes.find(i=>i.checked).value,groups:groupBoxes.filter(i=>i.checked).map(i=>i.value),forms:formBoxes.filter(i=>i.checked).map(i=>i.value),length:$('length').value,order:$('order').value})}
  $('setup').addEventListener('change',save);
  $('setup').addEventListener('click',e=>{if(e.target.closest('#basic-forms,#all-forms'))save()});
 }
})();
