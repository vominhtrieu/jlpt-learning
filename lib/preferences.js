import { columns } from './verbs.js';
export const basicForms = ['masu', 'nai', 'te', 'ta'];
export const politeForms = ['masu', 'masen', 'mashita', 'masendeshita', 'mashou'];
export const allForms = columns.map(c => c[0]);
export const tableDefaults = { search: '', reading: true, groups: ['1', '2', '3'], forms: basicForms };
export const studyDefaults = { mode: 'mixed', groups: ['1', '2', '3'], forms: basicForms, length: '20', order: 'weak' };
function list(value, allowed, fallback) { return Array.isArray(value) && value.every(v => allowed.includes(v)) ? [...new Set(value)] : fallback; }
export function sanitizeTable(s = {}) { s = s && typeof s === 'object' ? s : {}; return { search: typeof s.search === 'string' ? s.search : '', reading: typeof s.reading === 'boolean' ? s.reading : true, groups: list(s.groups, ['1','2','3'], tableDefaults.groups), forms: list(s.forms, allForms, basicForms) }; }
export function sanitizeStudy(s = {}) { s = s && typeof s === 'object' ? s : {}; return { mode: ['vocab','forms','group','mixed'].includes(s.mode) ? s.mode : 'mixed', groups: list(s.groups, ['1','2','3'], studyDefaults.groups), forms: list(s.forms, allForms, basicForms), length: ['10','20','50','all'].includes(s.length) ? s.length : '20', order: ['weak','random'].includes(s.order) ? s.order : 'weak' }; }
export function toggleItem(items, item) { return items.includes(item) ? items.filter(v => v !== item) : [...items, item]; }
