/* Teaching model: pressure closes the roll gap; downstream measurement is delayed.
   This illustrates the supplied lesson, not the mechanics of a specific mill. */
window.createRollingMill=function(root){
  'use strict';
  const coil=(id,x)=>`<g transform="translate(${x} 284)"><ellipse cy="85" rx="88" ry="13" fill="#081923" opacity=".6"/><circle r="71" fill="url(#mill-coil)" stroke="#8095a4" stroke-width="3"/><g id="${id}">${[63,54,45,36,27].map(r=>`<circle r="${r}" fill="none" stroke="#354e60" stroke-width="3"/><circle r="${r-2}" fill="none" stroke="#c0d3de" stroke-width="1" opacity=".55"/>`).join('')}<path d="M-6-65L8-64L4-20L-4-20Z" fill="#e8b264" opacity=".8"/><path d="M-57 32L-48 41L-17 11L-22 4Z" fill="#9bacb8" opacity=".6"/></g><circle r="18" fill="#142d3f" stroke="#829aab" stroke-width="3"/><circle r="7" fill="#a7bac9"/><path d="M-19 22L-30 81H30L19 22Z" fill="url(#mill-steel)" stroke="#6b8395"/><rect x="-38" y="79" width="76" height="10" rx="3" fill="#304c5f"/></g>`;
  const roller=(id,x,y)=>`<g id="${id}" transform="translate(${x} ${y})"><circle r="35" fill="url(#mill-roller)" stroke="#b8cbd4" stroke-width="2"/><g class="mill-roll-spin"><path d="M-29 0H29M0-29V29" stroke="#536f80" stroke-width="5"/><circle r="25" fill="none" stroke="#405d70" stroke-width="2"/></g><circle r="13" fill="#294757" stroke="#a9c5d1" stroke-width="2"/><circle r="5" fill="#b5cad4"/></g>`;
  const block=(step,name,initial,note)=>`<div class="mill-block" data-step="${step}"><span class="mill-block-name">${name}</span><output id="mill-block-${step}">${initial}</output><small>${note}</small></div>`;
  root.innerHTML=`
    <figure class="lesson-source-figure">
      <figcaption><span>Ders notundaki şekil · Sac levha kalınlık kontrolü</span><a href="assets/sac-levha-sema.png" target="_blank" rel="noopener">Görseli büyüt ↗</a></figcaption>
      <img src="assets/sac-levha-sema.png" width="927" height="614" alt="Sac levha kalınlık kontrolünün özgün şeması: referans ve ölçümün karşılaştırılması, kontrolcü, DAC, güç kuvvetlendirici, hidrolik silindir ve ADC geri beslemesi.">
    </figure>
    <div class="mill-main">
      <div class="mill-scene">
        <div class="mill-scene-head"><span class="mill-live"><i></i> HADDE HATTI / CANLI</span><span id="mill-badge" class="mill-badge">Hedefe yaklaşıyor</span></div>
        <svg id="mill-svg" viewBox="0 0 1080 455" role="img" aria-labelledby="mill-title mill-desc">
          <title id="mill-title">Hareketli sac levha kalınlık kontrol hattı</title><desc id="mill-desc">Soldan açılan kalın sac, hidrolik silindirin bastırdığı merdanelerden geçer. İncelmiş sacın kalınlığı sensörle ölçülür. Ölçüm sayısallaştırılıp referansla karşılaştırılır. Kontrolcünün komutu DAC ve güç kuvvetlendirici üzerinden silindire geri döner.</desc>
          <defs>
            <linearGradient id="mill-bg" x2="0" y2="1"><stop stop-color="#173448"/><stop offset="1" stop-color="#102434"/></linearGradient>
            <linearGradient id="mill-steel" x2="1" y2=".2"><stop stop-color="#436074"/><stop offset=".45" stop-color="#a1b7c5"/><stop offset=".53" stop-color="#617f92"/><stop offset="1" stop-color="#354f64"/></linearGradient>
            <radialGradient id="mill-coil"><stop stop-color="#d1dde4"/><stop offset=".65" stop-color="#aabac5"/><stop offset="1" stop-color="#658295"/></radialGradient>
            <linearGradient id="mill-roller" x2=".5" y2="1"><stop stop-color="#d4e4e9"/><stop offset=".4" stop-color="#91aabb"/><stop offset="1" stop-color="#476378"/></linearGradient>
            <linearGradient id="mill-sheet" x2="0" y2="1"><stop stop-color="#f5c873"/><stop offset=".35" stop-color="#ffe9b2"/><stop offset="1" stop-color="#bd823e"/></linearGradient>
            <linearGradient id="mill-scan"><stop stop-color="#47f1c2" stop-opacity="0"/><stop offset=".5" stop-color="#47f1c2" stop-opacity=".3"/><stop offset="1" stop-color="#47f1c2" stop-opacity="0"/></linearGradient>
            <pattern id="mill-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#315163" stroke-width=".6" opacity=".3"/></pattern>
            <filter id="mill-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
            <marker id="mill-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#58cbae"/></marker>
          </defs>
          <rect width="1080" height="455" fill="url(#mill-bg)"/><rect x="20" y="65" width="1040" height="335" fill="url(#mill-grid)"/>
          <path d="M50 374H1026M99 374L29 411M262 374L227 411M812 374L849 411M983 374L1052 411" stroke="#375767" stroke-width="1" fill="none"/>
          <ellipse cx="484" cy="370" rx="140" ry="20" fill="#081923" opacity=".5"/>
          <path id="mill-wire-measure" class="mill-wire" d="M763 175H790V204H895V195" marker-end="url(#mill-arrow)"/>
          <path id="mill-wire-adc" class="mill-wire" d="M822 165H785V130H754" marker-end="url(#mill-arrow)"/>
          <path id="mill-wire-reference" class="mill-wire mill-reference-wire" d="M826 84H754" marker-end="url(#mill-arrow)"/>
          <path id="mill-wire-command" class="mill-wire" d="M610 106H571V76H145V100" marker-end="url(#mill-arrow)"/>
          <path id="mill-wire-dac" class="mill-wire" d="M210 131H250" marker-end="url(#mill-arrow)"/>
          <path id="mill-wire-power" class="mill-wire" d="M370 131H426V117H456" marker-end="url(#mill-arrow)"/>
          <g class="mill-scene-box" data-mill-scene-step="4" transform="translate(80 100)"><rect class="mill-cabinet" width="130" height="62" rx="7"/><text class="mill-cabinet-title" x="65" y="23" text-anchor="middle">DAC</text><text id="mill-scene-dac" class="mill-cabinet-value" x="65" y="47" text-anchor="middle">1,25 V</text></g>
          <g class="mill-scene-box" data-mill-scene-step="5" transform="translate(250 100)"><rect class="mill-cabinet" width="120" height="62" rx="7"/><text class="mill-cabinet-title" x="60" y="23" text-anchor="middle">Güç K</text><text id="mill-scene-power" class="mill-cabinet-value" x="60" y="47" text-anchor="middle">25 %</text></g>
          <g class="mill-scene-box" data-mill-scene-step="2 3" transform="translate(610 65)"><rect class="mill-cabinet" width="144" height="87" rx="7"/><text class="mill-cabinet-title" x="72" y="22" text-anchor="middle">Kontrolcü / PLC</text><rect x="11" y="31" width="122" height="24" rx="3" fill="#0d222c"/><text id="mill-scene-control" class="mill-cabinet-value" x="72" y="49" text-anchor="middle">Komut: 25 %</text><text id="mill-scene-error" class="mill-cabinet-note" x="72" y="74" text-anchor="middle">e: −0,65 mm</text></g>
          <text class="mill-input-sign" x="760" y="74">+</text><text class="mill-input-sign" x="760" y="120">−</text>
          <g class="mill-scene-box mill-reference-box" data-mill-scene-step="2" transform="translate(826 55)"><rect class="mill-cabinet" width="172" height="65" rx="7"/><text class="mill-cabinet-title" x="86" y="20" text-anchor="middle">Referans kalınlık</text><text id="mill-scene-reference" class="mill-cabinet-value" x="86" y="41" text-anchor="middle">1,60 mm</text><text id="mill-scene-reference-code" class="mill-cabinet-note" x="86" y="57" text-anchor="middle">Sayısal kod: 1638</text></g>
          <g class="mill-scene-box" data-mill-scene-step="1" transform="translate(822 135)"><rect class="mill-cabinet" width="145" height="60" rx="7"/><text class="mill-cabinet-title" x="72.5" y="22" text-anchor="middle">ADC</text><text id="mill-scene-code" class="mill-cabinet-value" x="72.5" y="46" text-anchor="middle">2,81 V → 2303</text></g>
          ${coil('mill-unwind',154)}${coil('mill-rewind',943)}
          <text x="154" y="392" class="mill-label" text-anchor="middle">Giriş sacı</text><text id="mill-incoming-label" x="154" y="415" class="mill-sub" text-anchor="middle">2,80 mm</text>
          <text x="943" y="392" class="mill-label" text-anchor="middle">İnceltilmiş sac</text><text id="mill-exit-label" x="943" y="415" class="mill-sub" text-anchor="middle">2,25 mm</text>
          <g id="mill-machine"><path d="M382 174V341H414V186H550V341H583V162H393Z" fill="#294a5f" stroke="#52768d" stroke-width="2"/><path d="M583 162L596 152V331L583 341Z" fill="#153246"/><path d="M382 162L395 152H596L583 162Z" fill="#5d7f91"/><rect x="369" y="336" width="230" height="22" rx="3" fill="#385a70"/><rect x="373" y="339" width="222" height="7" fill="#f3b44e"/><path d="M390 339L383 346M416 339L409 346M442 339L435 346M468 339L461 346M494 339L487 346M520 339L513 346M546 339L539 346M572 339L565 346" stroke="#29404e" stroke-width="7"/>
            <rect x="456" y="85" width="54" height="67" rx="5" fill="#d9953b" stroke="#f1c271" stroke-width="2"/><path d="M465 95H501M465 139H501" stroke="#945b23" stroke-width="3"/><rect id="mill-piston" x="477" y="148" width="12" height="44" fill="url(#mill-steel)" stroke="#b8cbd5"/><path d="M511 105H535V137H517" fill="none" stroke="#6f94aa" stroke-width="5"/>
          </g>
          <text x="382" y="63" class="mill-label">Hidrolik silindir</text>
          <g id="mill-strip"><path id="mill-strip-shape" fill="url(#mill-sheet)" stroke="#f9d792" stroke-width="1"/><path id="mill-strip-motion" d="M155 215H943" fill="none" stroke="#fff1cb" stroke-width="2" stroke-dasharray="12 30" opacity=".65"/></g>
          <g id="mill-upper-assembly"><rect x="425" y="180" width="116" height="12" rx="4" fill="#86a8ba"/>${roller('mill-top-left',448,187)}${roller('mill-top-right',518,187)}</g>
          ${roller('mill-bottom-left',448,265)}${roller('mill-bottom-right',518,265)}
          <circle cx="398" cy="323" r="4" fill="#8ea8b5"/><circle cx="567" cy="323" r="4" fill="#8ea8b5"/>
          <g id="mill-sensor"><path d="M712 166V286H758V166" fill="none" stroke="#376e74" stroke-width="9"/><rect x="706" y="165" width="57" height="20" rx="4" fill="#368c87" stroke="#81c8ba"/><rect x="706" y="267" width="57" height="20" rx="4" fill="#368c87" stroke="#81c8ba"/><rect x="713" y="185" width="42" height="82" fill="url(#mill-scan)"/><path id="mill-sensor-ray" d="M735 185V267" stroke="#8cffcf" stroke-width="2" stroke-dasharray="4 6"/><circle cx="751" cy="175" r="3" fill="#aff9ce"/></g>
          <text x="737" y="316" class="mill-label" text-anchor="middle">Ölçme devresi</text><text id="mill-sensor-label" x="737" y="338" class="mill-digital-text" text-anchor="middle">2,81 V</text>
          <path d="M616 194V248M611 194H621M611 248H621" stroke="#bbd3df" fill="none"/><text id="mill-gap-label" x="632" y="227" fill="#d8e9ef" font-size="16">2,25 mm</text>
          <g id="mill-scene-signals"><circle id="mill-measure-dot" r="4" fill="#71efc2"/><circle id="mill-adc-dot" r="4" fill="#71efc2"/><circle id="mill-reference-dot" r="4" fill="#f9c16d"/><circle id="mill-command-dot" r="4" fill="#f9c16d"/><circle id="mill-dac-dot" r="4" fill="#f9c16d"/><circle id="mill-power-dot" r="4" fill="#f9c16d"/></g>
        </svg>
        <div class="mill-caption"><span><strong id="mill-scene-action">Merdaneler sacı inceltiyor.</strong></span><span>Kalınlıklar görselde büyütülmüştür.</span></div>
      </div>
      <aside class="mill-panel" aria-label="Üretim hattı kumandası">
        <div class="mill-target"><label class="mill-reference" for="mill-target">Referans kalınlık</label><div class="mill-target-row"><output id="mill-target-value" for="mill-target">1,60 <small>mm</small></output><span class="mill-limit">1,2–2,4 mm</span></div><input id="mill-target" type="range" min="1.2" max="2.4" step="0.1" value="1.6" aria-label="Referans kalınlık, milimetre"></div>
        <div class="mill-readings"><div><span>Ölçülen kalınlık</span><output id="mill-measured">2,25 <small>mm</small></output></div><div><span>Hata · r − y</span><output id="mill-error">−0,65 <small>mm</small></output></div></div>
        <div class="mill-actions"><button type="button" id="mill-disturb" aria-pressed="false">↗ Kalın sac gönder</button>
        <button type="button" id="mill-auto" aria-pressed="true">Otomatik kontrol açık</button></div>
        <div class="mill-pressure"><label for="mill-pressure">Hidrolik basınç komutu <output id="mill-pressure-value">25 %</output></label><input id="mill-pressure" type="range" min="0" max="100" step="1" value="25" disabled><span id="mill-mode-note" class="mill-limit">Elle ayarlamak için otomatik kontrolü kapat.</span></div>
        <figure class="mill-chart"><figcaption><span>Ölçüm</span><span>Referans · son 20 sn</span></figcaption><svg viewBox="0 0 260 92" preserveAspectRatio="none" role="img" aria-label="Son 20 saniyede kalınlık ve referans"><path d="M25 12H256M25 42H256M25 72H256" stroke="#dbe3ee" stroke-width="1"/><text x="0" y="15">3,4</text><text x="0" y="45">2,0</text><text x="0" y="75">0,6</text><path id="mill-chart-band" fill="#138265" opacity=".09"/><path id="mill-chart-ref" fill="none" stroke="#b3732f" stroke-width="1.5" stroke-dasharray="5 4"/><path id="mill-chart-line" fill="none" stroke="#2950db" stroke-width="2.2" stroke-linejoin="round"/><text x="25" y="88">−20 s</text><text x="229" y="88">şimdi</text></svg></figure>
      </aside>
    </div>
    <div class="mill-pipeline" aria-label="Ölçümden hidrolik silindire kontrol zinciri">
      ${block(0,'01 · Ölçme','2,81 V','Kalınlık → gerilim')}${block(1,'02 · ADC','2303','Analog → sayısal')}
      <div class="mill-digital">${block(2,'03 · Karşılaştırma','e = r − y','Referans + / ölçüm −')}${block(3,'04 · Kontrolcü','25 %','Hata → kontrol komutu')}</div>
      ${block(4,'05 · DAC','1,25 V','Sayısal → analog')}${block(5,'06 · Güç K','25 %','Komut → güç')}${block(6,'07 · Hidrolik','Aralık azalır','Merdane aralığı → sac')}
    </div>
    <div class="mill-explain"><span id="mill-step" class="mill-step">01 / 07 · Ölçme</span><p id="mill-explanation">Sensör, çıkış kalınlığını ölçer. Ölçme devresi bu büyüklüğü elektriksel işarete dönüştürür.</p></div>`;
  const $=id=>root.querySelector('#'+id), clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
  const fmt=(n,d=2)=>n.toLocaleString('tr-TR',{minimumFractionDigits:d,maximumFractionDigits:d});
  const state={time:0,target:1.6,incoming:2.8,pressure:25,command:25,integral:45,exit:2.25,measured:2.25,adc:2303,auto:true,thick:false,history:[],samples:[],phase:-1,ui:0,turn:0};
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const steps=['Ölçme','ADC','Karşılaştırma','Kontrolcü','DAC','Güç kuvvetlendirici','Hidrolik silindir'];
  const copies=[
    'Sensör, çıkış kalınlığını ölçer. Ölçme devresi bu büyüklüğü elektriksel işarete dönüştürür.',
    'ADC, ölçüm gerilimini sayısal koda çevirir. Bu örnekte 0–4 mm aralığı, 12 bit ile 0–4095 kodlanır.',
    'Sayısal işlemci referanstan ölçümü çıkarır. Sac fazla kalınsa hata negatiftir: e = r − y < 0.',
    'Kontrolcü, sac kalınken basınç komutunu artırır. Amaç hatayı küçülterek kalınlığı hedefte tutmaktır.',
    'DAC, sayısal kontrol komutunu analog gerilime dönüştürür. Burada komut aralığı 0–5 V ile gösterilir.',
    'Güç kuvvetlendirici, düşük güçlü kontrol işaretinin hidrolik sürücüyü kumanda etmesini sağlar.',
    'Silindir merdane aralığını ayarlar; sacın kalınlığı değişir. Yeni sonuç sensöre ulaşır ve çevrim sürer.'
  ];
  const wavePath=(points,key)=>points.map((p,i)=>`${i?'L':'M'}${(25+(p.time-state.time+20)/20*231).toFixed(1)} ${(72-(p[key]-.6)/2.8*60).toFixed(1)}`).join(' ');
  function error(){return (Math.round(state.target/4*4095)-state.adc)*4/4095;}
  function drawChart(){
    const list=state.history;if(!list.length)return;
    $('mill-chart-line').setAttribute('d',wavePath(list,'measured'));
    $('mill-chart-ref').setAttribute('d',wavePath(list,'target'));
    const y=72-(state.target-.6)/2.8*60;
    $('mill-chart-band').setAttribute('d',`M25 ${y-1}H256V${y+1}H25Z`);
  }
  function drawValues(){
    const e=error(), good=Math.abs(e)<=.04;
    const roundedError=(Math.round(state.target*100)-Math.round(state.measured*100))/100;
    $('mill-target-value').innerHTML=`${fmt(state.target)} <small>mm</small>`;
    $('mill-measured').innerHTML=`${fmt(state.measured)} <small>mm</small>`;
    $('mill-error').innerHTML=`${roundedError>0?'+':''}${fmt(roundedError).replace('-','−')} <small>mm</small>`;
    $('mill-pressure-value').textContent=`${fmt(state.command,0)} %`;
    if(state.auto)$('mill-pressure').value=state.command;
    $('mill-badge').textContent=good?'HEDEFTE · ±0,04 mm':state.auto?'Hedefe yaklaşıyor':'Elle kontrol sende';
    $('mill-badge').dataset.good=String(good);
    $('mill-incoming-label').textContent=fmt(state.incoming)+' mm';
    $('mill-exit-label').textContent=fmt(state.exit)+' mm';
    $('mill-gap-label').textContent=fmt(state.exit)+' mm';
    $('mill-sensor-label').textContent=fmt(state.measured/4*5)+' V';
    $('mill-scene-code').textContent=fmt(state.measured/4*5)+' V → '+state.adc;
    $('mill-scene-reference').textContent=fmt(state.target)+' mm';
    $('mill-scene-reference-code').textContent='Sayısal kod: '+Math.round(state.target/4*4095);
    $('mill-scene-control').textContent='Komut: '+fmt(state.command,0)+' %';
    $('mill-scene-error').textContent='e: '+fmt(roundedError).replace('-','−')+' mm';
    $('mill-scene-dac').textContent=fmt(state.command/100*5)+' V';
    $('mill-scene-power').textContent=fmt(state.pressure,0)+' %';
    $('mill-block-0').textContent=fmt(state.measured/4*5)+' V';
    $('mill-block-1').textContent=String(state.adc).padStart(4,'0');
    $('mill-block-1').nextElementSibling.textContent=state.adc.toString(2).padStart(12,'0').replace(/(.{4})(?=.)/g,'$1 ');
    $('mill-block-2').textContent=`${roundedError>0?'+':''}${fmt(roundedError).replace('-','−')} mm`;
    $('mill-block-3').textContent=fmt(state.command,0)+' %';
    $('mill-block-4').textContent=fmt(state.command/100*5)+' V';
    $('mill-block-5').textContent=fmt(state.pressure,0)+' %';
    const delta=state.command-state.pressure;
    $('mill-block-6').textContent=Math.abs(delta)<1?'Aralık korunur':delta>0?'Aralık küçülür':'Aralık büyür';
    $('mill-scene-action').textContent=good?'Kalınlık hedefte. Kontrol çevrimi çalışmayı sürdürüyor.':delta>1?'Basınç artıyor → merdane aralığı küçülüyor.':delta<-1?'Basınç azalıyor → merdane aralığı büyüyor.':'Merdaneler sacı inceltiyor.';
    root.dataset.measured=state.measured.toFixed(4);root.dataset.error=e.toFixed(4);root.dataset.pressure=state.pressure.toFixed(3);root.dataset.command=state.command.toFixed(3);root.dataset.auto=String(state.auto);root.dataset.time=state.time.toFixed(2);
    drawChart();
  }
  function drawScene(){
    const halfIn=state.incoming*4,halfOut=state.exit*4;
    /* Constant bottom roll: the upper carriage follows the exaggerated strip thickness. */
    const bottom=230,top=bottom-2*halfOut,offset=top-35-187;
    const upper=$('mill-upper-assembly');upper.setAttribute('transform',`translate(0 ${offset.toFixed(2)})`);
    $('mill-piston').setAttribute('height',Math.max(5,44+offset));
    $('mill-strip-shape').setAttribute('d',`M154 ${bottom-2*halfIn}H408L483 ${top}H943V${bottom}H154Z`);
    $('mill-strip-motion').setAttribute('d',`M154 ${bottom-halfIn}H408L483 ${bottom-halfOut}H943`);
    if(!reduced.matches){
      const turn=state.turn;
      $('mill-strip-motion').setAttribute('stroke-dashoffset',(-state.time*75).toFixed(1));
      $('mill-unwind').setAttribute('transform',`rotate(${turn/2})`);$('mill-rewind').setAttribute('transform',`rotate(${turn/2})`);
      for(const id of ['mill-top-left','mill-top-right'])$(id).querySelector('.mill-roll-spin').setAttribute('transform',`rotate(${-turn})`);
      for(const id of ['mill-bottom-left','mill-bottom-right'])$(id).querySelector('.mill-roll-spin').setAttribute('transform',`rotate(${turn})`);
      $('mill-sensor-ray').setAttribute('stroke-dashoffset',-state.time*25);
      for(const [dot,path,offset]of [['mill-measure-dot','mill-wire-measure',0],['mill-adc-dot','mill-wire-adc',.25],['mill-reference-dot','mill-wire-reference',.25],['mill-command-dot','mill-wire-command',.5],['mill-dac-dot','mill-wire-dac',.7],['mill-power-dot','mill-wire-power',.85]]){
        const wire=$(path),p=wire.getPointAtLength(((state.time/2+offset)%1)*wire.getTotalLength());$(dot).setAttribute('cx',p.x);$(dot).setAttribute('cy',p.y);
      }
    }
    $('mill-scene-signals').style.opacity=reduced.matches?'0':'1';
  }
  function tick(ms){
    const dt=Math.min(ms/1000,.1);if(dt<=0)return;
    state.time+=dt;state.turn=(state.turn+dt*95)%720;
    const e=error();
    if(state.auto){
      // Negative thickness error requires more force, hence the minus sign.
      const next=state.integral-9*e*dt, raw=next-25*e;
      if((raw>=0&&raw<=100)||(raw>100&&e>0)||(raw<0&&e<0))state.integral=clamp(next,0,100);
      state.command=clamp(state.integral-25*e,0,100);
    }
    state.pressure+=(state.command-state.pressure)*(1-Math.exp(-dt/1.05));
    const desired=clamp(state.incoming-.022*state.pressure,.65,state.incoming);
    state.exit+=(desired-state.exit)*(1-Math.exp(-dt/.3));
    state.samples.push({time:state.time,value:state.exit});
    // Material takes 0.7 seconds to travel from the rolls to the measuring station.
    while(state.samples.length>1&&state.samples[1].time<=state.time-.7)state.samples.shift();
    state.adc=clamp(Math.round(state.samples[0].value/4*4095),0,4095);state.measured=state.adc*4/4095;
    state.ui+=dt;
    const phase=Math.floor(state.time/3.2)%7;
    if(phase!==state.phase){state.phase=phase;root.querySelectorAll('.mill-block').forEach(b=>b.classList.toggle('active',Number(b.dataset.step)===phase));root.querySelectorAll('[data-mill-scene-step]').forEach(b=>b.classList.toggle('active',b.dataset.millSceneStep.split(' ').includes(String(phase))));$('mill-step').textContent=`0${phase+1} / 07 · ${steps[phase]}`;$('mill-explanation').textContent=copies[phase];}
    if(state.ui>=.08){state.ui=0;state.history.push({time:state.time,measured:state.measured,target:state.target});while(state.history.length&&state.history[0].time<state.time-20)state.history.shift();drawValues();}
    drawScene();
  }
  $('mill-target').addEventListener('input',e=>{state.target=Number(e.target.value);drawValues();});
  $('mill-disturb').addEventListener('click',()=>{state.thick=!state.thick;state.incoming=state.thick?3.25:2.8;$('mill-disturb').textContent=state.thick?'↘ Normal sac gönder':'↗ Kalın sac gönder';$('mill-disturb').setAttribute('aria-pressed',String(state.thick));drawValues();drawScene();});
  $('mill-auto').addEventListener('click',()=>{state.auto=!state.auto;if(state.auto)state.integral=clamp(state.command+25*error(),0,100);$('mill-auto').setAttribute('aria-pressed',String(state.auto));$('mill-auto').textContent=state.auto?'Otomatik kontrol açık':'Elle kontrol · otomatiğe dön';$('mill-pressure').disabled=state.auto;$('mill-pressure').value=state.command;$('mill-mode-note').textContent=state.auto?'Elle ayarlamak için otomatik kontrolü kapat.':'Basıncı artır → sac incelir. Azalt → kalınlaşır.';drawValues();});
  $('mill-pressure').addEventListener('input',e=>{if(!state.auto){state.command=Number(e.target.value);drawValues();}});
  drawValues();drawScene();
  return {tick,refresh:()=>{drawValues();drawScene();}};
};
