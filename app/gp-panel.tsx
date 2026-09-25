'use client';
import {items,rate,Student} from './model';
import {gpGroups,gpResult} from './gp-analysis';

export default function GpPanel({students:ss,questions=items,onItem}:{students:Student[];questions?:typeof items;onItem:(id:number)=>void}){
 const g=gpGroups(ss);
 return <section className="card below gp-panel">
 <div className="between"><h2>GP分析 · 上位群と下位群の比較</h2><span className="badge">受け持ちの生徒 {ss.length}人</span></div>
 <p className="muted gp-intro">今回の総得点で上位群・下位群を分け、同じ問題の正答率を比較します。</p>
 {g.reason?<div className="empty">{g.reason}</div>:<>
 <div className="gp-groups"><div><span className="gp-key gp-upper"/>上位群（G） <b>{g.upper.length}人</b><small>{g.upperCut}点以上</small></div><div><span className="gp-key gp-lower"/>下位群（P） <b>{g.lower.length}人</b><small>{g.lowerCut}点以下</small></div><p>差＝上位群の正答率 − 下位群の正答率</p></div>
 {Math.min(g.upper.length,g.lower.length)<10&&<p className="footnote">各群の人数が少ないため、1人の正誤で割合が大きく変わります。人数と答案を合わせて確認できます。</p>}
 <div className="trend-scroll gp-table" tabIndex={0} role="region" aria-label="GP分析の一覧。横スクロールで全ての列を確認できます"><table><thead><tr><th>設問・学習内容</th><th>上位群・下位群の正答率</th><th>上位群 − 下位群</th><th>受け持ちの生徒<br/>全員の正答率</th><th>全受験者の正答率</th></tr></thead><tbody>{questions.map(i=>{
 const u=gpResult(g.upper,i.id),l=gpResult(g.lower,i.id),diff=u.rate!-l.rate!;
 return <tr key={i.id}><td><button className="textlink" onClick={()=>onItem(i.id)}>問題 {i.no} →</button><p><b>{i.topic}</b></p><p className="muted">{i.area} / {i.unit}</p></td><td>{[{label:'上位群',v:u,cls:'gp-upper'},{label:'下位群',v:l,cls:'gp-lower'}].map(({label,v,cls})=><div className="gp-bar" key={label}><span>{label}</span><div className="track"><div className={cls} style={{width:v.rate+'%'}}/></div><b>{v.rate!.toFixed(1)}%</b><small>{v.correct}/{v.n}人</small></div>)}</td><td className={diff<0?'gp-reverse':''}><b>{diff>0?'+':''}{diff.toFixed(1)}ポイント</b><p className="muted">{diff<0?'下位群の正答率が高い':diff===0?'両群の正答率が同じ':'上位群の正答率が高い'}</p></td><td>{rate(ss,i.id).toFixed(1)}%</td><td>{i.overall.toFixed(1)}%</td></tr>;
 })}</tbody></table>{!questions.length&&<p className="empty">条件に一致する問題はありません。</p>}</div>
 {questions.length===1&&<div className="gp-answer-counts">{[{name:'上位群',v:gpResult(g.upper,questions[0].id)},{name:'下位群',v:gpResult(g.lower,questions[0].id)}].map(({name,v})=><p key={name}><b>{name}</b>：正解 {v.correct}人 ／ 不正解 {v.wrong}人 ／ 未回答 {v.blank}人</p>)}</div>}
 </>}
 <details className="below"><summary>群の分け方・比較できる情報</summary><p>画面上部で選択した学校・クラスの受け持ちの生徒が対象です。今回の総得点（比較する設問の配点を含む）で上下それぞれ27%を目安に抽出します。人数は小数点以下を切り捨て、最低1人とし、境界の同点者は全員含めます。中央の生徒はGPの2群には含めません。</p><p>問題の検索・分類の絞り込みでは群を変更しません。未回答は正答率の分母に含めます。差だけで問題の良し悪しや理解不足を判定するものではありません。</p><p>全受験者のGP集計と、選択肢別の回答データは未提供です。全受験者との比較は全体の正答率を表示しています。</p></details>
 </section>;
}
