import test from 'node:test';
import assert from 'node:assert/strict';
import { verbs, columns, conjugate, formDescriptions } from '../lib/verbs.js';
import { explainConjugation } from '../lib/explanations.js';
import { verbExample } from '../lib/examples.js';
import { sanitizeTable, sanitizeStudy, allForms } from '../lib/preferences.js';
import { accepted, createSession, makePool, sanitizeHistory, getStats, taskKey } from '../lib/practice.js';
const verb=word=>verbs.find(v=>v.word===word);
test('irregular verbs and homophones retain correct conjugation',()=>{
 for(const [word,form,expected] of [['行く','te','行って'],['ある','nai','ない'],['来る','nai','来ない'],['切る','masu','切ります'],['着る','masu','着ます'],['要る','masu','要ります'],['いる','masu','います'],['泳ぐ','ta','泳いだ'],['勉強する','te','勉強して']])assert.equal(conjugate(verb(word))[form],expected);
 assert.equal(conjugate(verb('来る'),'くる').nai,'こない');
});
test('every word and form retains its explanation and furigana example',()=>{
 assert.equal(verbs.length,123);assert.equal(new Set(verbs.map(v=>v.word)).size,123);
 for(const v of verbs)for(const form of ['dictionary',...allForms]){
  const explanation=explainConjugation(v,form),example=verbExample(v,form);
  assert(explanation.steps.length);assert(example.html.includes('<rt>'));assert(example.vi);
  assert(!JSON.stringify({explanation,example}).includes('undefined'));
  if(form!=='dictionary')assert(!explanation.steps.includes(formDescriptions[form]));
 }
});
test('typing accepts kana, kanji and normalized Japanese input',()=>{
 const t={v:verb('来る'),form:'nai'};assert(accepted(t,'来ない'));assert(accepted(t,'こない'));assert(accepted(t,' コナイ '));assert(!accepted(t,'くない'));assert(!accepted({v:verb('切る'),form:'masu'},'きます'));
});
test('old filter data preserves empty and multiple selections',()=>{
 assert.deepEqual(sanitizeTable({search:'ăn',reading:false,groups:['1','3'],forms:['te']}),{search:'ăn',reading:false,groups:['1','3'],forms:['te']});
 assert.deepEqual(sanitizeTable({groups:[],forms:[]}).groups,[]);assert.deepEqual(sanitizeTable({groups:[],forms:[]}).forms,[]);
 assert.equal(sanitizeStudy({mode:'group',length:'all',order:'random',groups:['2'],forms:[]}).mode,'group');assert.equal(sanitizeStudy(null).mode,'mixed');
});
test('group-only and mixed sessions cover selected tasks without duplicates',()=>{
 const settings={mode:'group',groups:['1','2','3'],forms:[],length:'all',order:'random'};
 const group=createSession(settings,{});assert.equal(group.length,123);assert(group.every(t=>t.form==='group'));assert.equal(new Set(group.map(taskKey)).size,123);
 const mixed=makePool({...settings,mode:'mixed',forms:allForms});assert.equal(mixed.length,123*14);
 const selected=makePool({...settings,groups:['2']});assert(selected.every(t=>t.v.group===2));
});
test('weak ordering and old history distinguish group/vocab/conjugation records',()=>{
 const bad={v:verb('食べる'),form:'group'},good={v:verb('行く'),form:'masu'};
 const history=sanitizeHistory({[taskKey(bad)]:{ok:false,at:1},[taskKey(good)]:{ok:true,at:1},invalid:{ok:true}});
 const session=createSession({mode:'mixed',groups:['1','2','3'],forms:['masu'],length:'10',order:'weak'},history);
 assert.equal(taskKey(session[0]),taskKey(bad));assert(!session.some(t=>taskKey(t)===taskKey(good)));
 assert.deepEqual(getStats(history),{seen:2,pairs:1,groups:1,accuracy:'50%'});
});
