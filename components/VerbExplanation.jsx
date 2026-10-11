import { explainConjugation } from '../lib/explanations.js';
import { verbExample } from '../lib/examples.js';
export default function VerbExplanation({ verb, form }) {
 const info = explainConjugation(verb, form), example = verbExample(verb, form);
 return <><div className="tip-label">NHÓM {info.group}</div><b>{info.title}</b><section className="tip-example"><div className="tip-label">{example.label}</div><div className="example-japanese" lang="ja" dangerouslySetInnerHTML={{ __html: example.html }}/><p className="example-translation">{example.vi}</p>{example.note && <p className="example-note">{example.note}</p>}</section><div className="tip-result" lang="ja">{info.result}<small>{info.reading}</small></div><ol>{info.steps.map((step, i) => <li key={i}>{step}</li>)}</ol>{info.note && <p>{info.note}</p>}</>;
}
