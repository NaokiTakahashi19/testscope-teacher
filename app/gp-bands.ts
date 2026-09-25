export const bandRanges=[
 {label:'1',range:'θ < −1.5',min:-Infinity,max:-1.5},
 {label:'2',range:'−1.5 ≤ θ < −0.5',min:-1.5,max:-.5},
 {label:'3',range:'−0.5 ≤ θ < 0.5',min:-.5,max:.5},
 {label:'4',range:'0.5 ≤ θ < 1.5',min:.5,max:1.5},
 {label:'5',range:'1.5 ≤ θ',min:1.5,max:Infinity}
];
export function bandResults(responses:{theta:number;answer:number}[]){
 return bandRanges.map(b=>{
  const members=responses.filter(s=>Number.isFinite(s.theta)&&s.theta>=b.min&&s.theta<b.max);
  const counts=[1,0,-1].map(a=>members.filter(s=>s.answer===a).length);
  return {...b,n:members.length,counts,rates:counts.map(n=>members.length?n/members.length*100:null)};
 });
}
