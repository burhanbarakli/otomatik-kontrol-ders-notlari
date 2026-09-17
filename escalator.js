/* Load-disturbance teaching model, referred to an equivalent output shaft.
   J*d(omega)/dt = motor torque - b*omega - passenger load; v = r*omega.
   Digital PI reads only measured speed, never the passenger state or mass. */
window.createEscalator=function(root){
  'use strict';
  root.innerHTML=`
  <div class="esc-definition"><span>BOZUCU ETKİ</span><p>Referansı değiştirmeden sistemin çıkışını etkileyen dış etki. Burada <strong>yolcunun binmesi ve inmesi, yük torkunu değiştirir.</strong></p></div>
  <div class="mill-main esc-main">
    <div class="mill-scene esc-scene">
      <div class="mill-scene-head"><span class="mill-live"><i></i> YUKARI ÇIKAN MERDİVEN</span><span id="esc-badge" class="mill-badge">Sabit hız</span></div>
      <svg id="esc-scene-svg" viewBox="0 0 1200 510" role="img" aria-labelledby="esc-title esc-desc">
        <title id="esc-title">Yolcu yükü altında yürüyen merdivenin hız kontrolü</title><desc id="esc-desc">Bir kişi yürüyen merdivene biner, hareketli basamaklarla yukarı taşınır ve üst katta iner. Basamaklar gerçek model hızına göre hareket eder. Motor torku ve hız sensörü değerleri değişir.</desc>
        <defs>
          <linearGradient id="esc-bg" x2="0" y2="1"><stop stop-color="#19394d"/><stop offset="1" stop-color="#0d2333"/></linearGradient>
          <linearGradient id="esc-metal" x2="0" y2="1"><stop stop-color="#a8c0cc"/><stop offset=".35" stop-color="#62869a"/><stop offset="1" stop-color="#2d5066"/></linearGradient>
          <linearGradient id="esc-glass" x2="0" y2="1"><stop stop-color="#88d9ef" stop-opacity=".28"/><stop offset="1" stop-color="#77c6e1" stop-opacity=".05"/></linearGradient>
          <pattern id="esc-grid" width="45" height="45" patternUnits="userSpaceOnUse"><path d="M45 0H0V45" fill="none" stroke="#45677c" stroke-width=".7" opacity=".24"/></pattern>
          <clipPath id="esc-step-clip"><rect x="175" y="165" width="780" height="255"/></clipPath>
          <marker id="esc-load-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#ffbe70"/></marker>
        </defs>
        <rect width="1200" height="510" fill="url(#esc-bg)"/><rect x="20" y="55" width="1160" height="410" fill="url(#esc-grid)"/>
        <g opacity=".35" stroke="#3e657c" fill="none"><path d="M1000 67V154H1170M1100 67V154M25 260H155M25 276H155"/><path d="M30 420H190L306 472H795M975 190H1180"/></g>
        <g class="esc-scene-message"><text x="65" y="106" class="esc-scene-kicker">HEDEF HER ZAMAN AYNI</text><text x="65" y="145" class="esc-hero-value">0,50 <tspan class="esc-hero-unit">m/s</tspan></text><text id="esc-scene-note" x="65" y="182" class="esc-scene-note">Yolcu binmeden önce denge.</text></g>
        <path d="M22 397H179V410H22M947 173H1180V188H947" fill="#63879a" stroke="#aec4ce" stroke-width="2"/>
        <path d="M152 414H281L813 190H967V245H826L300 468H137V429Z" fill="url(#esc-metal)" stroke="#95b1c0" stroke-width="2"/>
        <path d="M184 433H289L821 211H944M305 451L824 232" fill="none" stroke="#254658" stroke-width="4"/>
        <g stroke="#476b7f" stroke-width="3"><path d="M336 413L364 440M406 384L434 411M476 354L504 381M546 325L574 352M616 295L644 322M686 266L714 293M756 236L784 263"/></g>
        <path d="M151 333Q151 320 171 320H248L809 96H972Q992 96 992 117V169H817L280 393H173Z" fill="url(#esc-glass)" stroke="#74acbf" stroke-width="2"/>
        <path d="M148 350V335Q148 318 170 318H246L807 94H971Q995 94 995 116V131" fill="none" stroke="#071822" stroke-width="13" stroke-linecap="round"/>
        <path id="esc-handrail" d="M148 350V335Q148 318 170 318H246L807 94H971Q995 94 995 116V131" fill="none" stroke="#a3bac5" stroke-width="2" stroke-dasharray="3 27"/>
        <path d="M225 325V386M813 105V165M933 103V166" stroke="#97bfcd" stroke-opacity=".6" stroke-width="3"/>
        <path d="M172 403H282L817 179H959" fill="none" stroke="#0a1b25" stroke-width="10"/>
        <g id="esc-steps" clip-path="url(#esc-step-clip)">${Array.from({length:28},(_,i)=>`<g id="esc-tread-${i}"><path class="esc-tread-face"/><path class="esc-tread-edge"/></g>`).join('')}</g>
        <g id="esc-person"><ellipse cy="2" rx="23" ry="4" fill="#031521" opacity=".5"/><path id="esc-leg-back" class="esc-leg back"/><path id="esc-leg-front" class="esc-leg"/><path id="esc-arm-back" class="esc-arm back"/><path d="M-16-82Q-2-89 13-80L18-43Q1-38-17-44Z" fill="#4ee0c9" stroke="#a2f5e1" stroke-width="1.5"/><path d="M-14-78L-7-46" stroke="#178e89" stroke-width="3"/><rect x="-24" y="-79" width="13" height="32" rx="5" fill="#ffbb65" stroke="#ffd99b" stroke-width="2"/><path id="esc-arm-front" class="esc-arm"/><path d="M-4-88V-83H5V-88" stroke="#f3b68e" stroke-width="8"/><circle cy="-101" r="13" fill="#f4bc96"/><path d="M-13-99Q-17-116 1-117Q15-116 13-104L7-108Q-4-100-13-103Z" fill="#203449"/><path d="M11-102L15-98H11" fill="#f4bc96"/><circle cx="8" cy="-103" r="1.1" fill="#273246"/></g>
        <g id="esc-load-indicator"><path d="M0 0V51" stroke="#ffbe70" stroke-width="3" marker-end="url(#esc-load-arrow)"/><rect x="-5" y="-31" width="91" height="25" rx="6" fill="#62442d" stroke="#b88c5b"/><text id="esc-mass-label" x="40" y="-13" text-anchor="middle" class="esc-load-label">80 kg</text></g>
        <g transform="translate(918 220)"><circle r="26" fill="#142f40" stroke="#8bb1c4" stroke-width="4"/><g id="esc-wheel"><path d="M-22 0H22M0-22V22M-16-16L16 16M-16 16L16-16" stroke="#b4ccd7" stroke-width="4"/></g><circle r="7" fill="#5be2c3"/></g>
        <path d="M918 245V286H974" fill="none" stroke="#779ba9" stroke-width="7"/>
        <g transform="translate(974 257)"><rect x="0" y="0" width="109" height="64" rx="14" fill="#28677b" stroke="#7bc8d1" stroke-width="2"/><path d="M65 8V56M76 8V56M87 10V54" stroke="#153e56" stroke-width="5"/><circle cx="30" cy="32" r="23" fill="#163e52" stroke="#9cddd6" stroke-width="2"/><g id="esc-rotor"><path d="M30 14V50M12 32H48" stroke="#58c6bd" stroke-width="4"/></g><rect x="11" y="64" width="86" height="8" rx="3" fill="#5b8596"/></g>
        <text x="1030" y="351" text-anchor="middle" class="esc-motor-label">MOTOR TORKU</text><text id="esc-scene-torque" x="1030" y="382" text-anchor="middle" class="esc-motor-value">40,0 N·m</text>
        <g transform="translate(693 374)"><rect width="190" height="65" rx="8" fill="#173b4c" stroke="#548b9d"/><circle cx="23" cy="24" r="5" fill="#6df2ce"/><text x="43" y="29" class="esc-sensor-label">Hız sensörü</text><text id="esc-sensor-value" x="96" y="53" text-anchor="middle" class="esc-sensor-value">0,500 m/s</text></g>
        <path d="M918 245V352H788V374" fill="none" stroke="#5da59f" stroke-width="2" stroke-dasharray="5 5"/>
        <text x="65" y="473" class="esc-floor-label">ALT KAT</text><text x="1115" y="210" text-anchor="middle" class="esc-floor-label">ÜST KAT</text>
      </svg>
      <div class="mill-caption"><span id="esc-caption">Basamak hızı sabit; motor boş merdivenin kayıplarını karşılıyor.</span><span>Öğretim modeli</span></div>
    </div>
    <aside class="mill-panel esc-panel" aria-label="Yürüyen merdiven deneyi">
      <div class="esc-target"><span>REFERANS HIZ</span><strong>0,50 <small>m/s</small></strong><p>Senaryo boyunca değişmez.</p></div>
      <div class="mill-readings"><div><span>Gerçek hız</span><output id="esc-speed">0,500 <small>m/s</small></output></div><div><span>Hata · r − vₘ</span><output id="esc-error">0,000 <small>m/s</small></output></div></div>
      <div class="esc-torques"><div><span>Motor torku</span><strong id="esc-torque">40,0 N·m</strong></div><div><span>Yolcunun ek yükü</span><strong id="esc-load">0,0 N·m</strong></div></div>
      <button id="esc-board" type="button">Bir kişi bindir ↗</button>
      <button id="esc-auto" type="button" aria-pressed="true">Otomatik senaryo açık</button>
      <button id="esc-control" type="button" aria-pressed="true">Hız kontrolü açık</button>
      <div class="mill-pressure"><label for="esc-mass">Yolcu kütlesi <output id="esc-mass-output">80 kg</output></label><input id="esc-mass" type="range" min="50" max="120" step="5" value="80"><span class="mill-limit">Bir sonraki binişten önce ayarlayın.</span></div>
      <button id="esc-reset" type="button" class="esc-reset">↺ Baştan oynat</button>
    </aside>
  </div>
  <div class="esc-stages" aria-label="Bozucuya verilen tepkinin aşamaları">${['Sabit hız','Kişi biniyor','Yüklü denge','Kişi iniyor','Yeni denge'].map((x,i)=>`<div data-esc-stage="${i}"><span>0${i+1}</span>${x}</div>`).join('')}</div>
  <div class="esc-explain" aria-live="polite"><strong id="esc-explain-title">Başlangıç dengesi</strong><p id="esc-explain-text">Henüz yolcu yok. Motor, boş merdivenin sürtünme ve kayıplarını karşılayarak hızı 0,50 m/s’de tutuyor.</p></div>
  <div class="esc-charts">
    <figure><figcaption><strong>Hız neden önce düşer, sonra yükselir?</strong><span><i class="esc-key speed"></i>Gerçek hız <i class="esc-key ref"></i>Referans</span></figcaption><svg viewBox="0 0 550 190" role="img" aria-label="Son 40 saniyede hız ve sabit referans; biniş ve iniş anları işaretlenir"><path d="M52 25H538M52 85H538M52 145H538" class="esc-chart-grid"/><text id="esc-y-high" x="2" y="29">0,65</text><text id="esc-y-mid" x="2" y="89">0,50</text><text id="esc-y-low" x="2" y="149">0,35</text><text x="2" y="13">m/s</text><g id="esc-speed-events"></g><path id="esc-chart-ref" class="esc-chart-reference"/><path id="esc-chart-speed" class="esc-chart-speed"/><text x="52" y="181">−40 s</text><text x="505" y="181">şimdi</text></svg></figure>
    <figure><figcaption><strong>Aynı hız, farklı motor torku</strong><span><i class="esc-key torque"></i>Motor <i class="esc-key load"></i>Yolcunun ek yükü</span></figcaption><svg viewBox="0 0 550 190" role="img" aria-label="Son 40 saniyede motor torku ve yolcunun oluşturduğu ek yük torku"><path d="M52 25H538M52 85H538M52 145H538" class="esc-chart-grid"/><text x="12" y="29">150</text><text x="20" y="89">75</text><text x="29" y="149">0</text><text x="2" y="13">N·m</text><g id="esc-torque-events"></g><path id="esc-chart-load" class="esc-chart-load"/><path id="esc-chart-torque" class="esc-chart-torque"/><text x="52" y="181">−40 s</text><text x="505" y="181">şimdi</text></svg></figure>
  </div>
  <section class="esc-loop"><div class="esc-loop-heading"><h2>İşlemci, yükü hızdaki değişimden fark eder</h2><p>Hız sensörü → ADC → karşılaştırma ve PI kontrol → DAC → motor sürücüsü</p></div>
    <svg viewBox="0 0 1200 330" role="img" aria-labelledby="esc-loop-title esc-loop-desc">
      <title id="esc-loop-title">ADC ve DAC içeren negatif geri beslemeli hız kontrol döngüsü</title>
      <desc id="esc-loop-desc">Hız sensörünün analog ölçümü ADC ile sayısallaştırılır ve referanstan çıkarılır. PI işlemcinin sayısal kontrol komutu DAC ile analog işarete dönüştürülerek motor sürücüsüne iletilir. Sürücü motor ve merdiveni hareket ettirir; yolcu yükü sisteme bozucu tork olarak etki eder.</desc>
      <defs><marker id="esc-loop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#647f9b"/></marker><marker id="esc-dist-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#bc641c"/></marker></defs>
      <g class="esc-loop-wire" marker-end="url(#esc-loop-arrow)">
        <path id="esc-wire-ref" d="M135 140H161"/>
        <path id="esc-wire-error" d="M201 140H252"/>
        <path id="esc-wire-dac" d="M424 140H468"/>
        <path id="esc-wire-drive" d="M593 140H637"/>
        <path id="esc-wire-motor" d="M796 140H840"/>
        <path id="esc-wire-out" d="M1046 140H1180"/>
        <path id="esc-wire-sense" d="M1110 140V276H1046"/>
        <path id="esc-wire-adc" d="M840 276H620"/>
        <path id="esc-wire-back" d="M470 276H181V160"/>
      </g>
      <g><rect class="esc-ref-box" x="15" y="104" width="120" height="72" rx="8"/><text x="75" y="130">Referans</text><text x="75" y="156" class="esc-loop-value">0,50 m/s</text></g>
      <circle class="esc-sum" cx="181" cy="140" r="20"/><text x="148" y="127" class="esc-sign">+</text><text x="158" y="182" class="esc-sign">−</text><text x="225" y="103" class="esc-small">Hata</text><text id="esc-loop-error" x="238" y="211" class="esc-small">0,000</text>
      <g id="esc-processor"><rect x="252" y="97" width="172" height="86" rx="8"/><text x="338" y="124">İşlemci · PI</text><text id="esc-loop-command" x="338" y="150" class="esc-loop-value">40,0 N·m</text><text id="esc-loop-action" x="338" y="172" class="esc-small">Torku koru</text></g>
      <g id="esc-dac" class="esc-converter"><rect x="468" y="104" width="125" height="72" rx="8"/><text x="530.5" y="132" class="esc-converter-title">DAC</text><text x="530.5" y="157" class="esc-small">Sayısal → analog</text></g>
      <g><rect x="637" y="104" width="159" height="72" rx="8"/><text x="716.5" y="132">Motor sürücüsü</text><text x="716.5" y="157" class="esc-small">Komutu uygular</text></g>
      <g><rect x="840" y="104" width="206" height="72" rx="8"/><text x="943" y="132">Motor + merdiven</text><text id="esc-loop-torque" x="943" y="157" class="esc-loop-value">40,0 N·m</text></g>
      <text x="1110" y="87" class="esc-small">Gerçek hız</text><text id="esc-loop-speed" x="1110" y="113" class="esc-loop-value">0,500 m/s</text>
      <g><rect x="840" y="239" width="206" height="74" rx="8"/><text x="943" y="266">Hız sensörü</text><text id="esc-loop-measured" x="943" y="294" class="esc-loop-value">0,500 m/s</text></g>
      <g id="esc-adc" class="esc-converter"><rect x="470" y="239" width="150" height="74" rx="8"/><text x="545" y="267" class="esc-converter-title">ADC</text><text x="545" y="294" class="esc-small">Analog → sayısal</text></g>
      <text x="730" y="263" class="esc-small">Analog ölçüm</text><text x="326" y="263" class="esc-small">Sayısal ölçüm</text>
      <text x="943" y="28" class="esc-dist-title">BOZUCU · YOLCU YÜKÜ</text><text id="esc-loop-load" x="943" y="51" class="esc-dist-value">Ek yük torku: 0,0 N·m</text><path id="esc-dist-path" d="M943 60V104" fill="none" stroke="#bc641c" stroke-width="2.5" marker-end="url(#esc-dist-arrow)"/><text x="966" y="96" class="esc-dist-value">−</text>
      <g id="esc-loop-dots">${['ref','error','dac','drive','motor','out','sense','adc','back'].map(key=>`<circle id="esc-dot-${key}" r="4" fill="#2950db"/>`).join('')}</g>
    </svg>
    <p class="esc-conversion-note"><strong>ADC:</strong> Analog hız ölçümünü sayısal değere çevirir. <strong>DAC:</strong> Sayısal kontrol komutunu sürücünün kullanacağı analog işarete çevirir. Bu örnekte sensör çıkışı ve sürücü komut girişi analog, çeviriciler ideal kabul edilmiştir.</p>
  </section>
  <div class="esc-takeaway"><strong>Hata sıfıra yaklaşınca motor torku sıfır olmaz.</strong><p>Yolcu üzerindeyken motor daha fazla yük taşır. Yolcu indiğinde yük azalır; aynı hızı korumak için daha az tork yeterlidir.</p></div>
  <p class="esc-model-note">Öğretim modeli: tek yolcu, sabit 0,50 m/s referans, PI hız kontrolü. Hız sapmaları anlatım için görünür seçilmiştir; gerçek bir merdivenin ayarları değildir. <a href="https://www.mathworks.com/help/control/ug/dc-motor-control.html" target="_blank" rel="noopener">Yük torku ve hız kontrolü · MathWorks</a></p>`;
  const $=id=>root.querySelector('#'+id),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const fmt=(v,n=3)=>{if(Math.abs(v)<.5*10**(-n))v=0;return v.toLocaleString('tr-TR',{minimumFractionDigits:n,maximumFractionDigits:n});};
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const reference=.5,kp=400,ki=350,loadPerKg=9.81*Math.sin(Math.atan(224/535))*.1;
  const initial=()=>({time:0,speed:.5,measured:.5,motor:40,command:40,integral:40,load:0,mass:80,closed:true,auto:true,phase:'waiting',phaseTime:0,distance:0,rideStart:0,boardX:200,personX:60,personY:397,boardedAt:null,unloadedAt:null,controlClock:0,ui:0,lastStage:-1,history:[{time:0,speed:.5,motor:40,load:0}],events:[],boards:0,exits:0});
  let s=initial();
  const surface=x=>397-clamp((x-280)/535,0,1)*224;
  function approach(){if(s.phase!=='waiting'&&s.phase!=='rest')return;s.phase='approach';s.phaseTime=0;s.personX=60;s.personY=397;s.boardX=190+((s.distance+s.speed*2)*100)%30;s.unloadedAt=null;}
  function recordEvent(type){s.events.push({time:s.time,type});while(s.events.length&&s.events[0].time<s.time-40)s.events.shift();}
  function advance(dt){
    s.time+=dt;s.phaseTime+=dt;
    if(s.phase==='waiting'&&s.auto&&s.phaseTime>=3.5)approach();
    if(s.phase==='approach'){
      const boardX=s.boardX;
      s.personX=60+(boardX-60)*Math.min(1,s.phaseTime/2);s.personY=397;
      if(s.phaseTime>=2){s.phase='riding';s.phaseTime=0;s.boardX=boardX;s.rideStart=s.distance;s.boardedAt=s.time;s.load=s.mass*loadPerKg;s.boards++;recordEvent('Biniş');}
    }else if(s.phase==='riding'){
      s.personX=s.boardX+(s.distance-s.rideStart)*100;s.personY=surface(s.personX-15);
      if(s.personX>=955){s.phase='leaving';s.phaseTime=0;s.personX=955;s.personY=173;s.load=0;s.unloadedAt=s.time;s.exits++;recordEvent('İniş');}
    }else if(s.phase==='leaving'){
      s.personX=955+225*Math.min(1,s.phaseTime/2.8);s.personY=173;
      if(s.phaseTime>=2.8){s.phase='rest';s.phaseTime=0;}
    }else if(s.phase==='rest'&&s.auto&&s.phaseTime>=5){s.phase='waiting';s.phaseTime=0;s.personX=60;s.personY=397;s.boardedAt=null;s.unloadedAt=null;}
    s.controlClock+=dt;
    if(s.controlClock>=.02-1e-9){
      const sample=s.controlClock;s.controlClock=0;
      if(s.closed){const error=reference-s.measured,next=s.integral+ki*error*sample,raw=kp*error+next;
        if((raw>=0&&raw<=150)||(raw>150&&error<0)||(raw<0&&error>0))s.integral=next;
        s.command=clamp(kp*error+s.integral,0,150);
      }
    }
    s.motor+=(s.command-s.motor)*(1-Math.exp(-dt/.18));
    s.speed=Math.max(0,s.speed+(s.motor-80*s.speed-s.load)/80*dt);
    s.measured+=(s.speed-s.measured)*(1-Math.exp(-dt/.08));s.distance+=s.speed*dt;
  }
  function phaseInfo(){
    if(!s.closed)return {stage:s.load>0?2:s.unloadedAt!==null?4:0,title:'Hız kontrolü kapalı · motor komutu sabit',text:'İşlemci düzeltme yapmıyor. Yolcu yükü değişse de son tork komutu korunuyor; hız referanstan sapabilir.',note:'Geri beslemeli düzeltme yok.',badge:'Kontrol kapalı'};
    if(s.phase==='approach')return {stage:1,title:'Yolcu yaklaşıyor · referans değişmiyor',text:'Kişi henüz merdivene yük bindirmedi. Binince motorun karşılaması gereken yük torku artacak.',note:'Yolcu binmeye hazırlanıyor.',badge:'Binişe hazırlanıyor'};
    if(s.phase==='riding'){
      if(s.time-s.boardedAt<4.5)return {stage:1,title:'Biniş → yük arttı → hız kısa süre düştü',text:'Motor torku ilk anda yeni yükü karşılayamaz. Sensör hız düşüşünü ölçer; pozitif hata oluşur. İşlemci sürücüye daha fazla tork komutu gönderir.',note:'Yük artıyor; işlemci torku artırıyor.',badge:'Yük artışı'};
      return {stage:2,title:'Yolcu hâlâ üzerinde · hız yeniden referansta',text:'Bozucu yük hâlâ var. Kontrolcü yükün etkisini daha yüksek motor torkuyla karşılıyor; hız hatası sıfıra yaklaşıyor.',note:'Aynı hız, daha yüksek motor torku.',badge:Math.abs(s.speed-reference)<.008?'Yüklü denge':'Hız toparlanıyor'};
    }
    if(s.unloadedAt!==null){
      if(s.time-s.unloadedAt<4.5)return {stage:3,title:'İniş → yük azaldı → hız kısa süre yükseldi',text:'Yolcu inince önceki motor torku fazla gelir. Sensör hız artışını ölçer; hata negatife döner. İşlemci tork komutunu azaltır.',note:'Yük azalıyor; işlemci torku azaltıyor.',badge:'Yük azalışı'};
      return {stage:4,title:'Yeni denge · aynı hız, yeniden daha az tork',text:'Yolcu yükü kaldırıldı. Motor, boş merdivenin kayıplarını karşılayacak torka dönerek hızı yine 0,50 m/s’de tutuyor.',note:'Hız sabit; motor torku başlangıca döndü.',badge:'Yeni denge'};
    }
    return {stage:0,title:'Başlangıç dengesi',text:'Henüz yolcu yok. Motor, boş merdivenin sürtünme ve kayıplarını karşılayarak hızı 0,50 m/s’de tutuyor.',note:'Yolcu binmeden önce denge.',badge:'Sabit hız'};
  }
  function charts(){
    if(!s.history.length)return;
    const low=Math.min(.35,Math.floor(Math.min(...s.history.map(p=>p.speed))/.05)*.05),high=Math.max(.65,Math.ceil(Math.max(...s.history.map(p=>p.speed))/.05)*.05);
    const x=t=>52+(t-s.time+40)/40*486,y=v=>145-(v-low)/(high-low)*120;
    const path=(key,scale)=>s.history.map((p,i)=>`${i?'L':'M'}${x(p.time).toFixed(2)} ${scale(p[key]).toFixed(2)}`).join(' ');
    $('esc-chart-speed').setAttribute('d',path('speed',y));$('esc-chart-ref').setAttribute('d',`M52 ${y(reference)}H538`);
    $('esc-chart-torque').setAttribute('d',path('motor',v=>145-v/150*120));$('esc-chart-load').setAttribute('d',path('load',v=>145-v/150*120));
    $('esc-y-high').textContent=fmt(high,2);$('esc-y-mid').textContent=fmt((high+low)/2,2);$('esc-y-low').textContent=fmt(low,2);
    const markers=s.events.filter(e=>e.time>=s.time-40).map(e=>`<g transform="translate(${x(e.time).toFixed(2)} 0)"><path d="M0 27V150" stroke="#b58455" stroke-dasharray="3 4" opacity=".6"/><text x="-4" y="22" text-anchor="end" class="esc-event-label">${e.type}</text></g>`).join('');
    $('esc-speed-events').innerHTML=markers;$('esc-torque-events').innerHTML=markers;
  }
  function values(){
    const error=reference-s.measured,info=phaseInfo(),onboard=s.phase==='riding',busy=['approach','riding','leaving'].includes(s.phase);
    $('esc-speed').innerHTML=fmt(s.speed)+' <small>m/s</small>';$('esc-error').innerHTML=(error>.0005?'+':'')+fmt(error).replace('-','−')+' <small>m/s</small>';
    $('esc-torque').textContent=fmt(s.motor,1)+' N·m';$('esc-load').textContent=fmt(s.load,1)+' N·m';$('esc-scene-torque').textContent=fmt(s.motor,1)+' N·m';$('esc-sensor-value').textContent=fmt(s.measured)+' m/s';
    $('esc-mass-label').textContent=fmt(s.mass,0)+' kg';$('esc-mass-output').textContent=fmt(s.mass,0)+' kg';$('esc-mass').disabled=busy;
    $('esc-board').disabled=busy;$('esc-board').textContent=onboard?'Yolcu taşınıyor…':s.phase==='approach'?'Yolcu biniyor…':s.phase==='leaving'?'Yolcu iniyor…':'Bir kişi bindir ↗';
    $('esc-auto').textContent=s.auto?'Otomatik senaryo açık':'Otomatik senaryo kapalı';$('esc-auto').setAttribute('aria-pressed',String(s.auto));$('esc-control').textContent=s.closed?'Hız kontrolü açık':'Hız kontrolü kapalı';$('esc-control').setAttribute('aria-pressed',String(s.closed));
    $('esc-badge').textContent=info.badge;$('esc-badge').dataset.good=String(Math.abs(s.speed-reference)<.008&&s.closed);
    $('esc-scene-note').textContent=info.note;$('esc-caption').textContent=!s.closed?'Motor komutu sabit; hızdaki sapma düzeltilmiyor.':onboard?'Yolcu yükü devam ediyor; hedef hız değişmiyor.':s.unloadedAt!==null?'Yolcu indi; motorun karşılaması gereken yük azaldı.':'Basamak hızı sabit; motor boş merdivenin kayıplarını karşılıyor.';
    if(s.lastStage!==info.stage||$('esc-explain-title').textContent!==info.title){s.lastStage=info.stage;root.querySelectorAll('[data-esc-stage]').forEach(x=>x.classList.toggle('active',Number(x.dataset.escStage)===info.stage));$('esc-explain-title').textContent=info.title;$('esc-explain-text').textContent=info.text;}
    $('esc-loop-error').textContent=fmt(error).replace('-','−')+' m/s';$('esc-loop-command').textContent=fmt(s.command,1)+' N·m';$('esc-loop-torque').textContent=fmt(s.motor,1)+' N·m';$('esc-loop-speed').textContent=fmt(s.speed)+' m/s';$('esc-loop-measured').textContent=fmt(s.measured)+' m/s';$('esc-loop-load').textContent='Ek yük torku: '+fmt(s.load,1)+' N·m';
    $('esc-loop-action').textContent=!s.closed?'Son komut sabit':s.command-s.motor>.8?'Torku artır':s.command-s.motor<-.8?'Torku azalt':'Torku koru';$('esc-processor').classList.toggle('responding',s.closed&&Math.abs(error)>.008);
    Object.assign(root.dataset,{time:s.time.toFixed(3),speed:s.speed.toFixed(5),measured:s.measured.toFixed(5),torque:s.motor.toFixed(4),command:s.command.toFixed(4),load:s.load.toFixed(4),phase:s.phase,stage:String(info.stage),boards:String(s.boards),exits:String(s.exits),closed:String(s.closed),auto:String(s.auto),personX:s.personX.toFixed(2)});
    charts();
  }
  function scene(){
    const shift=s.distance*100%30;
    for(let i=0;i<28;i++){const x=145+i*30+shift,y=surface(x),g=$('esc-tread-'+i);g.children[0].setAttribute('d',`M${x} ${y}h30v19h-30Z`);g.children[1].setAttribute('d',`M${x} ${y}h30M${x+4} ${y+5}h22M${x+4} ${y+10}h22`);}
    $('esc-handrail').setAttribute('stroke-dashoffset',-s.distance*100);$('esc-wheel').setAttribute('transform',`rotate(${s.distance*500})`);$('esc-rotor').setAttribute('transform',`rotate(${s.distance*750} 30 32)`);
    const walking=s.phase==='approach'||s.phase==='leaving',swing=walking?Math.sin(s.phaseTime*11)*12:0;
    $('esc-person').setAttribute('transform',`translate(${s.personX} ${s.personY+(walking?Math.abs(Math.sin(s.phaseTime*11))*1.7:0)})`);
    $('esc-person').style.opacity=s.phase==='rest'?'0':s.phase==='leaving'?String(clamp((1180-s.personX)/35,0,1)):'1';
    $('esc-leg-back').setAttribute('d',`M-7-43L${-9-swing*.5}-22L${-12+swing}-3h10`);$('esc-leg-front').setAttribute('d',`M7-43L${10+swing*.5}-22L${12-swing}-3h10`);
    $('esc-arm-back').setAttribute('d',`M-13-76L${-18+swing*.4}-56L${-15+swing*.8}-42`);$('esc-arm-front').setAttribute('d',s.phase==='riding'?'M12-76L22-63L29-72':`M12-76L${20-swing*.4}-56L${16-swing*.8}-42`);
    $('esc-load-indicator').setAttribute('transform',`translate(${s.personX+48} ${s.personY-72})`);$('esc-load-indicator').style.opacity=s.phase==='riding'?'1':'0';
    $('esc-loop-dots').style.opacity=reduced.matches||!s.closed?'0':'1';
    if(!reduced.matches&&s.closed)for(const [i,key]of ['ref','error','dac','drive','motor','out','sense','adc','back'].entries()){const p=$('esc-wire-'+key),point=p.getPointAtLength(((s.time/2.2+i*.13)%1)*p.getTotalLength());$('esc-dot-'+key).setAttribute('cx',point.x);$('esc-dot-'+key).setAttribute('cy',point.y);}
  }
  function tick(ms){const seconds=clamp(ms/1000,0,.12);if(!seconds)return;const steps=Math.ceil(seconds/.005),dt=seconds/steps;for(let i=0;i<steps;i++)advance(dt);s.ui+=seconds;if(s.ui>=.08){s.ui=0;s.history.push({time:s.time,speed:s.speed,motor:s.motor,load:s.load});while(s.history.length&&s.history[0].time<s.time-40)s.history.shift();values();}scene();}
  $('esc-board').addEventListener('click',()=>{approach();values();scene();});
  $('esc-auto').addEventListener('click',()=>{s.auto=!s.auto;values();});
  $('esc-control').addEventListener('click',()=>{s.closed=!s.closed;if(s.closed)s.integral=s.command-kp*(reference-s.measured);values();});
  $('esc-mass').addEventListener('input',e=>{s.mass=Number(e.target.value);values();});
  $('esc-reset').addEventListener('click',()=>{const mass=s.mass,auto=s.auto;s=initial();s.mass=mass;s.auto=auto;$('esc-mass').value=mass;values();scene();});
  values();scene();return {tick,refresh:()=>{values();scene();}};
};
