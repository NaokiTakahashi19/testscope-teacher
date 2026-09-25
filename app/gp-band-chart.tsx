'use client';
import {useState} from 'react';
import type {Student} from './model';
import {estimate} from './irt-feedback';
import {bandResults} from './gp-bands';

const series=[{label:'正解',color:'#087f83',dash:undefined},{label:'不正解',color:'#be5478',dash:'8 4'},{label:'未回答',color:'#7b8794',dash:'2 5'}];
export default function GpBandChart({students,questionId}:{students:Student[];questionId:number}){
 const [selected,setSelected]=useState<number|null>(null);
 const bands=bandResults(students.map(s=>({theta:estimate(s).theta,answer:s.answers[questionId]})));
 const W=760,H=360,L=64,R=42,T=30,B=85,x=(i:number)=>L+i*(W-L-R)/4,y=(v:number)=>T+(100-v)*(H-T-B)/100;
 const chosen=selected===null?null:bands[selected];
 return <section className="card below gp-band-chart"><div className="between"><h2>GP分析図 · 学力帯別の解答状況</h2><span className="badge">受け持ちの生徒 {students.length}人</span></div>
 <p className="muted gp-intro">右ほど推定学力が高い集団です。各学力帯で正解・不正解・未回答が占める割合を比較します。</p>
 <div className="legend">{series.map(s=><span key={s.label}><i style={{background:s.color}}/>{s.label}</span>)}</div>
 {students.length===0?<p className="empty">この条件では分析対象の結果がありません。</p>:<>
 <div className="trend-scroll" tabIndex={0} role="region" aria-label="IRT学力帯別の正解・不正解・未回答の割合"><svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="5つのIRT学力帯の折れ線グラフ。数値は下の表でも確認できます。" style={{width:'100%',minWidth:650}}>
 <text x={L} y={16}>割合（%）</text>
 {[0,20,40,60,80,100].map(v=><g key={v}><line x1={L} x2={W-R} y1={y(v)} y2={y(v)} stroke="#dce5eb"/><text x={L-12} y={y(v)+4} textAnchor="end">{v}</text></g>)}
 {bands.map((b,i)=><g key={b.label}><line x1={x(i)} x2={x(i)} y1={T} y2={H-B} stroke="#edf2f6"/><text x={x(i)} y={H-59} textAnchor="middle">{b.label}</text><text x={x(i)} y={H-39} textAnchor="middle">{b.n?b.n+'人':'対象者なし'}</text></g>)}
 {series.map((s,j)=><g key={s.label}>{bands.map((b,i)=>{const v=b.rates[j];if(v===null)return null;const prev=i?bands[i-1].rates[j]:null;return <g key={i}>{prev!==null&&<line x1={x(i-1)} y1={y(prev)} x2={x(i)} y2={y(v)} stroke={s.color} strokeWidth={2.5} strokeDasharray={s.dash}/>}<circle cx={x(i)} cy={y(v)} r={j===0?6:j===1?4.5:3} fill={s.color}><title>{`学力帯${b.label} / ${s.label} ${v.toFixed(1)}%（${b.counts[j]}/${b.n}人）`}</title></circle></g>})}</g>)}
 <text x={W/2} y={H-10} textAnchor="middle">IRT学力帯（低い ← → 高い）</text>
 </svg></div>
 <div className="gp-band-buttons">{bands.map((b,i)=><button key={b.label} className="secondary" aria-pressed={selected===i} onClick={()=>setSelected(i)}>学力帯{b.label} · {b.n}人</button>)}</div>
 {chosen&&<div className="callout"><b>学力帯{chosen.label}（{chosen.range}）</b><p>{chosen.n?series.map((s,j)=>s.label+' '+chosen.counts[j]+'人（'+chosen.rates[j]!.toFixed(1)+'%）').join(' ／ '):'この学力帯に該当する生徒はいません。'}</p></div>}
 <p className="footnote">対象者がいない学力帯は点を表示せず、線をつなぎません。人数が少ない学力帯では、1人の正誤で割合が大きく変わります。</p>
 </>}
 <details className="below"><summary>学力帯の範囲・人数・割合を表で確認</summary><div className="trend-scroll"><table><thead><tr><th>IRT学力帯</th><th>推定学力値 θ の範囲</th><th>人数</th>{series.map(s=><th key={s.label}>{s.label}</th>)}</tr></thead><tbody>{bands.map(b=><tr key={b.label}><td>{b.label}</td><td>{b.range}</td><td>{b.n}人</td>{b.rates.map((v,j)=><td key={j}>{v===null?'—':b.counts[j]+'人（'+v.toFixed(1)+'%）'}</td>)}</tr>)}</tbody></table></div><p className="footnote">学力帯はθを−1.5・−0.5・0.5・1.5で区切った表示用の区分です。LRTの学習段階とは異なります。画面上部の学校・クラスで対象を絞り込みます。</p></details>
 </section>;
}
