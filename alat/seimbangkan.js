const fs=require('fs');const s=fs.readFileSync(process.argv[2]||require('path').join(__dirname,'..','index.html'),'utf8');const js=s.slice(s.indexOf('<script>')+8,s.lastIndexOf('</script>'));
const data=js.slice(0,js.indexOf('/* ===================== TAMPILAN'));
const a=new Function(data+';return {M,TOPIC,CARDS,scoreAll,OFF,GN,deckFor};')();
const {M,TOPIC,CARDS,OFF,GN}=a;const mk=sw=>({sw,duel:{},feel:{},sang:{},enjoy:[],good:[],vals:[],style:{},db:[],incar:[],know:{},ready:{},weak:[],strong:[],mopt:{},grit:{}});
function gen(seed,N){const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};const P=[];for(let i=0;i<N;i++){const sw={};/* pemain acak lewat dek bercabang: hanya kartu yang muncul yang dijawab */for(;;){const id=a.deckFor(sw).find(x=>sw[x]==null);if(!id)break;sw[id]=[0,.5,1][Math.floor(rnd()*3)];}P.push(mk(sw));}return P;}
function share(P){const t={},t3={};M.forEach(m=>{t[m.id]=0;t3[m.id]=0});P.forEach(S=>{const sc=a.scoreAll(S);t[sc[0].id]++;sc.slice(0,3).forEach(x=>t3[x.id]++)});return [t,t3];}
const P=gen(11,15000),tg=P.length/M.length;M.forEach(m=>{OFF[m.id]=0;GN[m.id]=1});
for(let it=0;it<80;it++){const [t,t3]=share(P);const eta=it<20?.02:.008;M.forEach(m=>{OFF[m.id]+=eta*Math.log(3*tg/Math.max(t3[m.id],1));GN[m.id]*=Math.exp(8*eta*Math.log((t3[m.id]/3)/Math.max(t[m.id],1)));GN[m.id]=Math.max(.75,Math.min(1.35,GN[m.id]));});const mean=M.reduce((x,m)=>x+OFF[m.id],0)/M.length;M.forEach(m=>OFF[m.id]-=mean);
 if(it%16===15){const v=Object.values(t).map(x=>x/P.length*100),w=Object.values(t3).map(x=>x/P.length*100);console.log('  top3',Math.min(...w).toFixed(1),Math.max(...w).toFixed(1));console.log(it,Math.min(...v).toFixed(2),Math.max(...v).toFixed(2));}}
M.forEach(m=>{OFF[m.id]=Math.round(OFF[m.id]*1e4)/1e4;GN[m.id]=Math.round(GN[m.id]*1e3)/1e3});
const Q=gen(777,30000);const [t,t3]=share(Q);const f=(o,k)=>{const v=Object.entries(o).sort((x,y)=>y[1]-x[1]);return v[0][0]+' '+(v[0][1]/Q.length*100).toFixed(1)+' ... '+v[v.length-1][0]+' '+(v[v.length-1][1]/Q.length*100).toFixed(1)};
console.log('data baru top1 (3.57):',f(t),'| top3 (10.7):',f(t3));
const miss=[];M.forEach(m=>{const sw={};for(;;){const id=a.deckFor(sw).find(x=>sw[x]==null);if(!id)break;const c=CARDS.find(x=>x[0]===id);if(c){const w=m.p[c[1]]||0;sw[id]=w>=.6?1:w>=.3?.5:0}else{const w=TOPIC.find(x=>x[0]===id)[2][m.id];sw[id]=w>=.9?1:w?.5:0}}const sc=a.scoreAll(mk(sw));if(sc[0].id!==m.id)miss.push(m.id+'->'+sc[0].id)});console.log('ideal miss',miss);
console.log('OFF='+JSON.stringify(OFF));console.log('GN='+JSON.stringify(GN));
