/* Functional analog-control teaching model. The drawn PI uses an inverting
   series-RC feedback stage followed by a unity inverter. Supply pins and
   output/integrator limiting circuitry are omitted from this overview. */
window.createAnalogOven=function(root){
  'use strict';
  const resistor=(x1,x2,y)=>`<path class="oven-circuit" d="M${x1} ${y} ${Array.from({length:7},(_,i)=>`L${x1+(x2-x1)*(i+1)/8} ${y+(i%2?4:-4)}`).join(' ')}L${x2} ${y}"/>`;
  const ground=(x,y)=>`<path class="oven-circuit" d="M${x} ${y}v7m-9 0h18m-15 5h12m-9 5h6"/>`;
  const card=(n,name,value,note)=>`<div class="mill-block" data-step="${n}"><span class="mill-block-name">${name}</span><output id="oven-block-${n}">${value}</output><small>${note}</small></div>`;
  root.innerHTML=`
  <figure class="lesson-source-figure"><figcaption><span>Ders notundaki şekil · Analog sıcaklık kontrolü</span><a href="assets/analog-firin-sema.png" target="_blank" rel="noopener">Görseli büyüt ↗</a></figcaption><img src="assets/analog-firin-sema.png" width="1390" height="586" alt="Analog fırın sıcaklık kontrolü: referans ve geri besleme karşılaştırılır, analog işlemci ve güç kuvvetlendirici fırını sürer; sıcaklık algılayıcısı sinyal düzenleyici üzerinden geri beslenir."></figure>
  <div class="mill-main oven-main">
    <div class="mill-scene oven-scene">
      <div class="mill-scene-head"><span class="mill-live"><i></i> ANALOG KONTROL / SÜREKLİ GERİLİMLER</span><span id="oven-badge" class="mill-badge">Fırın ısınıyor</span></div>
      <svg id="oven-svg" viewBox="0 0 1200 520" role="img" aria-labelledby="oven-title oven-desc">
        <title id="oven-title">Op-amp ile analog fırın kontrolü</title><desc id="oven-desc">Potansiyometreyle belirlenen referans gerilimi, düzenlenmiş sıcaklık gerilimiyle karşılaştırılır. İki op-amp içeren PI işlemci güç katını sürer. Fırın sıcaklık algılayıcısı, yükseltici ve RC alçak geçiren filtre üzerinden eksi girişe bağlanır. Elektronik işaretler analog gerilimlerdir.</desc>
        <defs>
          <linearGradient id="oven-background" x2="0" y2="1"><stop stop-color="#193547"/><stop offset="1" stop-color="#102434"/></linearGradient>
          <linearGradient id="oven-steel" x2="1" y2=".2"><stop stop-color="#8fa9b7"/><stop offset=".35" stop-color="#d7e2e6"/><stop offset=".42" stop-color="#7a95a4"/><stop offset="1" stop-color="#3c5d72"/></linearGradient>
          <radialGradient id="oven-heat"><stop stop-color="#ffb44b"/><stop offset=".6" stop-color="#e36626"/><stop offset="1" stop-color="#6b2b26"/></radialGradient>
          <pattern id="oven-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#36576a" stroke-width=".6" opacity=".25"/></pattern>
          <marker id="oven-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#72d8c0"/></marker>
        </defs>
        <rect width="1200" height="520" fill="url(#oven-background)"/><rect x="20" y="50" width="1160" height="435" fill="url(#oven-grid)"/>
        <g class="oven-wires">
          <path id="oven-wire-reference" class="mill-wire" d="M157 190H187" marker-end="url(#oven-arrow)"/>
          <path id="oven-wire-error" class="mill-wire" d="M233 190H267V180H280" marker-end="url(#oven-arrow)"/>
          <path id="oven-wire-command" class="mill-wire" d="M640 190H672" marker-end="url(#oven-arrow)"/>
          <path id="oven-wire-power" class="mill-wire" d="M812 190H862" marker-end="url(#oven-arrow)"/>
          <path id="oven-wire-sensor" class="mill-wire" d="M1090 250H1155V399H810" marker-end="url(#oven-arrow)"/>
          <path id="oven-wire-return" class="mill-wire" d="M365 412H210V213" marker-end="url(#oven-arrow)"/>
        </g>
        <g class="mill-scene-box mill-reference-box" data-oven-step="0" transform="translate(25 148)"><rect class="mill-cabinet" width="132" height="85" rx="7"/><text class="mill-cabinet-title" x="66" y="23" text-anchor="middle">Referans</text><text id="oven-ref-voltage" class="mill-cabinet-value" x="66" y="47" text-anchor="middle">3,00 V</text><text id="oven-ref-temp" class="mill-cabinet-note" x="66" y="69" text-anchor="middle">180 °C</text></g>
        <text x="91" y="132" text-anchor="middle" class="mill-sub">Potansiyometre</text>
        <g class="oven-comparison" data-oven-step="1"><circle cx="210" cy="190" r="23" fill="#193e50" stroke="#8cb3c5" stroke-width="2"/><text x="177" y="173" class="mill-input-sign">+</text><text x="188" y="230" class="mill-input-sign">−</text><text x="254" y="166" class="mill-sub" text-anchor="middle">e(t)</text><text id="oven-error-voltage" x="252" y="254" class="mill-digital-text" text-anchor="middle">1,83 V</text></g>
        <g class="mill-scene-box oven-processor" data-oven-step="2">
          <rect class="mill-cabinet" x="280" y="65" width="360" height="225" rx="8"/>
          <text x="460" y="89" text-anchor="middle" class="oven-section-title">Analog işlemci · PI kontrolcü</text>
          <path class="oven-circuit" d="M280 180H311M337 180H360M420 190H430V180H449M477 180H500M556 190H640"/>
          ${resistor(311,337,180)}${resistor(449,477,180)}
          <path class="oven-opamp" d="M360 160L420 190L360 220Z"/><text class="oven-pin" x="365" y="184">−</text><text class="oven-pin" x="365" y="208">+</text><text class="oven-amp-name" x="387" y="195">U₁</text>
          <path class="oven-circuit" d="M430 190V130H416M408 130H393M357 130H345V180M416 120V140M408 120V140M360 204H345V219"/>
          ${resistor(393,357,130)}${ground(345,219)}
          <circle class="oven-junction" cx="345" cy="180" r="3"/><circle class="oven-junction" cx="430" cy="190" r="3"/>
          <text class="oven-part" x="323" y="165" text-anchor="middle">Rᵢ</text><text class="oven-part" x="374" y="115" text-anchor="middle">Rₚ</text><text class="oven-part" x="413" y="113" text-anchor="middle">Cᵢ</text>
          <path class="oven-opamp" d="M500 160L556 190L500 220Z"/><text class="oven-pin" x="505" y="184">−</text><text class="oven-pin" x="505" y="208">+</text><text class="oven-amp-name" x="526" y="195">U₂</text>
          <path class="oven-circuit" d="M568 190V145H538M510 145H489V180H500M500 204H487V219"/>${resistor(538,510,145)}${ground(487,219)}
          <circle class="oven-junction" cx="568" cy="190" r="3"/><circle class="oven-junction" cx="489" cy="180" r="3"/>
          <text class="oven-part" x="463" y="165" text-anchor="middle">R</text><text class="oven-part" x="524" y="129" text-anchor="middle">R</text>
          <text x="388" y="254" text-anchor="middle" class="mill-sub">PI katı (tersleyen)</text><text x="537" y="254" text-anchor="middle" class="mill-sub">İşaret düzeltme</text>
          <text id="oven-control-voltage" x="460" y="277" text-anchor="middle" class="mill-digital-text">u(t) = 5,00 V</text>
        </g>
        <g class="mill-scene-box" data-oven-step="3" transform="translate(672 145)"><rect class="mill-cabinet" width="140" height="108" rx="7"/><text class="mill-cabinet-title" x="70" y="26" text-anchor="middle">Güç<tspan x="70" dy="21">kuvvetlendirici</tspan></text><text id="oven-power-value" class="oven-power" x="70" y="85" text-anchor="middle">100 %</text></g>
        <text x="947" y="71" text-anchor="middle" class="oven-section-title">Elektrikli fırın</text>
        <g data-oven-step="4" class="oven-body">
          <ellipse cx="973" cy="405" rx="125" ry="13" fill="#091b26" opacity=".7"/>
          <path d="M862 91H1056L1080 107V390L1056 378H862Z" fill="url(#oven-steel)" stroke="#92aab8" stroke-width="2"/><path d="M1056 91L1080 107V390L1056 378Z" fill="#36566a"/>
          <rect x="878" y="125" width="164" height="218" rx="6" fill="#1c222b" stroke="#38586d" stroke-width="4"/><rect id="oven-glow" x="882" y="129" width="156" height="210" rx="4" fill="url(#oven-heat)" opacity=".5"/>
          <path d="M890 167H1030M890 210H1030M890 253H1030" stroke="#91a4ad" stroke-width="4"/>
          <path id="oven-coil" d="M893 290H1027V300H893V310H1027V320H893" fill="none" stroke="#fda55d" stroke-width="4" stroke-linejoin="round"/>
          <g id="oven-convection" fill="none" stroke="#ffc989" stroke-width="2" stroke-dasharray="9 18" opacity=".5"><path d="M917 277Q897 245 917 215T917 148"/><path d="M957 277Q937 245 957 215T957 148"/><path d="M997 277Q977 245 997 215T997 148"/></g>
          <g id="oven-door" transform="translate(878 125)"><rect x="0" y="0" width="164" height="218" rx="5" fill="#b9e9ff" fill-opacity=".08" stroke="#adc5d0" stroke-width="4"/><path d="M10 15L44 202M23 15L57 202" stroke="#e4f6ff" stroke-opacity=".15" stroke-width="8"/><rect x="143" y="75" width="8" height="70" rx="4" fill="#dbe7ee" stroke="#6c8492"/></g>
          <rect x="899" y="103" width="102" height="17" rx="3" fill="#122b3a"/><text id="oven-temperature-label" x="950" y="117" text-anchor="middle" class="oven-display">70,0 °C</text>
          <rect x="881" y="350" width="145" height="15" rx="3" fill="#254254"/><path d="M892 354H1015M892 359H1015" stroke="#7d9fae" stroke-width="2"/>
          <path d="M878 378V403M1041 378V403" stroke="#7694a5" stroke-width="9"/>
        </g>
        <g data-oven-step="5"><path d="M1034 251H1067" stroke="#c8d9e2" stroke-width="4"/><rect x="1067" y="221" width="24" height="58" rx="5" fill="#236f75" stroke="#83d7c0" stroke-width="2"/><circle cx="1079" cy="237" r="4" fill="#9cf4d2"/><text x="1110" y="300" text-anchor="middle" class="mill-sub">Sıcaklık algılayıcısı</text><text id="oven-sensor-voltage" x="1110" y="321" text-anchor="middle" class="mill-digital-text">70,0 mV</text></g>
        <g class="mill-scene-box" data-oven-step="6">
          <rect class="mill-cabinet" x="365" y="315" width="445" height="176" rx="8"/>
          <text x="587" y="340" text-anchor="middle" class="oven-section-title">Sinyal düzenleyici devre</text>
          <text x="490" y="364" text-anchor="middle" class="mill-sub" id="oven-filter-label">RC alçak geçiren filtre</text><text x="710" y="364" text-anchor="middle" class="mill-sub">Yükseltme / ölçekleme</text>
          <path class="oven-circuit" d="M810 399H748M695 412H638M603 412H365"/>
          <path class="oven-opamp" d="M748 382L695 412L748 442Z"/><text class="oven-pin" x="732" y="403">+</text><text class="oven-pin" x="732" y="430">−</text><text class="oven-amp-name" x="714" y="417">U₃</text>
          <path class="oven-circuit" d="M748 426H770V468H752M720 468H686V412M770 426H790V433"/>${resistor(752,720,468)}
          <path class="oven-circuit" d="M790 433l-4 3 8 3-8 3 8 3-4 3v6"/>${ground(790,454)}
          <circle class="oven-junction" cx="770" cy="426" r="3"/><circle class="oven-junction" cx="686" cy="412" r="3"/>
          <text class="oven-part" x="736" y="485" text-anchor="middle">470 kΩ</text><text class="oven-part" x="768" y="449" text-anchor="end">30 kΩ</text>
          <g id="oven-rc-parts">${resistor(638,603,412)}<circle class="oven-junction" cx="556" cy="412" r="3"/><path class="oven-circuit" d="M556 412V440M545 440H567M545 447H567M556 447V461"/>${ground(556,461)}<text class="oven-part" x="620" y="395" text-anchor="middle">10 kΩ</text><text class="oven-part" x="575" y="455">47 µF</text></g>
          <path id="oven-rc-bypass" d="M646 412V380H529V412" fill="none" stroke="#ffc777" stroke-width="2" stroke-dasharray="6 4" visibility="hidden"/>
          <text id="oven-measure-voltage" x="450" y="398" text-anchor="middle" class="mill-digital-text">yₘ = 1,17 V</text>
          <text x="459" y="466" text-anchor="middle" class="oven-part">τ = RC = 0,47 s</text>
        </g>
        <text x="211" y="448" text-anchor="middle" class="mill-sub">Negatif geri besleme</text>
        <g id="oven-signal-dots">${['reference','error','command','power','sensor','return'].map((key,i)=>`<circle id="oven-dot-${key}" r="4" fill="${i<4?'#ffcc87':'#83edd1'}"/>`).join('')}</g>
      </svg>
      <div class="mill-caption"><span><strong id="oven-scene-action">Kontrolcü, ısıtıcı gücünü ayarlıyor.</strong></span><span>Örnek işlevsel devre · ısıl tepki hızlandırılmıştır.</span></div>
    </div>
    <aside class="mill-panel" aria-label="Analog fırın kontrolü kumandası">
      <div class="mill-target"><label class="mill-reference" for="oven-target">Referans sıcaklık</label><div class="mill-target-row"><output id="oven-target-value">180 <small>°C</small></output><span class="mill-limit">80–230 °C</span></div><input id="oven-target" type="range" min="80" max="230" step="5" value="180" aria-label="Referans sıcaklık, santigrat"></div>
      <div class="mill-readings"><div><span>Fırın sıcaklığı</span><output id="oven-actual">70,0 <small>°C</small></output></div><div><span>Hata gerilimi</span><output id="oven-error">+1,83 <small>V</small></output></div></div>
      <div class="mill-actions"><button id="oven-door-button" type="button" aria-pressed="false">Kapağı aç</button><button id="oven-noise-button" type="button" aria-pressed="false">Gürültü ekle</button></div>
      <button id="oven-filter-button" type="button" aria-pressed="true">RC filtre açık</button>
      <div class="mill-pressure"><label for="oven-gain">Direnç ayarı · Kₚ <output id="oven-gain-value">2,4</output></label><input id="oven-gain" type="range" min="1" max="5" step="0.1" value="2.4"><span id="oven-resistor-value" class="mill-limit">Rₚ = 240 kΩ · Rᵢ = 100 kΩ</span></div>
      <figure class="mill-chart"><figcaption><span>Fırın</span><span>Referans · son 30 sn</span></figcaption><svg viewBox="0 0 260 92" preserveAspectRatio="none" role="img" aria-label="Fırın sıcaklığı ve referansın zamana göre değişimi"><path d="M25 12H256M25 42H256M25 72H256" stroke="#dbe3ee"/><text x="0" y="15">300</text><text x="0" y="45">150</text><text x="0" y="75">0</text><path id="oven-chart-ref" fill="none" stroke="#b3732f" stroke-width="1.5" stroke-dasharray="5 4"/><path id="oven-chart-line" fill="none" stroke="#2950db" stroke-width="2.2"/><text x="25" y="88">−30 s</text><text x="229" y="88">şimdi</text></svg></figure>
    </aside>
  </div>
  <div class="mill-pipeline oven-pipeline" aria-label="Analog sıcaklık kontrol zinciri">
    ${card(0,'01 · Referans','3,00 V','Potansiyometre')}${card(1,'02 · Karşılaştırma','1,83 V','e = r − yₘ')}${card(2,'03 · Analog PI','5,00 V','Op-amp + R + C')}${card(3,'04 · Güç katı','100 %','Isıtıcıyı sürer')}${card(4,'05 · Fırın','70,0 °C','Isıl sistem')}${card(5,'06 · Algılayıcı','70,0 mV','Sıcaklık → gerilim')}${card(6,'07 · Düzenleme','1,17 V','Yükselt / ölçekle / filtrele')}
  </div>
  <div class="mill-explain"><span id="oven-step" class="mill-step">01 / 07 · Referans</span><p id="oven-explanation">Potansiyometre, istenen sıcaklığı temsil eden sürekli bir referans gerilimi üretir.</p></div>
  <div class="oven-notes">
    <section><h2>Op-amp’lar kontrol kuralını nasıl uygular?</h2><p>U₁’in geri beslemesindeki Rₚ ve Cᵢ, oransal ve integral etkiyi oluşturur. U₂ işareti yeniden çevirir; pozitif hata ısıtıcı komutunu artırır.</p><div class="oven-equation">u(t) = Kₚ e(t) + Kᵢ ∫ e(t) dt</div><p id="oven-component-note" class="oven-note-small">Kₚ = Rₚ/Rᵢ = 2,4 · Kᵢ = 1/(RᵢCᵢ) ≈ 0,37 s⁻¹</p><p class="oven-note-small">Cᵢ = 27 µF. Gösterim sadeleştirilmiştir: beslemeler ve çıkış sınırlama devreleri çizilmemiştir. Komut 0–5 V aralığındadır.</p></section>
    <section><h2>Sinyal düzenleyici neler yapar?</h2><p>U₃, algılayıcı gerilimini referansla aynı ölçeğe yükseltir. RC filtre hızlı gürültüyü azaltır; işarete gecikme de ekler.</p><div class="oven-scope-legend"><span>Filtre öncesi</span><span id="oven-scope-filter-name">RC çıkışı</span><small>Son 4 sn · gerilim</small></div><svg class="oven-scope" viewBox="0 0 500 105" preserveAspectRatio="none" role="img" aria-label="RC filtresinden önceki ve sonraki analog gerilimler"><path d="M49 12H495M49 47H495M49 82H495" stroke="#dbe3ee"/><text id="oven-scope-high" x="0" y="16">1,30 V</text><text id="oven-scope-low" x="0" y="85">1,00 V</text><path id="oven-scope-raw" fill="none" stroke="#b56c22" stroke-width="1.5"/><path id="oven-scope-filtered" fill="none" stroke="#087974" stroke-width="2"/><text x="49" y="101">−4 s</text><text x="458" y="101">şimdi</text></svg><p class="oven-note-small">Örnek ölçek: 0–300 °C → 0–300 mV → 0–5 V. Filtre: 10 kΩ ve 47 µF; kesim frekansı ≈ 0,34 Hz. Gerçek algılayıcıya göre ofset düzeltme ve doğrusallaştırma da gerekebilir.</p></section>
  </div>
  <p class="oven-design-source">Ek devre açıklamaları: <a href="https://www.ti.com/tool/CIRCUIT060027" target="_blank" rel="noopener">TI · Op-amp integratörü</a> · <a href="https://www.ti.com/lit/pdf/tidu583" target="_blank" rel="noopener">TI · Sinyal düzenleme ilkeleri</a>. Devre seçimi ve sayısal değerler bu ders için oluşturulmuş örnektir.</p>`;
  const $=id=>root.querySelector('#'+id),clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const fmt=(n,d=2)=>n.toLocaleString('tr-TR',{minimumFractionDigits:d,maximumFractionDigits:d});
  const state={time:0,target:180,temp:70,sensed:70,raw:.07,amplified:70/60,filtered:70/60,measured:70/60,kp:2.4,integral:1.4,command:5,power:4,door:false,doorPosition:0,noise:false,filter:true,ui:0,phase:-1,history:[],scope:[]};
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),ki=1/2.7;
  const names=['Referans','Karşılaştırma','Analog işlemci','Güç kuvvetlendirici','Fırın','Sıcaklık algılayıcısı','Sinyal düzenleyici'];
  const copy=[
    'Potansiyometre, istenen sıcaklığı temsil eden sürekli bir referans gerilimi üretir.',
    'Aynı ölçekteki gerilimler karşılaştırılır: e(t) = r(t) − yₘ(t). Pozitif hata, daha fazla ısı gerektiğini gösterir.',
    'U₁, direnç ve kondansatörle PI etkisini oluşturur. U₂ işareti düzeltir; çıkışta sürekli u(t) gerilimi vardır.',
    'Güç katı, küçük kontrol gerilimine göre ısıtıcıya aktarılan gücü ayarlar.',
    'Isıtma ve çevreye ısı kaybı sıcaklığı belirler. Kapak açılınca ısı kaybı artar.',
    'Algılayıcı, sıcaklığa bağlı analog gerilim üretir. Burada 1 mV/°C ölçeği temsili olarak seçilmiştir.',
    'Yükseltici ölçüm ölçeğini ayarlar; RC filtre hızlı gürültüyü azaltır. Düzenlenmiş gerilim eksi girişe döner.'
  ];
  const error=()=>state.target/60-state.measured;
  function drawChart(){
    const path=key=>state.history.map((p,i)=>`${i?'L':'M'}${(25+(p.time-state.time+30)/30*231).toFixed(1)} ${(72-p[key]/5).toFixed(1)}`).join(' ');
    $('oven-chart-line').setAttribute('d',path('temp'));$('oven-chart-ref').setAttribute('d',path('target'));
    if(!state.scope.length)return;
    const values=state.scope.flatMap(p=>[p.raw,p.filtered]),min=Math.min(...values)-.025,max=Math.max(...values)+.025;
    const scopePath=key=>state.scope.map((p,i)=>`${i?'L':'M'}${(49+(p.time-state.time+4)/4*446).toFixed(1)} ${(82-(p[key]-min)/(max-min)*70).toFixed(1)}`).join(' ');
    $('oven-scope-raw').setAttribute('d',scopePath('raw'));$('oven-scope-filtered').setAttribute('d',scopePath('filtered'));
    $('oven-scope-high').textContent=fmt(max)+' V';$('oven-scope-low').textContent=fmt(min)+' V';
  }
  function drawValues(){
    const e=error(),good=Math.abs(state.temp-state.target)<=2;
    $('oven-target-value').innerHTML=fmt(state.target,0)+' <small>°C</small>';$('oven-actual').innerHTML=fmt(state.temp,1)+' <small>°C</small>';$('oven-error').innerHTML=(e>0?'+':'')+fmt(e).replace('-','−')+' <small>V</small>';
    $('oven-ref-voltage').textContent=fmt(state.target/60)+' V';$('oven-ref-temp').textContent=fmt(state.target,0)+' °C';$('oven-error-voltage').textContent=fmt(e).replace('-','−')+' V';
    $('oven-control-voltage').textContent='u(t) = '+fmt(state.command)+' V';$('oven-power-value').textContent=fmt(state.power*20,0)+' %';$('oven-temperature-label').textContent=fmt(state.temp,1)+' °C';$('oven-sensor-voltage').textContent=fmt(state.raw*1000,1)+' mV';$('oven-measure-voltage').textContent='yₘ = '+fmt(state.measured)+' V';
    $('oven-badge').textContent=good?'HEDEFTE · ±2 °C':state.command>=4.99?'Isıtıcı tam güçte':state.temp<state.target?'Fırın ısınıyor':'Sıcaklık düşüyor';$('oven-badge').dataset.good=String(good);
    $('oven-scene-action').textContent=state.door?'Kapak açık → ısı kaybı arttı.':good?'Hedefte: ısıtıcı, ısı kaybını karşılamayı sürdürüyor.':'Kontrolcü, ısıtıcı gücünü ayarlıyor.';
    $('oven-gain-value').textContent=fmt(state.kp,1);$('oven-resistor-value').textContent='Rₚ = '+fmt(state.kp*100,0)+' kΩ · Rᵢ = 100 kΩ';$('oven-component-note').textContent='Kₚ = Rₚ/Rᵢ = '+fmt(state.kp,1)+' · Kᵢ = 1/(RᵢCᵢ) ≈ 0,37 s⁻¹';
    [fmt(state.target/60)+' V',fmt(e).replace('-','−')+' V',fmt(state.command)+' V',fmt(state.power*20,0)+' %',fmt(state.temp,1)+' °C',fmt(state.raw*1000,1)+' mV',fmt(state.measured)+' V'].forEach((v,i)=>$('oven-block-'+i).textContent=v);
    root.dataset.time=state.time.toFixed(2);root.dataset.temperature=state.temp.toFixed(4);root.dataset.error=error().toFixed(4);root.dataset.command=state.command.toFixed(4);root.dataset.power=state.power.toFixed(4);root.dataset.measured=state.measured.toFixed(5);root.dataset.amplified=state.amplified.toFixed(5);root.dataset.filter=String(state.filter);root.dataset.noise=String(state.noise);root.dataset.kp=state.kp.toFixed(1);
    drawChart();
  }
  function drawScene(){
    $('oven-glow').setAttribute('opacity',(.13+clamp((state.temp-25)/230,0,1)*.76).toFixed(3));$('oven-coil').setAttribute('stroke',`hsl(${19+state.power*4} 95% ${35+state.power*8}%)`);
    $('oven-door').setAttribute('transform',`translate(878 125) scale(${1-state.doorPosition*.62} 1)`);
    $('oven-convection').setAttribute('stroke-dashoffset',reduced.matches?0:-state.time*(9+state.power*3));
    $('oven-rc-parts').style.opacity=state.filter?'1':'.22';$('oven-rc-bypass').setAttribute('visibility',state.filter?'hidden':'visible');
    $('oven-filter-label').textContent=state.filter?'RC alçak geçiren filtre':'RC filtre devre dışı';
    for(const [i,key]of ['reference','error','command','power','sensor','return'].entries()){const wire=$('oven-wire-'+key),p=wire.getPointAtLength(((state.time/2.4+i*.16)%1)*wire.getTotalLength());$('oven-dot-'+key).setAttribute('cx',p.x);$('oven-dot-'+key).setAttribute('cy',p.y);}
    $('oven-signal-dots').style.opacity=reduced.matches?'0':'1';
  }
  function tick(ms){
    const dt=Math.min(ms/1000,.1);if(dt<=0)return;state.time+=dt;
    const e=error(),next=state.integral+ki*e*dt,raw=state.kp*e+next;
    if((raw>=0&&raw<=5)||(raw>5&&e<0)||(raw<0&&e>0))state.integral=clamp(next,0,5);
    state.command=clamp(state.kp*e+state.integral,0,5);state.power+=(state.command-state.power)*(1-Math.exp(-dt/.25));
    state.temp+=(60*state.power-(state.door?1.4:1)*(state.temp-25))/12*dt;
    state.sensed+=(state.temp-state.sensed)*(1-Math.exp(-dt/.2));
    const noise=state.noise?.004*Math.sin(state.time*Math.PI*4)+.0015*Math.sin(state.time*Math.PI*8.6):0;
    state.raw=state.sensed*.001+noise;state.amplified=state.raw*50/3;state.filtered+=(state.amplified-state.filtered)*(1-Math.exp(-dt/.47));state.measured=state.filter?state.filtered:state.amplified;
    state.doorPosition+=((state.door?1:0)-state.doorPosition)*(1-Math.exp(-dt/.3));
    const phase=Math.floor(state.time/3.3)%7;if(phase!==state.phase){state.phase=phase;root.querySelectorAll('.mill-block').forEach(b=>b.classList.toggle('active',Number(b.dataset.step)===phase));root.querySelectorAll('[data-oven-step]').forEach(b=>b.classList.toggle('active',Number(b.dataset.ovenStep)===phase));$('oven-step').textContent=`0${phase+1} / 07 · ${names[phase]}`;$('oven-explanation').textContent=copy[phase];}
    state.ui+=dt;if(state.ui>=.08){state.ui=0;state.history.push({time:state.time,temp:state.temp,target:state.target});while(state.history.length&&state.history[0].time<state.time-30)state.history.shift();state.scope.push({time:state.time,raw:state.amplified,filtered:state.measured});while(state.scope.length&&state.scope[0].time<state.time-4)state.scope.shift();drawValues();}drawScene();
  }
  $('oven-target').addEventListener('input',e=>{state.target=Number(e.target.value);drawValues();});
  $('oven-gain').addEventListener('input',e=>{state.kp=Number(e.target.value);drawValues();});
  $('oven-door-button').addEventListener('click',()=>{state.door=!state.door;$('oven-door-button').textContent=state.door?'Kapağı kapat':'Kapağı aç';$('oven-door-button').setAttribute('aria-pressed',String(state.door));drawValues();});
  $('oven-noise-button').addEventListener('click',()=>{state.noise=!state.noise;$('oven-noise-button').textContent=state.noise?'Gürültüyü kaldır':'Gürültü ekle';$('oven-noise-button').setAttribute('aria-pressed',String(state.noise));});
  $('oven-filter-button').addEventListener('click',()=>{state.filter=!state.filter;state.measured=state.filter?state.filtered:state.amplified;$('oven-filter-button').textContent=state.filter?'RC filtre açık':'RC filtre devre dışı';$('oven-filter-button').setAttribute('aria-pressed',String(state.filter));$('oven-scope-filter-name').textContent=state.filter?'RC çıkışı':'Geri besleme · filtresiz';drawValues();drawScene();});
  drawValues();drawScene();return {tick,refresh:()=>{drawValues();drawScene();}};
};
