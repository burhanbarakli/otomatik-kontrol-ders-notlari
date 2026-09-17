/* Source: Oto.Kontrol_1_2019.pdf, printed pages 11–13.
   No automatic progression: the lecturer controls the limit and sampling figures. */
window.createSignalsLesson=function(root){
  'use strict';
  const pdf='./2024%20OTOMAT%C4%B0K_KONTROL/Oto.Kontrol_1_2019.pdf';
  const lim=(at)=>`<span class="sig-lim">lim<small>t → ${at}</small></span>`;
  const heading=(n,title,page)=>`<header class="sig-heading"><span>${n}</span><h2>${title}</h2><small>PDF · s. ${page}</small></header>`;
  root.innerHTML=`
    <nav class="sig-nav" aria-label="İşaretler bölüm başlıkları">
      <a href="#isaret-tanim"><b>01</b> İşaret nedir?</a><a href="#isaret-sureklilik"><b>02</b> Süreklilik</a><a href="#isaret-ornekleme"><b>03</b> Ayrık zaman</a><a href="#isaret-surekli-sistem"><b>04</b> Sürekli zamanlı sistem</a><a href="#isaret-sayisal-sistem"><b>05</b> Sayısal ve hibrit sistem</a>
    </nav>
    <section class="sig-section" id="isaret-tanim">
      ${heading('01','Sistemler işaretlerle etkileşir','11')}
      <p class="sig-lead"><strong>İşaret</strong>, sistemlerin ve sistem elemanlarının birbirleriyle etkileşmesini sağlayan, ölçülebilir bir büyüklüktür. Bir sıcaklık, gerilim veya hız değeri, kontrolcüye sistemin durumunu anlatır.</p>
      <div class="sig-definition">
        <article class="sig-card sig-notation"><div class="sig-eyebrow">Bir işaretin dili</div><div class="sig-symbol">f(<span>t</span>)</div><dl><dt>t</dt><dd>Bağımsız değişken<br>Hangi zaman?</dd><dt>f(t)</dt><dd>Bağımlı değişken<br>O andaki değer ne?</dd></dl><div class="sig-examples"><span>Sıcaklık · °C</span><span>Gerilim · V</span><span>Hız · m/s</span></div></article>
        <article class="sig-card"><div class="sig-eyebrow">Zamana göre sınıflandırma</div><h3>Hangi anlarda değer biliyoruz?</h3><div class="sig-classify"><div><strong>Sürekli zaman · f(t)</strong><p>İşaret, incelenen zaman aralığının <b>her anında</b> tanımlıdır.</p><small>Değeri yumuşak değişebilir veya sıçrama yapabilir.</small></div><div><strong>Ayrık zaman · f[k] = f(kT)</strong><p>İşaret, yalnızca <b>belirli anlarda</b> tanımlıdır: 0, T, 2T, 3T, …</p><small>T örnekleme aralığıdır; k bir tam sayı indeksidir.</small></div></div></article>
      </div>
      <p class="sig-bridge">11. sayfanın başındaki RLC çözümü: <a href="#not-rlc-lineer-olmayan" data-sig-topic="notlar">Kavramlar → Örnek 2 · Lineer olmayan RLC</a>. Burada 1.2 İşaretler başlığıyla devam ediyoruz.</p>
    </section>
    <section class="sig-section" id="isaret-sureklilik">
      ${heading('02','Sürekli zaman, kesintisiz bir eğri demek mi?','11–12')}
      <p class="sig-lead">İki farklı soruyu ayıralım: <strong>İşaret her anda tanımlı mı?</strong> ve <strong>o noktada süreklilik var mı?</strong> Aşağıdaki iki işaret de sürekli zamanlıdır.</p>
      <div class="sig-tools"><label for="sig-epsilon">Yaklaşma uzaklığı δ <input id="sig-epsilon" type="range" min="5" max="95" step="1" value="70"><output id="sig-epsilon-value" for="sig-epsilon">0,70</output></label><button type="button" id="sig-near">Noktaya yaklaş</button><p>δ küçüldükçe iki işarete de sağdan ve soldan yaklaşırız.</p></div>
      <div class="sig-two">
        <article class="sig-card"><div class="sig-eyebrow">Sürekli zaman · sürekli işaret</div><h3>Sinüs: iki taraf aynı değere gider</h3><figure class="sig-plot"><svg id="sig-sine" viewBox="0 0 560 310" role="img" aria-labelledby="sig-sine-title"><title id="sig-sine-title">Sinüs eğrisinde pi noktasına sağdan ve soldan yaklaşım</title></svg><figcaption>f(t) = sin(t). t₀ = π noktasındaki değer de 0’dır.</figcaption></figure>
        <div class="sig-limits"><span>${lim('π⁻')} f(t)</span><span>=</span><span>${lim('π⁺')} f(t)</span><span>= f(π) = 0</span></div><div class="sig-live-pair"><div>Soldaki nokta · f(π − δ)<strong id="sig-sine-left"></strong></div><div>Sağdaki nokta · f(π + δ)<strong id="sig-sine-right"></strong></div></div><p>Bir noktada süreklilik için iki tek taraflı limit, <b>işaretin o noktadaki değerine de eşit</b> olmalıdır.</p></article>
        <article class="sig-card"><div class="sig-eyebrow">Sürekli zaman · süreksiz işaret</div><h3>Darbe: iki taraf farklı değerlere gider</h3><figure class="sig-plot"><svg id="sig-pulse" viewBox="0 0 560 310" role="img" aria-labelledby="sig-pulse-title"><title id="sig-pulse-title">Sıfır anında birden sıfıra düşen darbe işareti</title></svg><figcaption>t₀ = 0’da soldan limit 1, sağdan limit 0’dır. Çizimde f(0) = 0 seçildi.</figcaption></figure>
        <div class="sig-limits"><span>${lim('0⁻')} f(t) = 1</span><span>≠</span><span>${lim('0⁺')} f(t) = 0</span></div><div class="sig-live-pair"><div>Soldaki nokta · f(−δ)<strong>1,00</strong></div><div>Sağdaki nokta · f(+δ)<strong>0,00</strong></div></div><p>Anahtarın açılıp kapanması gibi: değer sıçrar; fakat sıçramanın öncesinde ve sonrasında <b>zamanın her anı için bir değer vardır.</b></p></article>
      </div>
      <div class="sig-insight"><strong>Tahtada vurgula</strong><p><b>Süreksiz işaret ≠ ayrık zamanlı işaret.</b> Kare dalga 0 veya 1 değerinde kaldığı aralıklarda da tanımlıdır. Ayrık zamanda ise yalnızca örnek anları tanımlıdır.</p></div>
    </section>
    <section class="sig-section" id="isaret-ornekleme">
      ${heading('03','Zamanın yalnızca bazı anlarına bakalım','12–13')}
      <p class="sig-lead">Sürekli zamanlı sinüs işaretini <strong>T aralıklarıyla ölçelim</strong>. Elde ettiğimiz dizi, eğrinin tamamını değil, örnek anlarındaki değerlerini taşır.</p>
      <div class="sig-equation">f(t) = sin(t) &nbsp; → &nbsp; t = kT &nbsp; → &nbsp; f[k] = f(kT) = sin(kT)</div>
      <div class="sig-tools"><label for="sig-period">Örnekleme aralığı T <input id="sig-period" type="range" min="0.2" max="1.6" step="0.1" value="0.8"><output id="sig-period-value" for="sig-period">0,8 s</output></label><p>T’yi azalt: aynı zaman aralığında daha sık örnek al.</p></div>
      <article class="sig-card"><div class="sig-sample-head"><h3>Aynı işaret, farklı örnekleme aralıkları</h3><span>Sinüsün açısal frekansı: 1 rad/s</span></div>
        <div class="sig-mode-buttons" aria-label="Örnekleme grafiği görünümü"><button type="button" data-sig-mode="source" aria-pressed="true">Kaynak sinüs</button><button type="button" data-sig-mode="samples" aria-pressed="false">Yalnız örnekler</button><button type="button" data-sig-mode="alternatives" aria-pressed="false">Olası eğriler</button><button type="button" data-sig-mode="hold" aria-pressed="false">Tutucu çıkışı</button></div>
        <figure class="sig-plot"><svg id="sig-sampling" viewBox="0 0 1120 335" role="img" aria-labelledby="sig-sampling-title sig-sampling-desc"><title id="sig-sampling-title">Sinüsün eşit aralıklarla örneklenmesi</title><desc id="sig-sampling-desc">Düşey çubukların ucundaki noktalar yalnızca örnekleme anlarında tanımlı dizi değerleridir.</desc></svg><figcaption>Çubuklar zamanı ve örnek değerini okumaya yardım eder; arada tanımlı bir işaret veya fiziksel darbe göstermez.</figcaption></figure>
        <div class="sig-sample-info"><div><span>Örnekleme aralığı</span><strong id="sig-sample-T"></strong></div><div><span>Örnekleme sıklığı · 1/T</span><strong id="sig-sample-frequency"></strong></div><div><span>Grafikte görünen örnek</span><strong id="sig-sample-count"></strong></div></div>
        <p class="sig-mode-note" id="sig-mode-note" aria-live="polite"></p>
      </article>
      <div class="sig-insight sig-amber-note"><strong>İki örnek arasında?</strong><p>Dizinin o arada bir değeri <b>tanımlı değildir</b>; bu, “değer sıfır” demek değildir. Ek koşullar koymadan aynı örneklerden geçen sonsuz sayıda sürekli zamanlı işaret çizilebilir.</p></div>
    </section>
    <section class="sig-section" id="isaret-surekli-sistem">
      ${heading('04','Sürekli zamanlı kontrol sistemi','13')}
      <p class="sig-lead">Çevrimdeki <strong>bütün işaretler sürekli zamanda tanımlıdır</strong>. Bazıları sinüs gibi sürekli, bazıları darbe dizisi gibi sıçramalı olabilir.</p>
      <article class="sig-card"><div class="sig-eyebrow">Ders notundaki motor–yük düzeni</div><h3>Darbe işaretleri bulunan bir sürekli zaman çevrimi</h3>
        <figure class="sig-diagram-scroll"><svg viewBox="0 0 1220 455" role="img" aria-labelledby="sig-ct-title sig-ct-desc">
          <title id="sig-ct-title">Sürekli zamanlı motor hız kontrolünün blok diyagramı</title><desc id="sig-ct-desc">Sürekli zamanlı darbe referansı ölçülen darbelerle karşılaştırılır. Hata değerlendirilir, güç kuvvetlendirici K motoru ve yükü sürer. Darbe üreteci sürekli zamanlı geri besleme verir.</desc>
          <defs><marker id="sig-arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#2950db"/></marker><marker id="sig-arrow-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#a64a06"/></marker></defs>
          <rect x="677" y="85" width="352" height="204" rx="14" fill="#f0f5ff" stroke="#cbd8ef"/>
          <text x="851" y="115" text-anchor="middle" class="sg-label">DC motor</text>
          <path d="M32 184H195" class="sg-amber" marker-end="url(#sig-arrow-amber)"/><path d="M247 184H324" class="sg-amber" marker-end="url(#sig-arrow-amber)"/>
          <circle cx="221" cy="184" r="25" fill="white" stroke="#a64a06" stroke-width="2.5"/>
          <text x="190" y="160" class="sg-label">+</text><text x="186" y="225" class="sg-label">−</text>
          <text x="41" y="230">Referans · r(t)</text><text x="280" y="163" text-anchor="middle">Hata</text>
          <path d="M40 131V101H54V131H69V101H83V131H98V101H112V131H129V101H143V131" class="sg-amber"/>
          <text x="40" y="73" class="sg-small">Sıçramalı, sürekli zamanlı</text>
          <rect x="326" y="145" width="201" height="78" rx="10" fill="#edf2ff" stroke="#aabfe9" stroke-width="2"/>
          <text x="426" y="190" text-anchor="middle" class="sg-label">Değerlendirme</text>
          <path d="M527 184H572" class="sg-blue" marker-end="url(#sig-arrow-blue)"/><path d="M651 184H706" class="sg-blue" marker-end="url(#sig-arrow-blue)"/>
          <rect x="574" y="135" width="76" height="100" rx="10" fill="#2950db"/><text x="612" y="192" text-anchor="middle" style="fill:white;font-size:38px;font-weight:700">K</text>
          <text x="612" y="264" text-anchor="middle" class="sg-small">Güç katı</text>
          <path d="M546 92C558 51 570 51 582 92S606 133 618 92S642 51 654 92" class="sg-blue"/><text x="598" y="35" text-anchor="middle" class="sg-small">Sürekli işaret</text>
          <path d="M708 184H718l7 -11 11 22 11 -22 11 22 11 -22 7 11H800c0 -19 24 -19 24 0c0 -19 24 -19 24 0c0 -19 24 -19 24 0H954V185 M650 220H684V257H954V235" fill="none" stroke="#254369" stroke-width="2.5"/>
          <text x="748" y="157" text-anchor="middle">Rₐ</text><text x="837" y="157" text-anchor="middle">Lₐ</text>
          <circle cx="954" cy="210" r="25" fill="white" stroke="#254369" stroke-width="2.5"/><text x="954" y="217" text-anchor="middle" class="sg-label">M</text>
          <path d="M979 210H1072" class="sg-blue" marker-end="url(#sig-arrow-blue)"/>
          <rect x="1075" y="171" width="108" height="78" rx="10" fill="#edf2ff" stroke="#aabfe9" stroke-width="2"/><text x="1129" y="219" text-anchor="middle" class="sg-label">Yük</text>
          <path d="M1068 105C1080 64 1092 64 1104 105S1128 146 1140 105S1164 64 1176 105" class="sg-blue"/>
          <text x="1125" y="49" text-anchor="middle" class="sg-small">Hız · ω(t)</text>
          <circle cx="1048" cy="210" r="5" fill="#2950db"/>
          <path d="M1048 210V365H829" class="sg-blue" marker-end="url(#sig-arrow-blue)"/>
          <rect x="647" y="330" width="180" height="70" rx="10" fill="#fff4e8" stroke="#deb991" stroke-width="2"/>
          <text x="737" y="359" text-anchor="middle" class="sg-label">Darbe üreteci</text><text x="737" y="382" text-anchor="middle" class="sg-small">Hıza bağlı darbeler</text>
          <path d="M647 365H221V211" class="sg-amber" marker-end="url(#sig-arrow-amber)"/>
          <path d="M338 334V304H352V334H371V304H385V334H404V304H418V334H438V304H452V334" class="sg-amber"/>
          <text x="385" y="404" text-anchor="middle">Geri besleme · sürekli zamanlı darbe dizisi</text>
        </svg></figure>
        <div class="sig-diagram-caption"><span>Sürekli değişen gerilim / hız</span><span>Sıçramalı referans / geri besleme</span></div>
        <div class="sig-summary-row"><div><strong>Referans karşılaştırılır</strong><p>Hata, değerlendirme bloğuna gelir. Güç katı motorun sürülmesini sağlar.</p></div><div><strong>Darbe de her anda tanımlıdır</strong><p>Darbe üretecinin çıkışı, darbeler arasında da belirli bir değere sahiptir.</p></div><div><strong>Model sürekli zamandadır</strong><p>Diferansiyel denklemler kullanılır. Lineer modeller uygun koşullarda Laplace dönüşümüyle s-domeninde incelenir.</p></div></div>
      </article>
    </section>
    <section class="sig-section" id="isaret-sayisal-sistem">
      ${heading('05','Sayısal işlemci, fiziksel sistemle nasıl konuşur?','13')}
      <p class="sig-lead">Bilgisayar, PLC, mikrodenetleyici veya DSP, <strong>örnek anlarındaki sayılarla</strong> çalışır. Fiziksel sistemin sıcaklığı, seviyesi veya hızı ise zamanın her anında vardır. İki tarafı ADC ve DAC birbirine bağlar.</p>
      <article class="sig-card"><div class="sig-eyebrow">Ölçümden sayısal hesaba, sayısal hesaptan fiziksel komuta</div><h3>ADC → sayısal işlemci → DAC</h3>
        <figure class="sig-diagram-scroll"><svg viewBox="0 0 1240 300" role="img" aria-labelledby="sig-digital-title sig-digital-desc">
          <title id="sig-digital-title">Analog sayısal dönüştürme, sayısal işlem ve sayısal analog dönüştürme</title><desc id="sig-digital-desc">ADC içindeki örnekleyici zamanı ayrıklaştırır, nicemleyici ve kodlayıcı değeri sayıya dönüştürür. İşlemci hesaplar. DAC içindeki kod çözücü ve tutucu, sürekli zamanlı basamak biçiminde bir analog çıkış oluşturur.</desc>
          <defs><marker id="sig-arrow-teal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#087974"/></marker></defs>
          <rect x="135" y="45" width="356" height="210" rx="14" fill="#f1f5ff" stroke="#aabfe9" stroke-width="2" stroke-dasharray="7 5"/>
          <text x="313" y="81" text-anchor="middle" class="sg-label">ADC · Analog → Sayısal</text>
          <rect x="752" y="45" width="343" height="210" rx="14" fill="#eef8f5" stroke="#8ac6b9" stroke-width="2" stroke-dasharray="7 5"/>
          <text x="923" y="81" text-anchor="middle" class="sg-label">DAC · Sayısal → Analog</text>
          <path d="M10 155H157" class="sg-blue" marker-end="url(#sig-arrow-blue)"/><text x="57" y="133" text-anchor="middle">x(t)</text><text x="62" y="204" text-anchor="middle" class="sg-small">Analog giriş</text>
          <rect x="160" y="112" width="130" height="87" rx="9" fill="white" stroke="#aac0e9" stroke-width="2"/>
          <text x="225" y="151" text-anchor="middle" class="sg-label">Örnekleyici</text><text x="225" y="177" text-anchor="middle" class="sg-small">t = kT</text>
          <path d="M290 155H325" class="sg-blue" marker-end="url(#sig-arrow-blue)"/>
          <rect x="327" y="112" width="142" height="87" rx="9" fill="white" stroke="#aac0e9" stroke-width="2"/><text x="398" y="147" text-anchor="middle">Nicemleme</text><text x="398" y="176" text-anchor="middle">+ kodlama</text>
          <text x="225" y="229" text-anchor="middle" class="sg-small">Zaman ayrıklaşır</text><text x="398" y="229" text-anchor="middle" class="sg-small">Değer sayısallaşır</text>
          <path d="M469 155H539" class="sg-teal" marker-end="url(#sig-arrow-teal)"/>
          <rect x="542" y="105" width="153" height="101" rx="12" fill="#142b4b"/>
          <text x="619" y="145" text-anchor="middle" style="fill:white;font-size:23px;font-weight:600">Sayısal</text><text x="619" y="176" text-anchor="middle" style="fill:white;font-size:23px;font-weight:600">işlemci</text>
          <text x="619" y="246" text-anchor="middle" class="sg-small">PC · PLC · MCU · DSP</text>
          <text x="509" y="99" text-anchor="middle" class="sg-small">x[k]</text><text x="724" y="99" text-anchor="middle" class="sg-small">u[k]</text>
          <path d="M695 155H775" class="sg-teal" marker-end="url(#sig-arrow-teal)"/>
          <rect x="778" y="112" width="128" height="87" rx="9" fill="white" stroke="#92c5b9" stroke-width="2"/><text x="842" y="150" text-anchor="middle">Kod</text><text x="842" y="178" text-anchor="middle">çözücü</text>
          <path d="M906 155H940" class="sg-teal" marker-end="url(#sig-arrow-teal)"/>
          <rect x="943" y="112" width="129" height="87" rx="9" fill="white" stroke="#92c5b9" stroke-width="2"/><text x="1007" y="151" text-anchor="middle" class="sg-label">Tutucu</text><text x="1007" y="178" text-anchor="middle" class="sg-small">Değeri korur</text>
          <text x="922" y="229" text-anchor="middle" class="sg-small">Bir sonraki örneğe kadar aynı komut</text>
          <path d="M1072 155H1221" class="sg-blue" marker-end="url(#sig-arrow-blue)"/><text x="1158" y="129" text-anchor="middle">uₕ(t)</text><text x="1155" y="204" text-anchor="middle" class="sg-small">Analog çıkış</text>
        </svg></figure>
        <div class="sig-wave-grid"><div class="sig-wave-card"><h4>1 · Analog giriş</h4><svg id="sig-mini-input" viewBox="0 0 260 125" role="img" aria-label="Sürekli zamanlı sinüs"></svg><p>İşaretin zamanın her anında bir değeri vardır.</p></div><div class="sig-wave-card"><h4>2 · Örneklenmiş işaret</h4><svg id="sig-mini-sampled" viewBox="0 0 260 125" role="img" aria-label="Eşit zaman aralıklarındaki örnek noktaları"></svg><p>Zaman ayrıklaştı. Örneklerin genliği henüz nicemlenmemiş olabilir.</p></div><div class="sig-wave-card"><h4>3 · Sayısal kodlar</h4><svg id="sig-mini-codes" viewBox="0 0 260 125" role="img" aria-label="Örnek değerlerinin temsili üç bitlik kodları"></svg><p>Nicemlenen değerler ikili kodlarla temsil edilir; işlemci bunları işler.</p></div><div class="sig-wave-card"><h4>4 · Tutulan analog çıkış</h4><svg id="sig-mini-held" viewBox="0 0 260 125" role="img" aria-label="Örnek aralarında sabit tutulan basamaklı analog çıkış"></svg><p>Basamaklı olsa da her anda tanımlıdır: sürekli zamanlı, sıçramalı işaret.</p></div></div>
        <p class="sig-boundary">Mini grafiklerde yalnızca işaret biçimlerini karşılaştırmak için işlemci çıkışı girişe eşit alınmıştır. 3 bitlik kodlar öğretim örneğidir; ders notu bir bit sayısı belirtmez. Tutucu, sıfırıncı dereceden tutma ile gösterilmiştir.</p>
      </article>
      <div class="sig-two" style="margin-top:20px"><article class="sig-card"><h3>Sayısal işlemci: ayrık zaman</h3><p>Kontrolcü, k’ncı örneği alır, referansla karşılaştırır ve o örnek için komut hesaplar. İşlemcinin giriş ve çıkışı sayısal dizilerdir.</p></article><article class="sig-card"><h3>Fiziksel çevrimin bütünü: hibrit</h3><p>Örneğin <a href="#sivi-seviye" data-sig-topic="seviye">sıvı seviye kontrolünde</a> tank seviyesi sürekli zamanda değişir; bilgisayar belirli anlarda hesap yapar. Aynı çevrimde iki işaret türü birlikte bulunur.</p></article></div>
      <div class="sig-insight"><strong>Ders notundaki kullanım</strong><p>Notta, içinde ayrık zamanlı işaret bulunan yapı “ayrık-zaman sistem” başlığıyla ele alınıyor. Fiziksel sistem, ADC, işlemci ve DAC birlikte düşünüldüğünde ise <b>hibrit (melez) yapı</b> oluştuğu özellikle belirtiliyor.</p></div>
      <table class="sig-compare"><caption class="sr-only">İşaret türlerinin zaman ve değer açısından karşılaştırılması</caption><thead><tr><th>Örnek</th><th>Hangi zamanlarda tanımlı?</th><th>Ayırt edici özellik</th></tr></thead><tbody><tr><td>Sinüs · sin(t)</td><td>Her anda</td><td>Sürekli zamanlı ve sürekli</td></tr><tr><td>Darbe / kare dalga</td><td>Her anda</td><td>Sürekli zamanlı, sıçrama noktalarında süreksiz</td></tr><tr><td>Örnekler · sin(kT)</td><td>Yalnız t = kT anlarında</td><td>Ayrık zamanlı dizi</td></tr><tr><td>DAC + tutucu çıkışı</td><td>Her anda</td><td>Örnekler arasında sabit, geçişlerde sıçramalı olabilir</td></tr></tbody></table>
      <p class="sig-source">Kaynak: Prof. Dr. Ayhan Özdemir, <a href="${pdf}#page=11" target="_blank" rel="noopener">Otomatik Kontrol · 1. hafta, s. 11–13</a>. Şekiller ders notundaki sırayla yeniden çizildi. Sürgüler ve karşılaştırmalı grafikler anlatımı desteklemek için eklendi.</p>
    </section>`;
  const $=id=>root.querySelector('#'+id);
  const fmt=(x,n=2)=>(Math.abs(x)<1e-10?0:x).toLocaleString('tr-TR',{minimumFractionDigits:n,maximumFractionDigits:n});
  const point=(x,y)=>`${x.toFixed(2)},${y.toFixed(2)}`;
  const curve=(fn,xmin,xmax,X,Y,n=400)=>Array.from({length:n+1},(_,i)=>{const t=xmin+(xmax-xmin)*i/n;return `${i?'L':'M'}${point(X(t),Y(fn(t)))}`;}).join(' ');
  const circle=(x,y,c,r=6,fill=c)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${c}" stroke-width="2.4"/>`;
  function graphBase(X,Y,xTicks,yTicks,right,bottom,xLabel='t',yLabel='f(t)'){
    return yTicks.map(v=>`<path d="M${X(xTicks[0][0])} ${Y(v)}H${right}" class="sg-grid"/><text x="${X(xTicks[0][0])-13}" y="${Y(v)+6}" text-anchor="end" class="sg-small">${v}</text>`).join('')+
      xTicks.map(([v,label])=>`<path d="M${X(v)} 24V${bottom}" class="sg-grid"/><text x="${X(v)}" y="${bottom+24}" text-anchor="middle" class="sg-small">${label}</text>`).join('')+
      `<path d="M${X(xTicks[0][0])} 20V${bottom} M${X(xTicks[0][0])} ${Y(0)}H${right+6}" class="sg-axis"/><text x="${right+15}" y="${Y(0)-10}" class="sg-small">${xLabel}</text><text x="${X(xTicks[0][0])}" y="16" class="sg-small">${yLabel}</text>`;
  }
  function drawContinuity(){
    const d=Number($('sig-epsilon').value)/100;
    $('sig-epsilon-value').textContent=fmt(d);
    $('sig-epsilon').setAttribute('aria-valuetext',`Yaklaşma uzaklığı ${fmt(d)}`);
    const X=t=>54+470*t/(2*Math.PI),Y=v=>140-87*v;
    const sineTitle='<title id="sig-sine-title">Sinüs eğrisinde pi noktasına sağdan ve soldan yaklaşım</title>';
    $('sig-sine').innerHTML=sineTitle+graphBase(X,Y,[[0,'0'],[Math.PI/2,'π/2'],[Math.PI,'π'],[Math.PI*1.5,'3π/2'],[Math.PI*2,'2π']],[-1,0,1],524,254)+
      `<path d="${curve(Math.sin,0,2*Math.PI,X,Y)}" class="sg-blue"/><path d="M${X(Math.PI)} 26V254" stroke="#9daec6" stroke-dasharray="5 5" fill="none"/>`+
      `<path d="M${X(Math.PI-d)} ${Y(Math.sin(d))}V254 M${X(Math.PI+d)} ${Y(-Math.sin(d))}V254" fill="none" stroke="#9daec6" stroke-dasharray="4 4"/>`+
      circle(X(Math.PI),Y(0),'#14243e',5)+circle(X(Math.PI-d),Y(Math.sin(d)),'#2950db')+circle(X(Math.PI+d),Y(-Math.sin(d)),'#087974')+
      `<text x="${X(Math.PI-d)-13}" y="${Y(Math.sin(d))-13}" text-anchor="end" class="sg-small">soldan →</text><text x="${X(Math.PI+d)+13}" y="${Y(-Math.sin(d))+23}" class="sg-small">← sağdan</text>`;
    $('sig-sine-left').textContent=fmt(Math.sin(d),3);$('sig-sine-right').textContent=fmt(-Math.sin(d),3);
    const XP=t=>54+(t+3)*470/6,YP=v=>214-v*129;
    let pulse='<title id="sig-pulse-title">Sıfır anında birden sıfıra düşen darbe işareti</title>'+graphBase(XP,YP,[[-3,'−3'],[-2,'−2'],[-1,'−1'],[0,'0'],[1,'1'],[2,'2'],[3,'3']],[0,1],524,254);
    for(let k=-3;k<3;k++){
      const v=Math.abs(k%2)===1?1:0;
      pulse+=`<path d="M${XP(k)} ${YP(v)}H${XP(k+1)}" class="sg-amber"/>`+circle(XP(k),YP(v),'#a64a06',4)+circle(XP(k+1),YP(v),'#a64a06',4,'white');
    }
    pulse+=`<path d="M${XP(0)} 26V254" stroke="#9daec6" stroke-dasharray="5 5" fill="none"/>`+circle(XP(3),YP(1),'#a64a06',4)+circle(XP(0),YP(0),'#a64a06',4)+circle(XP(-d),YP(1),'#2950db')+circle(XP(d),YP(0),'#087974')+
      `<text x="${XP(-d)}" y="${YP(1)-17}" text-anchor="middle" class="sg-small">soldan → 1</text><text x="${XP(d)+4}" y="${YP(0)-18}" class="sg-small">0 ← sağdan</text>`;
    $('sig-pulse').innerHTML=pulse;
  }
  let sampleMode='source';
  const modeNotes={
    source:'Mavi eğri örnek aldığımız sürekli zamanlı sinüstür. Yeşil noktalar yalnızca t = kT anlarındaki değerleri gösterir.',
    samples:'Eğriyi kaldırınca elimizde sadece örnekler kalır. Noktaları birleştirmiyoruz: ayrık zamanlı dizi, örnekler arasındaki değerleri tanımlamaz.',
    alternatives:'Üç farklı eğri, aynı örnek noktalarından geçiyor. Bu yüzden örnekler tek başına aradaki işareti belirlemez; yeniden oluşturmak için ek varsayımlar gerekir.',
    hold:'Tutucu, her örnek değerini bir sonraki örneğe kadar sabit tutar. Oluşan basamaklı eğri artık sürekli zamanda tanımlıdır; kaynak sinüsün aynısı değildir.'
  };
  function drawSampling(){
    const T=Number($('sig-period').value),end=2*Math.PI;
    const X=t=>64+994*t/end,Y=v=>158-v*80;
    const samples=Array.from({length:Math.floor(end/T+1e-9)+1},(_,k)=>({k,t:k*T,v:Math.sin(k*T)}));
    const ticks=samples.filter(s=>samples.length<=17||s.k%2===0).map(s=>[s.t,s.k===0?'0':s.k===1?'T':s.k+'T']);
    let g='<title id="sig-sampling-title">Sinüsün eşit aralıklarla örneklenmesi</title><desc id="sig-sampling-desc">'+modeNotes[sampleMode]+'</desc>';
    g+=graphBase(X,Y,ticks,[-1,0,1],1058,283,'t','f(t), f[k]');
    if(sampleMode==='source'||sampleMode==='alternatives')g+=`<path data-source-curve d="${curve(Math.sin,0,end,X,Y)}" class="sg-blue" opacity=".7"/>`;
    if(sampleMode==='alternatives'){
      // sin(pi*t/T) vanishes at every sample time, so both alternatives share all samples.
      for(const a of [-.34,.34])g+=`<path data-alternative="${a}" d="${curve(t=>Math.sin(t)+a*Math.sin(Math.PI*t/T),0,end,X,Y,900)}" fill="none" stroke="${a<0?'#a64a06':'#8867b1'}" stroke-width="2.5" stroke-dasharray="7 4"/>`;
    }
    if(sampleMode==='hold'){
      let d=`M${point(X(0),Y(samples[0].v))}`;
      samples.forEach((s,i)=>{d+=`H${X(Math.min(end,(i+1)*T)).toFixed(2)}`;if(samples[i+1])d+=`V${Y(samples[i+1].v).toFixed(2)}`;});
      g+=`<path data-hold-curve d="${d}" class="sg-amber"/>`;
    }
    samples.forEach(s=>{g+=`<g data-sample-index="${s.k}" data-time="${s.t}" data-value="${s.v}"><path d="M${X(s.t)} ${Y(0)}V${Y(s.v)}" stroke="#087974" stroke-width="2" opacity=".65"/>${circle(X(s.t),Y(s.v),'#087974',5.5)}</g>`;});
    if(samples.length>1){g+=`<path d="M${X(0)} 322H${X(T)} M${X(0)} 316V328 M${X(T)} 316V328" fill="none" stroke="#2950db" stroke-width="2"/><text x="${X(T/2)}" y="316" text-anchor="middle" class="sg-small">T</text>`;}
    $('sig-sampling').innerHTML=g;
    $('sig-period-value').textContent=fmt(T,1)+' s';$('sig-period').setAttribute('aria-valuetext',`${fmt(T,1)} saniye`);
    $('sig-sample-T').textContent=fmt(T,1)+' s';$('sig-sample-frequency').textContent=fmt(1/T,2)+' örnek/s';$('sig-sample-count').textContent=samples.length+' nokta';
    $('sig-mode-note').textContent=modeNotes[sampleMode];
  }
  function drawMiniatures(){
    const X=t=>16+t/(2*Math.PI)*228,Y=v=>61-v*40;
    const axis='<path d="M16 12V112 M16 61H250" class="sg-axis"/>';
    const samples=Array.from({length:8},(_,k)=>({t:k*Math.PI/4,v:Math.sin(k*Math.PI/4)}));
    $('sig-mini-input').innerHTML=axis+`<path d="${curve(Math.sin,0,Math.PI*2,X,Y,160)}" class="sg-blue"/>`;
    $('sig-mini-sampled').innerHTML=axis+samples.map(s=>`<path d="M${X(s.t)} 61V${Y(s.v)}" class="sg-teal"/>`+circle(X(s.t),Y(s.v),'#087974',4)).join('');
    const codes=samples.map(s=>Math.round((s.v+1)/2*7));
    $('sig-mini-codes').innerHTML=codes.map((code,k)=>{const x=10+(k%4)*62,y=8+Math.floor(k/4)*57;return `<rect x="${x}" y="${y}" width="56" height="39" rx="6" fill="#142b4b"/><text x="${x+28}" y="${y+26}" text-anchor="middle" style="fill:#adeddc;font-family:monospace;font-size:22px">${code.toString(2).padStart(3,'0')}</text><text x="${x+28}" y="${y+52}" text-anchor="middle" class="sg-small" style="font-size:11px">k = ${k}</text>`;}).join('');
    let held='';codes.forEach((q,k)=>{const y=Y(q/7*2-1);held+=`${k?'V'+y:'M'+point(X(0),y)}H${X((k+1)*Math.PI/4)}`;});
    $('sig-mini-held').innerHTML=axis+`<path d="${held}" class="sg-amber"/>`;
  }
  $('sig-epsilon').addEventListener('input',drawContinuity);
  $('sig-near').addEventListener('click',()=>{$('sig-epsilon').value=Number($('sig-epsilon').value)<=5?'70':'5';drawContinuity();$('sig-near').textContent=Number($('sig-epsilon').value)<=5?'Uzaklığı geri al':'Noktaya yaklaş';});
  $('sig-epsilon').addEventListener('input',()=>{$('sig-near').textContent=Number($('sig-epsilon').value)<=5?'Uzaklığı geri al':'Noktaya yaklaş';});
  $('sig-period').addEventListener('input',drawSampling);
  root.querySelectorAll('[data-sig-mode]').forEach(button=>button.addEventListener('click',()=>{sampleMode=button.dataset.sigMode;root.querySelectorAll('[data-sig-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));drawSampling();}));
  root.querySelectorAll('[data-sig-topic]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelector(`button[data-topic="${a.dataset.sigTopic}"]`).click();const target=document.getElementById(a.hash.slice(1));history.replaceState(null,'',a.hash);if(target)target.scrollIntoView();else window.scrollTo(0,0);}));
  drawContinuity();drawSampling();drawMiniatures();
  return {};
};
