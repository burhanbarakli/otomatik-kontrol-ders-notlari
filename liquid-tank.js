/* Educational tank: volume balance, proportional inlet valve, PI level control.
   Geometry, gains and converter ranges are chosen for the lesson, not a real plant. */
window.createLiquidTank=function(root){
  'use strict';
  const card=(step,name,value,note)=>`<div class="mill-block" data-step="${step}"><span class="mill-block-name">${name}</span><output id="tank-block-${step}">${value}</output><small>${note}</small></div>`;
  const cabinet=(id,x,y,w,h,title,value,steps,extra='')=>`<g class="mill-scene-box ${extra}" data-tank-step="${steps}" transform="translate(${x} ${y})"><rect class="mill-cabinet" width="${w}" height="${h}" rx="7"/><text class="mill-cabinet-title" x="${w/2}" y="22" text-anchor="middle">${title}</text><text id="${id}" class="mill-cabinet-value" x="${w/2}" y="${h-15}" text-anchor="middle">${value}</text></g>`;
  root.innerHTML=`
  <figure class="lesson-source-figure">
    <figcaption><span>Ders notundaki şekil · Sıvı seviye kontrolü</span><a href="assets/sivi-seviye-sema.png" target="_blank" rel="noopener">Görseli büyüt ↗</a></figcaption>
    <img src="assets/sivi-seviye-sema.png" width="1518" height="599" alt="Sıvı seviye kontrolünün özgün şeması ve açıklaması: tank, solenoid valf, algılayıcı, işaret düzenleyici, ADC, bilgisayar, referans, DAC ve güç kuvvetlendirici.">
  </figure>
  <div class="mill-main">
    <div class="mill-scene tank-scene">
      <div class="mill-scene-head"><span class="mill-live"><i></i> SIVI SEVİYE KONTROLÜ / CANLI</span><span class="mill-badge" id="tank-badge">Tank doluyor</span></div>
      <svg id="tank-svg" viewBox="0 0 1080 455" role="img" aria-labelledby="tank-title tank-desc">
        <title id="tank-title">Sıvı seviye kontrolünün hareketli gösterimi</title><desc id="tank-desc">Girişteki solenoid valf tanka su verir; çıkış vanası suyu boşaltır. Algılayıcı, işaret düzenleyici ve ADC seviyeyle ilgili bilgiyi bilgisayara iletir. Bilgisayar referans ile ölçümü karşılaştırır. Kontrol komutu DAC ve güç K üzerinden giriş valfine döner.</desc>
        <defs>
          <linearGradient id="tank-bg" x2="0" y2="1"><stop stop-color="#173448"/><stop offset="1" stop-color="#102434"/></linearGradient>
          <linearGradient id="tank-water-fill" x2="0" y2="1"><stop stop-color="#50d5f5" stop-opacity=".85"/><stop offset="1" stop-color="#1473ac" stop-opacity=".85"/></linearGradient>
          <linearGradient id="tank-glass" x2="1" y2="0"><stop stop-color="#aacce3" stop-opacity=".23"/><stop offset=".18" stop-color="#bce7f4" stop-opacity=".02"/><stop offset=".8" stop-color="#bce7f4" stop-opacity=".03"/><stop offset="1" stop-color="#aacce3" stop-opacity=".19"/></linearGradient>
          <linearGradient id="tank-metal" x2="0" y2="1"><stop stop-color="#8eafc1"/><stop offset=".5" stop-color="#e3eef2"/><stop offset="1" stop-color="#4f7184"/></linearGradient>
          <pattern id="tank-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#315163" stroke-width=".6" opacity=".3"/></pattern>
          <clipPath id="tank-glass-clip"><rect x="230" y="192" width="310" height="188" rx="6"/></clipPath>
          <clipPath id="tank-water-clip"><path id="tank-water-mask"/></clipPath>
          <marker id="tank-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#69d9c0"/></marker>
        </defs>
        <rect width="1080" height="455" fill="url(#tank-bg)"/><rect x="20" y="65" width="1040" height="335" fill="url(#tank-grid)"/>
        <path d="M55 409H1030M220 409L188 431M550 409L582 431M820 409L848 431" stroke="#375767" fill="none"/>
        <ellipse cx="390" cy="404" rx="201" ry="15" fill="#071c28" opacity=".55"/>
        <g class="tank-signal-wires">
          <path id="tank-wire-sensor" class="mill-wire" marker-end="url(#tank-arrow)"/>
          <path id="tank-wire-conditioner" class="mill-wire" d="M801 237H861" marker-end="url(#tank-arrow)"/>
          <path id="tank-wire-adc" class="mill-wire" d="M938 205V145H790" marker-end="url(#tank-arrow)"/>
          <path id="tank-wire-reference" class="mill-wire mill-reference-wire" d="M855 86H790" marker-end="url(#tank-arrow)"/>
          <path id="tank-wire-command" class="mill-wire" d="M610 112H567V84H440" marker-end="url(#tank-arrow)"/>
          <path id="tank-wire-dac" class="mill-wire" d="M310 84H224" marker-end="url(#tank-arrow)"/>
          <path id="tank-wire-power" class="mill-wire" d="M158 113V133" marker-end="url(#tank-arrow)"/>
        </g>
        ${cabinet('tank-dac-value',310,55,130,58,'DAC','1,25 V','5')}
        ${cabinet('tank-power-value',92,55,132,58,'Güç K','25 %','6')}
        <g class="mill-scene-box" data-tank-step="3 4" transform="translate(610 55)"><rect class="mill-cabinet" width="180" height="110" rx="7"/><text class="mill-cabinet-title" x="90" y="23" text-anchor="middle">Bilgisayar / PC</text><text class="mill-cabinet-note" x="90" y="45" text-anchor="middle">Karşılaştırma · e = r − y</text><text id="tank-error-value" class="mill-cabinet-value" x="90" y="69" text-anchor="middle">+30,0 cm</text><rect x="12" y="79" width="156" height="23" rx="3" fill="#0d222c"/><text id="tank-command-value" class="mill-cabinet-value" x="90" y="96" text-anchor="middle">Kontrolcü: 25 %</text></g>
        <text class="mill-input-sign" x="797" y="77">+</text><text class="mill-input-sign" x="797" y="137">−</text>
        <g class="mill-scene-box mill-reference-box" data-tank-step="3" transform="translate(855 55)"><rect class="mill-cabinet" width="170" height="65" rx="7"/><text class="mill-cabinet-title" x="85" y="20" text-anchor="middle">Referans seviye</text><text id="tank-reference-value" class="mill-cabinet-value" x="85" y="41" text-anchor="middle">60 cm</text><text id="tank-reference-code" class="mill-cabinet-note" x="85" y="57" text-anchor="middle">Sayısal kod: 2457</text></g>
        <g class="mill-scene-box" data-tank-step="1" transform="translate(636 205)"><rect class="mill-cabinet" width="165" height="64" rx="7"/><text class="mill-cabinet-title" x="82.5" y="20" text-anchor="middle">İşaret düzenleyici</text><text class="mill-cabinet-note" x="82.5" y="36" text-anchor="middle">Algılayıcı → 0–5 V</text><text id="tank-conditioner-value" class="mill-cabinet-value" x="82.5" y="55" text-anchor="middle">1,50 V</text></g>
        ${cabinet('tank-adc-value',861,205,155,64,'ADC','1,50 V → 1229','2')}
        <path d="M50 181H278V216" stroke="#476b80" stroke-width="20" stroke-linejoin="round" fill="none"/><path d="M50 181H278V216" stroke="url(#tank-metal)" stroke-width="14" stroke-linejoin="round" fill="none"/>
        <path id="tank-inlet-flow" d="M50 181H278V216" class="tank-flow" stroke-width="5"/>
        <g id="tank-inlet-valve"><rect x="146" y="133" width="24" height="25" rx="3" fill="#d89942" stroke="#f0c378" stroke-width="2"/><path d="M151 139H165M151 145H165M151 151H165" stroke="#8f5825" stroke-width="2"/><path d="M158 158V180" stroke="#b6d2df" stroke-width="5"/><path d="M140 167L158 181L140 195ZM176 167L158 181L176 195Z" fill="#a7c4d3" stroke="#38586b" stroke-width="2"/><circle id="tank-valve-light" cx="158" cy="181" r="6" fill="#6de8c7"/></g>
        <text x="47" y="153" class="mill-label">Su girişi</text>
        <text x="192" y="147" class="mill-label">Solenoid valf</text><text x="192" y="165" class="mill-sub">Oransal açıklık</text>
        <path d="M220 182V372Q220 390 238 390H532Q550 390 550 372V182" fill="url(#tank-glass)" stroke="#6d9aac" stroke-width="6"/>
        <g clip-path="url(#tank-glass-clip)"><path id="tank-water" fill="url(#tank-water-fill)"/><g id="tank-bubbles" clip-path="url(#tank-water-clip)">${Array.from({length:9},(_,i)=>`<circle id="tank-bubble-${i}" r="${2+i%3}" fill="none" stroke="#b7f2ff" stroke-opacity=".42"/>`).join('')}</g><path id="tank-surface" stroke="#b5f1fc" stroke-width="2" fill="none"/><path d="M242 199V370M251 199V370" stroke="#d2eff6" stroke-opacity=".17" stroke-width="4"/></g>
        <path id="tank-inlet-jet" stroke="#66d5f7" stroke-linecap="round" fill="none"/><path id="tank-jet-sparkle" stroke="#ddf7ff" stroke-width="2" stroke-dasharray="5 12" fill="none"/>
        <path id="tank-reference-line" stroke="#f9c577" stroke-width="2" stroke-dasharray="8 5"/><text id="tank-reference-label" class="tank-target-label" x="208" text-anchor="end">r = 60 cm</text>
        <g id="tank-float"><ellipse rx="13" ry="10" fill="#0f3543" stroke="#92f0d4" stroke-width="2"/><path d="M-10 2H10" stroke="#d1ffed" stroke-width="2"/><circle cy="-3" r="3" fill="#87f2cf"/></g>
        <text x="458" y="174" class="mill-sub">Algılayıcı</text>
        <g class="tank-ruler"><path d="M578 192V380" stroke="#668c9e"/>${[0,25,50,75,100].map(n=>`<path d="M570 ${380-n*1.88}H579" stroke="#90b6c7"/><text x="584" y="${384-n*1.88}">${n}</text>`).join('')}<text x="574" y="401">cm</text></g>
        <text id="tank-level-display" x="381" y="350" text-anchor="middle" class="tank-level-display">30,0 cm</text><text id="tank-volume-display" x="381" y="370" text-anchor="middle" class="tank-volume-display">24,0 litre</text>
        <path d="M550 356H706V388" stroke="#476b80" stroke-width="20" stroke-linejoin="round" fill="none"/><path d="M550 356H706V388" stroke="url(#tank-metal)" stroke-width="14" stroke-linejoin="round" fill="none"/><path id="tank-outlet-flow" d="M550 356H706V388" class="tank-flow" stroke-width="5"/>
        <g><path d="M602 342L620 356L602 370ZM638 342L620 356L638 370Z" fill="#a7c4d3" stroke="#38586b" stroke-width="2"/><path d="M620 329V351" stroke="#b6d2df" stroke-width="4"/><g id="tank-outlet-wheel" transform="translate(620 321)"><circle r="13" fill="#173c43" stroke="#7dc9b5" stroke-width="3"/><path id="tank-wheel-spokes" d="M-11 0H11M0-11V11" stroke="#7dc9b5" stroke-width="3"/></g></g>
        <text x="650" y="300" text-anchor="middle" class="mill-sub">Çıkış vanası</text><path id="tank-outlet-jet" d="M706 390V412" stroke="#66d5f7" stroke-width="5" stroke-dasharray="7 4"/>
        <text x="736" y="398" class="mill-sub">Su çıkışı</text>
        <g transform="translate(785 293)"><rect width="233" height="90" rx="8" fill="#132e3d" stroke="#3c6173"/><text x="15" y="20" class="mill-sub">DEBİ DENGESİ</text><text id="tank-flow-in-value" x="15" y="43" class="mill-digital-text">Giriş: 3,0 L/sn</text><text id="tank-flow-out-value" x="15" y="65" class="mill-digital-text">Çıkış: 3,3 L/sn</text><text id="tank-net-value" x="116.5" y="112" text-anchor="middle" class="mill-label">Seviye düşüyor</text></g>
        <path id="tank-overflow" d="M230 193Q210 199 210 226V387" stroke="#65d5f4" stroke-width="6" stroke-dasharray="9 5" fill="none" opacity="0"/>
        <g id="tank-signal-dots">${['sensor','conditioner','adc','reference','command','dac','power'].map(id=>`<circle id="tank-dot-${id}" r="4" fill="${['reference','command','dac','power'].includes(id)?'#f9c577':'#79edcd'}"/>`).join('')}</g>
      </svg>
      <div class="mill-caption"><span><strong id="tank-scene-action">Giriş debisi artıyor, tank doluyor.</strong></span><span>Temsili tank · 100 cm / 80 L</span></div>
    </div>
    <aside class="mill-panel" aria-label="Sıvı seviye kumandası">
      <div class="mill-target"><label class="mill-reference" for="tank-target">Referans seviye</label><div class="mill-target-row"><output id="tank-target-value">60 <small>cm</small></output><span class="mill-limit">20–80 cm</span></div><input id="tank-target" type="range" min="20" max="80" step="5" value="60" aria-label="Referans seviye, santimetre"></div>
      <div class="mill-readings"><div><span>Ölçülen seviye</span><output id="tank-measured">30,0 <small>cm</small></output></div><div><span>Hata · r − y</span><output id="tank-error">+30,0 <small>cm</small></output></div></div>
      <div class="mill-actions"><button id="tank-disturb" type="button" aria-pressed="false">↗ Çıkışı artır</button><button id="tank-auto" type="button" aria-pressed="true">Otomatik kontrol açık</button></div>
      <div class="mill-pressure"><label for="tank-valve">Giriş valfi komutu <output id="tank-valve-value">25 %</output></label><input id="tank-valve" type="range" min="0" max="100" step="1" value="25" disabled><span id="tank-mode-note" class="mill-limit">Elle ayarlamak için otomatik kontrolü kapat.</span></div>
      <figure class="mill-chart"><figcaption><span>Ölçüm</span><span>Referans · son 20 sn</span></figcaption><svg viewBox="0 0 260 92" preserveAspectRatio="none" role="img" aria-label="Son 20 saniyede sıvı seviyesi ve referans"><path d="M25 12H256M25 42H256M25 72H256" stroke="#dbe3ee"/><text x="0" y="15">100</text><text x="0" y="45">50</text><text x="0" y="75">0</text><path id="tank-chart-band" fill="#138265" opacity=".1"/><path id="tank-chart-ref" fill="none" stroke="#b3732f" stroke-width="1.5" stroke-dasharray="5 4"/><path id="tank-chart-line" fill="none" stroke="#2950db" stroke-width="2.2" stroke-linejoin="round"/><text x="25" y="88">−20 s</text><text x="229" y="88">şimdi</text></svg></figure>
    </aside>
  </div>
  <div class="mill-pipeline tank-pipeline" aria-label="Sıvı seviye kontrol zinciri">
    ${card(0,'01 · Algılayıcı','30,0 cm','Seviyeyi algılar')}${card(1,'02 · Düzenleme','1,50 V','İşaret düzenleyici')}${card(2,'03 · ADC','1229','Analog → sayısal')}
    <div class="mill-digital">${card(3,'04 · Karşılaştırma','+30,0 cm','Referans + / ölçüm −')}${card(4,'05 · Kontrolcü','25 %','Hata → komut')}</div>
    ${card(5,'06 · DAC','1,25 V','Sayısal → analog')}${card(6,'07 · Güç K','25 %','Valfi sürer')}${card(7,'08 · Valf','3,0 L/sn','Giriş debisini ayarlar')}
  </div>
  <div class="mill-explain"><span id="tank-step" class="mill-step">01 / 08 · Algılayıcı</span><p id="tank-explanation">Algılayıcı, tanktaki gerçek seviyeyi izler. Seviye değiştikçe ölçüm işareti de değişir.</p></div>`;
  const $=id=>root.querySelector('#'+id),clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const fmt=(n,d=1)=>n.toLocaleString('tr-TR',{minimumFractionDigits:d,maximumFractionDigits:d});
  const state={time:0,level:30,sensed:30,adc:1229,measured:30.0122,target:60,integral:35,command:25,opening:25,qIn:3,qOut:6*Math.sqrt(.3),overflow:0,wide:false,auto:true,ui:0,phase:-1,history:[]};
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const names=['Algılayıcı','İşaret düzenleyici','ADC','Karşılaştırma','Kontrolcü','DAC','Güç kuvvetlendirici','Solenoid valf'];
  const copy=[
    'Algılayıcı, tanktaki gerçek seviyeyi izler. Seviye değiştikçe ölçüm işareti de değişir.',
    'İşaret düzenleyici, algılayıcının çıkışını ADC’ye uygun hale getirir. Burada 0–100 cm, 0–5 V ile temsil edilir.',
    'ADC, analog ölçümü sayısal koda dönüştürür. Bu örnekte 12 bit kullanılır: 0–4095.',
    'Bilgisayar referanstan ölçümü çıkarır: e = r − y. Seviye hedefin altındaysa hata pozitiftir.',
    'Kontrolcü, pozitif hata için giriş valfini daha fazla açar. Seviye yükseldikçe komutu yeniden ayarlar.',
    'DAC, sayısal kontrol komutunu analog gerilime çevirir. Burada %0–100 komut, 0–5 V ile gösterilir.',
    'Güç K, kontrol komutunu valfin bobinini sürebilecek güç düzeyine taşır.',
    'Valf giriş debisini değiştirir. Giriş çıkıştan büyükse seviye yükselir; debiler eşitse seviye sabit kalır.'
  ];
  const error=()=> (Math.round(state.target/100*4095)-state.adc)*100/4095;
  const signed=n=>(n>0?'+':'')+fmt(n).replace('-','−');
  const pathFor=key=>state.history.map((p,i)=>`${i?'L':'M'}${(25+(p.time-state.time+20)/20*231).toFixed(1)} ${(72-p[key]*.6).toFixed(1)}`).join(' ');
  function drawValues(){
    const e=(Math.round(state.target*10)-Math.round(state.measured*10))/10,good=Math.abs(error())<=1;
    const voltage=state.sensed/100*5,dac=state.command/100*5,net=state.qIn-state.qOut-state.overflow;
    $('tank-target-value').innerHTML=fmt(state.target,0)+' <small>cm</small>';
    $('tank-measured').innerHTML=fmt(state.measured)+' <small>cm</small>';
    $('tank-error').innerHTML=signed(e)+' <small>cm</small>';
    $('tank-valve-value').textContent=fmt(state.command,0)+' %';if(state.auto)$('tank-valve').value=state.command;
    $('tank-badge').textContent=state.overflow>.01?'Taşma var · girişi azalt':good?'HEDEFTE · ±1 cm':state.auto?(net>0?'Tank doluyor':'Seviye düşüyor'):'Elle kontrol sende';
    $('tank-badge').dataset.good=String(good&&state.overflow<.01);
    $('tank-reference-value').textContent=fmt(state.target,0)+' cm';$('tank-reference-code').textContent='Sayısal kod: '+Math.round(state.target/100*4095);
    $('tank-error-value').textContent=signed(e)+' cm';$('tank-command-value').textContent='Kontrolcü: '+fmt(state.command,0)+' %';
    $('tank-conditioner-value').textContent=fmt(voltage,2)+' V';$('tank-adc-value').textContent=fmt(voltage,2)+' V → '+state.adc;
    $('tank-dac-value').textContent=fmt(dac,2)+' V';$('tank-power-value').textContent=fmt(state.command,0)+' %';
    $('tank-level-display').textContent=fmt(state.level)+' cm';$('tank-volume-display').textContent=fmt(state.level*.8)+' litre';
    $('tank-flow-in-value').textContent='Giriş: '+fmt(state.qIn)+' L/sn';$('tank-flow-out-value').textContent='Çıkış: '+fmt(state.qOut)+' L/sn';
    $('tank-net-value').textContent=state.overflow>.01?'Tank taşıyor':Math.abs(net)<.08?'Seviye sabit':net>0?'Seviye yükseliyor':'Seviye düşüyor';
    $('tank-scene-action').textContent=state.overflow>.01?'Giriş, çıkışı aşıyor; fazla su tanktan taşıyor.':good&&Math.abs(net)<.08?'Hedefte: su akıyor, giriş ve çıkış debileri dengede.':net>0?'Giriş > çıkış → seviye yükseliyor.':'Giriş < çıkış → seviye düşüyor.';
    [fmt(state.measured)+' cm',fmt(voltage,2)+' V',String(state.adc),signed(e)+' cm',fmt(state.command,0)+' %',fmt(dac,2)+' V',fmt(state.command,0)+' %',fmt(state.qIn)+' L/sn'].forEach((v,i)=>$('tank-block-'+i).textContent=v);
    $('tank-chart-line').setAttribute('d',pathFor('measured'));$('tank-chart-ref').setAttribute('d',pathFor('target'));
    const y=72-state.target*.6;$('tank-chart-band').setAttribute('d',`M25 ${y-.6}H256V${y+.6}H25Z`);
    root.dataset.level=state.level.toFixed(4);root.dataset.error=error().toFixed(4);root.dataset.opening=state.opening.toFixed(3);root.dataset.command=state.command.toFixed(3);root.dataset.inflow=state.qIn.toFixed(3);root.dataset.outflow=state.qOut.toFixed(3);root.dataset.overflow=state.overflow.toFixed(3);root.dataset.time=state.time.toFixed(2);root.dataset.auto=String(state.auto);
  }
  function drawScene(){
    const surface=380-state.level*1.88,ref=380-state.target*1.88;
    const motion=reduced.matches?0:state.time;
    const wave=Array.from({length:32},(_,i)=>{const x=230+i*10;return `${i?'L':'M'}${x} ${(surface+Math.sin(i*.53+motion*2.2)*1.4).toFixed(2)}`;}).join(' ');
    const water=wave+' L540 380H230Z';$('tank-water').setAttribute('d',water);$('tank-water-mask').setAttribute('d',water);$('tank-surface').setAttribute('d',wave);
    $('tank-float').setAttribute('transform',`translate(510 ${surface.toFixed(2)})`);
    $('tank-wire-sensor').setAttribute('d',`M510 ${surface.toFixed(2)}V178H609V237H636`);
    $('tank-reference-line').setAttribute('d',`M213 ${ref}H545`);$('tank-reference-label').setAttribute('y',ref-6);$('tank-reference-label').textContent='r = '+fmt(state.target,0)+' cm';
    const jet=`M278 217V${Math.max(217,surface).toFixed(2)}`;
    $('tank-inlet-jet').setAttribute('d',jet);$('tank-inlet-jet').setAttribute('stroke-width',2+state.qIn*.5);$('tank-inlet-jet').style.opacity=state.qIn>.03?'1':'0';
    $('tank-jet-sparkle').setAttribute('d',jet);$('tank-jet-sparkle').style.opacity=state.qIn>.03?'.8':'0';
    $('tank-inlet-flow').style.opacity=state.qIn>.03?'.85':'0';$('tank-outlet-flow').style.opacity=state.qOut>.03?'.85':'0';$('tank-outlet-jet').style.opacity=state.qOut>.03?'1':'0';
    $('tank-valve-light').setAttribute('fill',state.opening>1?'#72ebcb':'#546e7c');
    $('tank-wheel-spokes').setAttribute('transform',`rotate(${state.wide?45:0})`);
    $('tank-overflow').style.opacity=state.overflow>.01?'.8':'0';
    for(let i=0;i<9;i++){const b=$('tank-bubble-'+i);b.setAttribute('cx',252+i*29+Math.sin(motion+i)*3);b.setAttribute('cy',380-((motion*(13+i%3*4)+i*23)%190));}
    for(const id of ['tank-inlet-flow','tank-outlet-flow','tank-jet-sparkle','tank-outlet-jet','tank-overflow'])$(id).setAttribute('stroke-dashoffset',-motion*32);
    for(const [i,key]of ['sensor','conditioner','adc','reference','command','dac','power'].entries()){
      const wire=$('tank-wire-'+key),p=wire.getPointAtLength(((motion/2.4+i*.13)%1)*wire.getTotalLength());$('tank-dot-'+key).setAttribute('cx',p.x);$('tank-dot-'+key).setAttribute('cy',p.y);
    }
    $('tank-signal-dots').style.opacity=reduced.matches?'0':'1';
  }
  function tick(ms){
    const dt=Math.min(ms/1000,.1);if(dt<=0)return;state.time+=dt;
    const e=error();
    if(state.auto){const next=state.integral+.65*e*dt,raw=next+2.6*e;if((raw>=0&&raw<=100)||(raw>100&&e<0)||(raw<0&&e>0))state.integral=clamp(next,0,100);state.command=clamp(state.integral+2.6*e,0,100);}
    state.opening+=(state.command-state.opening)*(1-Math.exp(-dt/.55));state.qIn=12*state.opening/100;
    state.qOut=Math.min((state.wide?10:6)*Math.sqrt(state.level/100),state.level*.8/dt+state.qIn);
    const nextLevel=state.level+(state.qIn-state.qOut)/.8*dt;state.overflow=Math.max(0,(nextLevel-100)*.8/dt);state.level=clamp(nextLevel,0,100);
    state.sensed+=(state.level-state.sensed)*(1-Math.exp(-dt/.25));state.adc=clamp(Math.round(state.sensed/100*4095),0,4095);state.measured=state.adc*100/4095;
    const phase=Math.floor(state.time/3.2)%8;
    if(phase!==state.phase){state.phase=phase;root.querySelectorAll('.mill-block').forEach(b=>b.classList.toggle('active',Number(b.dataset.step)===phase));root.querySelectorAll('[data-tank-step]').forEach(b=>b.classList.toggle('active',b.dataset.tankStep.split(' ').includes(String(phase))));$('tank-step').textContent=`0${phase+1} / 08 · ${names[phase]}`;$('tank-explanation').textContent=copy[phase];}
    state.ui+=dt;if(state.ui>=.08){state.ui=0;state.history.push({time:state.time,measured:state.measured,target:state.target});while(state.history.length&&state.history[0].time<state.time-20)state.history.shift();drawValues();}drawScene();
  }
  $('tank-target').addEventListener('input',e=>{state.target=Number(e.target.value);drawValues();drawScene();});
  $('tank-disturb').addEventListener('click',()=>{state.wide=!state.wide;$('tank-disturb').textContent=state.wide?'↘ Normal çıkışa dön':'↗ Çıkışı artır';$('tank-disturb').setAttribute('aria-pressed',String(state.wide));drawScene();});
  $('tank-auto').addEventListener('click',()=>{state.auto=!state.auto;if(state.auto)state.integral=clamp(state.command-2.6*error(),0,100);$('tank-auto').setAttribute('aria-pressed',String(state.auto));$('tank-auto').textContent=state.auto?'Otomatik kontrol açık':'Elle kontrol · otomatiğe dön';$('tank-valve').disabled=state.auto;$('tank-valve').value=state.command;$('tank-mode-note').textContent=state.auto?'Elle ayarlamak için otomatik kontrolü kapat.':'Valfi aç → giriş debisi artar. Kapat → azalır.';drawValues();});
  $('tank-valve').addEventListener('input',e=>{if(!state.auto){state.command=Number(e.target.value);drawValues();}});
  drawValues();drawScene();return {tick,refresh:()=>{drawValues();drawScene();}};
};
