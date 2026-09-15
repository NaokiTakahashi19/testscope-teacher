import { mathDemo } from './math-demo';
export const items=mathDemo.slice(0,24).map((x,i)=>({...x,id:i,no:`${Math.floor(i/4)+1}（${i%4+1}）`,point:i<4?5:4,school:Math.max(20,86-i*2),overall:Math.max(22,82-i*2)}));
export const rounds=[{name:'第1回 学力診断',period:'2026/04/13 – 04/24'},{name:'第2回 学力診断',period:'2026/07/06 – 07/17'},{name:'第3回 学力診断',period:'2026/09/01 – 09/10'}];
export const stageNames=['基礎の確認','基本の活用','応用への接続','発展的な活用'];
export const colors=['#aacbd3','#70a9b7','#258f96','#225768'];
export type Student={id:string;school:string;cls:string;answers:number[];score:number;stage:number|null;probs:number[]};
export function students(r:number):Student[]{return Array.from({length:36},(_,i)=>{const answers=items.map((_,j)=>{const n=(i*31+j*17+r*7)%100;return n>95?-1:n<Math.max(24,88-j*1.9+(i%6-3)*7+r*2)?1:0});const stage=i%17===0?null:(i+r)%4;return {id:`S${String(i+1).padStart(4,'0')}`,school:i<28?'みらい塾秋葉原教室':'みらい塾御徒町教室',cls:i<14?'1':i<28?'2':'1',answers,score:answers.reduce<number>((s,a,j)=>s+(a===1?items[j].point:0),0),stage,probs:stage===null?[]:[0,1,2,3].map(k=>k===stage?70:k===(stage+1)%4?20:5)}}).filter((_,i)=>r!==0||i<32)}
export const mean=(s:Student[])=>s.length?s.reduce((v,x)=>v+x.score,0)/s.length:0;
export const pct=(n:number,d:number)=>d?`${(n/d*100).toFixed(1)}%`:'—';
export const rate=(s:Student[],j:number)=>s.length?s.filter(x=>x.answers[j]===1).length/s.length*100:0;
