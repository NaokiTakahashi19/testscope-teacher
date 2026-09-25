import type {Student} from './model';

export function gpGroups(students:Student[]){
 const ordered=[...students].sort((a,b)=>a.score-b.score);
 if(ordered.length<2)return {upper:[] as Student[],lower:[] as Student[],upperCut:null,lowerCut:null,reason:'比較するための生徒数が不足しています。'};
 const size=Math.max(1,Math.floor(ordered.length*.27));
 const lowerCut=ordered[size-1].score,upperCut=ordered[ordered.length-size].score;
 if(lowerCut>=upperCut)return {upper:[] as Student[],lower:[] as Student[],upperCut,lowerCut,reason:'同点者が多く、上位群と下位群を重ならずに分けられません。'};
 return {upper:ordered.filter(s=>s.score>=upperCut),lower:ordered.filter(s=>s.score<=lowerCut),upperCut,lowerCut,reason:null};
}
export function gpResult(group:Student[],id:number){
 const correct=group.filter(s=>s.answers[id]===1).length;
 const blank=group.filter(s=>s.answers[id]===-1).length;
 return {correct,blank,wrong:group.length-correct-blank,n:group.length,rate:group.length?correct/group.length*100:null};
}
