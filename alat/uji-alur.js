const fs=require('fs');const s=fs.readFileSync(process.argv[2]||require('path').join(__dirname,'..','index.html'),'utf8');const js=s.slice(s.indexOf('<script>')+8,s.lastIndexOf('</script>'));const data=js.slice(0,js.indexOf('/* ===================== TAMPILAN'));
const T=new Function(data+';return {M,TOPIC,CARDS,TLAIN,LAIN,scoreAll,outside,unread,stability,HOBI,TONTON,KERJA,SUBJ,VALS,DB,dims,bonusCards};')();
let seed=12345;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};const R=a=>a[Math.floor(rnd()*a.length)];const pick=(arr,n)=>arr.filter(()=>rnd()<n/arr.length);
function play(){const sw={};[...T.CARDS,...T.TOPIC].forEach(c=>sw[c[0]]=R([0,.5,1]));
 T.bonusCards(T.dims(sw)).forEach(id=>sw[id]=R([0,.5,1]));
 const S={sw,times:[],duel:{},feel:{},grit:{},mopt:{},ready:{},know:{},incar:[],enjoy:pick(T.SUBJ.map(x=>x[0]),3),good:[],vals:pick(T.VALS.map(x=>x[0]),3).slice(0,3),style:{o:R('abx'),l:R('abx'),r:R('abx')},db:pick(T.DB.map(x=>x[0]),1),hobi:pick(T.HOBI.map(x=>x[0]),3).slice(0,3),tonton:pick(T.TONTON.map(x=>x[0]),3).slice(0,3),sang:{},daily:{},pick:null,weak:[],strong:[]};
 const cand=T.scoreAll(S).map(x=>x.id).slice(0,6);cand.forEach(id=>S.duel[id]={w:0,n:0});
 [[0,1],[2,3],[4,5],[0,2],[1,4],[3,5],[0,5]].forEach(([a,b])=>{a=cand[a];b=cand[b];S.duel[a].n++;S.duel[b].n++;const k=R([a,b,'both','none']);if(k=='both'){S.duel[a].w+=.6;S.duel[b].w+=.6}else if(k!='none')S.duel[k].w++});
 T.scoreAll(S).filter(x=>cand.includes(x.id)).slice(0,3).forEach(x=>S.feel[x.id]=.6*R([0,.5,1])+.4*R([1,.7,.2]));
 const fl=T.scoreAll(S).slice(0,3).map(x=>x.id);fl.slice(0,2).forEach(id=>{S.daily[id]=(R([0,.5,1])+R([0,.5,1])+R([0,.5,1])+R([0,.5,1]))/4});fl.forEach(id=>S.sang[id]=R([0,.5,1]));S.pick=R([...fl,null]);return S;}
const N=20000,c={},c3={},lv={kuat:0,mungkin:0,aman:0};let un=0;
for(let i=0;i<N;i++){const S=play(),r=T.scoreAll(S);if(T.unread(S,r))un++;c[r[0].id]=(c[r[0].id]||0)+1;r.slice(0,3).forEach(x=>c3[x.id]=(c3[x.id]||0)+1);lv[T.outside(S).level]++}
const v=T.M.map(m=>(c[m.id]||0)/N*100),w=T.M.map(m=>(c3[m.id]||0)/N*100);
console.log('ALUR LENGKAP ACAK, 22 jurusan (ideal top1 4,55%, top3 13,6%)');
console.log('top1 min',Math.min(...v).toFixed(1),T.M[v.indexOf(Math.min(...v))].id,'| maks',Math.max(...v).toFixed(1),T.M[v.indexOf(Math.max(...v))].id);
console.log('top3 min',Math.min(...w).toFixed(1),T.M[w.indexOf(Math.min(...w))].id,'| maks',Math.max(...w).toFixed(1),T.M[w.indexOf(Math.max(...w))].id);
console.log('belum terbaca',(un/N*100).toFixed(2)+'%','| tanda luar 22: kuat',(lv.kuat/N*100).toFixed(1)+'%','mungkin',(lv.mungkin/N*100).toFixed(1)+'%');
// tahan salah geser: pemain ideal tiap jurusan, satu kartu utamanya salah geser (jadi 0)
let ok1=0,ok3=0;T.M.forEach(m=>{const sw={};T.TOPIC.forEach(t=>sw[t[0]]=t[2][m.id]>=.9?1:t[2][m.id]?.5:0);T.CARDS.forEach(cd=>{const x=m.p[cd[1]]||0;sw[cd[0]]=x>=.6?1:x>=.3?.5:0});
 const main=T.TOPIC.find(t=>t[2][m.id]>=.9&&!t[0].startsWith('k_'));sw[main[0]]=0;
 const r=T.scoreAll({sw,times:[],duel:{},feel:{}});const k=r.findIndex(x=>x.id===m.id);if(k===0)ok1++;if(k<3)ok3++;else console.log('  jatuh:',m.id,'urutan',k+1)});
console.log('SALAH GESER 1 KARTU UTAMA: tetap nomor 1 pada',ok1,'dari 22 jurusan; tetap 3 teratas pada',ok3,'dari 22');
