# Otomatik Kontrol — 1. hafta

`index.html` dosyasını Chrome veya Edge ile açın. İnternet bağlantısı gerekmez. `rolling-mill.css`, `rolling-mill.js`, `liquid-tank.css`, `liquid-tank.js`, `analog-oven.css` ve `analog-oven.js` dosyalarını HTML ile aynı klasörde tutun.
Kaynak görseller `assets` klasöründedir; sunumu taşırken bu klasörü de birlikte taşıyın.
Sabit kavram sayfalarının görünümü için `lesson-notes.css` dosyasını da aynı klasörde tutun.
Yürüyen merdiven animasyonu için `escalator.css` ve `escalator.js` dosyaları gereklidir.
İşaretler bölümü için `signals.css` ve `signals.js` dosyaları da aynı klasörde bulunmalıdır. Sunumun tamamı tarayıcıda çalışır; Python veya PHP kodu gerektirmez.

## Tek sayfada kullanım

- Akış, sayfa açılır açılmaz otomatik başlar ve döngüyü tekrarlar.
- **Temel akış / Kapalı çevrim / Sac levha / Sıvı seviye / Analog fırın / Bozucu / Kavramlar / İşaretler** seçimi, aynı HTML içinde konuyu değiştirir. Konu belirtilmeden açılışta yürüyen merdiven animasyonu görünür. Önceki bölümlerin bağlantıları da doğrudan açılabilir.
- Sac levha, sıvı seviye ve analog fırın bölümlerinde gönderilen özgün şekil üstte, hareketli animasyon hemen altında yer alır. Aynı sayfayı aşağı kaydırarak animasyona geçin; **Görseli büyüt** bağlantısı kaynak görseli ayrı sekmede açar.
- Ders notundaki akış, oda sıcaklığı, otomobil hızı ve insanla su doldurma örnekleri aynı sayfadan seçilir.
- Hareketli işaret, ölçme, karşılaştırma, değerlendirme, kontrol işareti ve sistem yolunu izler.
- **Duraklat / Sürdür** düğmesi veya **Boşluk** akışı durdurur ve devam ettirir.
- **Tam ekran** düğmesi veya **F** tahtada gösterim için tam ekranı açar. F11 de kullanılabilir.
- Oda ve araç örneklerinde bozucu etki uygulanabilir. Su örneğinde bardak yeniden boşaltılabilir.
- Kapalı çevrim şeması referans, artı/eksi karşılaştırma noktası, hata, değerlendirme, güç kuvvetlendirici K, sistem ve ölçme yolunu gösterir. Kesikli noktalı çerçeve karşılaştırma ve değerlendirmeyi kapsar.
- Kapalı çevrimde **Fırın örneğini göster**, aynı diyagramda 180 °C referans için temsili sıcaklık ve hata değerlerini gösterir.

Örnek sayıları ve değişimler öğretim amacıyla temsilidir. Gerçek bir cihazın fiziksel simülasyonu değildir.

## Sac levha animasyonu

- Merdaneler ve rulolar döner, sac ilerler; hidrolik silindir merdane aralığını değiştirir.
- Sahnedeki ADC, kontrolcü/PLC, DAC, güç K ve referans kutuları canlı değerleri gösterir. Referans kontrolcünün artı girişine, ADC çıkışı eksi girişine bağlanır. Hareketli işaretler ölçüm ve komut yollarını izler.
- **Referans kalınlık** sürgüsü ile hedefi 1,2–2,4 mm arasında değiştirin.
- **Kalın sac gönder** ile giriş kalınlığını 2,80 mm’den 3,25 mm’ye çıkarın. Kontrolcü daha fazla basınç uygulayarak hatayı küçültür.
- **Otomatik kontrol açık** düğmesini kapatıp basıncı elle ayarlayabilirsiniz. Basınç artınca sac incelir. Aynı düğmeyle otomatiğe dönün.
- Son 20 saniyenin grafiği ölçümü ve referansı gösterir. Hedefin ±0,04 mm çevresinde “Hedefte” işareti yanar.
- Alt zincir kendiliğinden ilerleyerek ölçme → ADC → karşılaştırma → kontrolcü → DAC → güç kuvvetlendirici → hidrolik silindir sırasını açıklar. Üretim hattı bu açıklamalar boyunca çalışır.
- Sayısal örnek: 0–4 mm ölçüm aralığı, 0–5 V ölçüm işareti ve 12 bit ADC. Kontrolcü ters yönlü PI kuralı kullanır: negatif kalınlık hatası basınç komutunu artırır. Bunlar ders için seçilmiş parametrelerdir; kaynak PDF belirli bir kontrol kuralı veya çözünürlük vermemektedir.
- Model basınç ve kalınlık tepkisini yumuşatır, ölçüme 0,7 saniyelik taşıma gecikmesi ekler. Sacın gerçek plastik deformasyonu, enerji ve malzeme korunumu çözülmez; görsel boyutlar büyütülmüştür.

## Sıvı seviye animasyonu

- PDF’nin 3. sayfasındaki düzenek temel alınmıştır. Tank seviyesi, giriş akışı, çıkış akışı, algılayıcı ve sinyal yolları hareketlidir.
- **Referans seviye** sürgüsü 20–80 cm arasında ayarlanır. Kesikli sarı çizgi hedefi gösterir.
- **Çıkışı artır** çıkış vanasını daha fazla açar. Seviye düştüğünde otomatik kontrol giriş valfini açarak dengeyi yeniden kurar.
- Otomatik kontrol kapatılarak giriş valfi elle ayarlanabilir. Tam dolu tankta giriş çıkışı aşarsa fazla su taşma olarak gösterilir.
- Görsel üzerinde referans, bilgisayar/kontrolcü, işaret düzenleyici, ADC, DAC ve güç K kutuları canlı değerler taşır. Referans artı girişe, ADC ölçümü eksi girişe bağlanır.
- Alt anlatım zinciri otomatik olarak sekiz aşamayı açıklar. Eşit giriş ve çıkış debilerinde seviye sabit kalırken su akışı devam eder.
- Öğretim varsayımları: 100 cm yüksekliğinde 80 L tank; 0–100 cm → 0–5 V; 12 bit ADC; 0–5 V DAC; açıklığı ayarlanabilir oransal solenoid valf; PI kontrolcü. PDF bu sayısal parametreleri veya kontrol kuralını belirtmez.
- Model: litre cinsinden hacim değişimi = giriş debisi − çıkış debisi − taşma debisi. Tank kesiti sabittir (0,8 L/cm); çıkış debisi seviyenin kareköküyle değişir. Valf ve ölçüm gecikmeleri temsili birinci dereceden tepkilerle gösterilir.

## Analog fırın animasyonu

- PDF’nin 4. sayfasındaki analog sıcaklık kontrolü temel alınmıştır. Özgün şekil `assets/analog-firin-sema.png` dosyasında korunur; animasyonun üstünde gösterilir. Bölüm bağlantısı: `index.html#analog-firin`.
- **Referans sıcaklık** 80–230 °C arasında değiştirilebilir. **Kapağı aç** ısı kaybını artırır; kontrolcü daha yüksek ısıtıcı gücüyle sıcaklığı yeniden referansa getirir.
- Referans, hata ve kontrol işaretleri sürekli gerilimlerdir. Algılayıcı, yükseltici ve RC filtre negatif geri besleme yolundadır. Bu analog örnekte ADC ve DAC kullanılmaz.
- **Gürültü ekle** ve **RC filtre açık / devre dışı** düğmeleri, filtre öncesindeki ve geri beslemeye verilen gerilimleri alt grafikte karşılaştırmayı sağlar. Son 4 saniye gösterilir; düşey ölçek otomatik değişir.
- Analog işlemci için örnek PI devresi çizilmiştir: U₁’in seri Rₚ–Cᵢ geri beslemesi, tersleyen oransal ve integral etkiyi sağlar; eşit dirençli U₂ işareti yeniden çevirir. Kₚ = Rₚ/Rᵢ, Kᵢ = 1/(RᵢCᵢ). Rᵢ = 100 kΩ, Cᵢ = 27 µF, başlangıçta Rₚ = 240 kΩ. **Direnç ayarı** ile Rₚ ve Kₚ birlikte değişir.
- U₃, terslemeyen yükselticidir: 470 kΩ geri besleme ve 30 kΩ alt dirençle kazanç 1 + 470/30 = 50/3 olur. Temsili algılayıcı ölçeği 1 mV/°C olduğundan 0–300 °C, 0–5 V aralığına karşılık gelir. RC filtre 10 kΩ ve 47 µF: zaman sabiti 0,47 s; kesim frekansı yaklaşık 0,34 Hz.
- Model ısıtıcı komutunu 0–5 V ile sınırlar ve doyumda integratörün birikmesini sınırlandırır. Besleme uçları, sınırlama devreleri ve filtreyi anahtarlamanın ayrıntıları çizilmemiştir; şekil işlevsel öğretim devresidir. PDF belirli bir PI devresi veya bu parça değerlerini vermez.
- Isıl tepki öğretim için hızlandırılmıştır: dT/dt = [60u − k(T−25)]/12; kapak kapalıyken k = 1, açıkken k = 1,4. Güç katı ve algılayıcı gecikmeleri temsili birinci dereceden modellerdir. Tarayıcı, sürekli zaman davranışını küçük zaman adımlarıyla canlandırır.
- Devre ilkeleri: [TI — Op-amp integratörü](https://www.ti.com/tool/CIRCUIT060027), [TI — Sinyal düzenleme: yükseltme, ölçekleme ve filtreleme](https://www.ti.com/lit/pdf/tidu583).

## Bozucu etki — yürüyen merdiven

- **Bozucu** sekmesi veya `index.html#bozucu-merdiven` bağlantısı, yukarı çıkan yürüyen merdiven örneğini açar. Referans hız senaryo boyunca **0,50 m/s** olarak sabittir.
- Bir kişi alt kattan yürüyerek gelir, merdivene biner, hareketli basamaklarla yukarı taşınır ve üst katta iner. Basamak ve yolcu hareketi model hızına bağlıdır. Otomatik senaryo ilk binişi birkaç saniye sonra başlatır ve döngüyü tekrarlar.
- Biniş, motora karşı koyan ek yük torkunu artırır. Hız kısa süre düşer; sensörden gelen pozitif hata üzerine işlemci motor torkunu artırır. Kişi üzerindeyken hız toparlanır, fakat yükü karşılamak için motor torku yüksek kalır.
- İniş, ek yükü kaldırır. Önceki motor torku fazla geldiği için hız kısa süre artar; negatif hata oluşunca işlemci torku azaltır ve başlangıç dengesine döner.
- **Bir kişi bindir**, **Otomatik senaryo açık / kapalı**, **Hız kontrolü açık / kapalı** ve **Baştan oynat** düğmeleri vardır. Yolcu kütlesi biniş öncesinde 50–120 kg arasında ayarlanabilir. Kontrol kapatıldığında son tork komutu sabit tutulur; tekrar açıldığında düzeltme devam eder. Ağır yolcuda kontrolsüz model durabilir; kontrolü açarak veya baştan oynatarak devam edilebilir.
- Hız ve tork grafikleri son 40 saniyeyi gösterir; biniş ve iniş zamanları işaretlenir. Beş aşamalı açıklama, sahnenin gerçek olaylarına bağlıdır. Alt blok diyagramında bozucu yük doğrudan motor–merdiven sistemine girer; sensör ölçümü negatif geri beslemeye döner.
- Model: çıkış miline indirgenmiş `J·dω/dt = T_motor − bω − T_yolcu`, `v = rω`. J = 8 kg·m², b = 8 N·m·s/rad, r = 0,1 m; temsili eğim atan(224/535). Ek yük `m·g·sin(θ)·r` olarak alınır. Başlangıç torku 40 N·m; 80 kg yolcunun ek yük torku yaklaşık 30,3 N·m’dir.
- PI işlemci yalnızca referans ve ölçülen hız hatasını kullanır; yolcunun kütlesini veya biniş olayını kontrol hesabına doğrudan almaz. Örnekleme 20 ms, Kp = 400 N·m/(m/s), Ki = 350 N·m/m; komut 0–150 N·m ile sınırlıdır ve doyumda integral birikmesi sınırlandırılır. Sürücü ve hız ölçümü gecikmeleri sırasıyla 0,18 s ve 0,08 s zaman sabitli modellerdir.
- Değerler öğretim içindir; bu, belirli bir gerçek yürüyen merdivenin tasarım veya performans modeli değildir. Mekanik boşluklar, elektriksel motor ayrıntıları ve koruma sistemleri modellenmez. Yük bozucusu ve hız geri beslemesi ilkesi için: [MathWorks — DC Motor Control](https://www.mathworks.com/help/control/ug/dc-motor-control.html).

## Kavramlar — sabit ders notları

Üst menüdeki **Kavramlar** bölümünde dokuz başlık bulunur. Özgün görseller gönderildiği sırayla gösterilir. Bu bölümde animasyon ve otomatik ilerleme yoktur. Başlık bağlantıları ilgili nota kaydırır; görsellerin **Görseli büyüt** bağlantısı da kullanılabilir.

1. Geri besleme — `#not-geri-besleme`
2. Açık çevrim kontrol — `#not-acik-cevrim`
3. Açık çevrim sıvı tankı seviye kontrolü — `#not-acik-tank`
4. Kapalı çevrim kontrol — `#not-kapali-cevrim`
5. Giriş–çıkış açısından kararlılık — `#not-kararlilik`
6. Zamanla değişmeyen kontrol sistemi — `#not-zamanla-degismeyen`
7. Lineer ve lineer olmayan kontrol sistemleri — `#not-lineer-sistemler`
8. Örnek 1 · Lineer RLC devresi — `#not-rlc-ornegi`
9. Örnek 2 · Lineer olmayan RLC devresi — `#not-rlc-lineer-olmayan`

Yedinci başlık tek bir karşılaştırma sayfasıdır: PDF’nin 7–8. sayfalarından gönderilen lineer sistem görseli ile 8. sayfadaki lineer olmayan sistem görseli aynı bölümde yer alır. Geniş ekranda yan yana, dar ekranda alt alta gösterilir. İki kaynak görsel değiştirilmeden korunmuştur.

Sekizinci başlık, PDF’nin 8–9. sayfalarındaki sabit R, L, C değerli devre örneğini ve çözümünü içerir. Uzun görsel, denklemlerin okunabilmesi için sayfada geniş gösterilir; çözüm aşağı kaydırılarak takip edilir. Kaynak PDF bağlantısı da eklenmiştir.

Dokuzuncu başlıkta PDF’nin 10–11. sayfalarındaki varaktörlü, gerilime bağlı kapasite içeren lineer olmayan RLC örneği, tüm çözümü ve durum uzay modeliyle yer alır. Gönderilen uzun görsel değiştirilmeden korunur; kaynak PDF’ye doğrudan bağlantı bulunur.

Bölümün genel bağlantısı `index.html#ders-notlari` şeklindedir. Görsellerin içeriği değiştirilmeden `assets` klasörüne kopyalanmıştır. Bu bölümde Boşluk tuşu sayfayı kaydırır; **F** ve **Tam ekran** sunum için kullanılabilir.

## İşaretler — PDF s. 11–13

- **İşaretler** sekmesi veya `index.html#isaretler` bağlantısı beş başlığı tek sayfada açar. Üstteki bölüm bağlantıları sayfayı ilgili başlığa kaydırır; otomatik ilerleme yoktur. Şekiller SVG olarak yeniden çizilmiştir.
- Sıra: işaret tanımı ve f(t) gösterimi → sürekli / süreksiz işaret → ayrık zaman ve örnekleme → sürekli zamanlı motor kontrolü → ADC, sayısal işlemci, DAC ve hibrit yapı. Sayfa 11’in başındaki önceki RLC çözümüne Kavramlar bölümünden bağlantı verilir.
- **Yaklaşma uzaklığı δ** sürgüsü sinüste π noktasının, darbede 0 noktasının sağından ve solundan yaklaşımı gösterir. **Noktaya yaklaş** uzaklığı 0,05’e getirir; tekrar basıldığında başlangıca döner. Görünen sayılar sonlu uzaklıktaki değerlerdir; alt denklemler limitleri verir. Süreklilik için iki limitin fonksiyonun o noktadaki değerine de eşit olması gerektiği açıklanır.
- Darbe çiziminde f(0) = 0 seçilmiştir. Açık uçlar dışlanan, dolu uçlar dahil edilen değerleri gösterir. Sıçramalı işaretlerin de sürekli zamanda tanımlı olabileceği vurgulanır.
- **Örnekleme aralığı T** 0,2–1,6 s arasında değişir. Örnekler t = kT ve f[k] = sin(kT) ile hesaplanır; sinüsün açısal frekansı 1 rad/s’dir. Grafikte 0–2π s aralığı gösterilir. Görünümler: kaynak sinüs, yalnız örnekler, aynı örneklerden geçen olası eğriler, tutucu çıkışı.
- Olası eğriler sin(t) ± 0,34 sin(πt/T) şeklindedir; ek terim her örnek anında sıfır olur. Bu gösterim, ek kısıt olmadan örnekler arasındaki işaretin tek olarak belirlenemeyeceğini açıklar. Yeniden oluşturma / örnekleme teoremi işlenmez.
- Tutucu görünümü örnekleri sonraki örneğe kadar sabit tutar. Düşey çubuklar fiziksel darbeler değildir. Ayrık zamanlı dizinin örnek aralarında tanımsız olması ile DAC tutucusunun her anda tanımlı, sıçramalı çıkışı ayrılır.
- Motor–yük çevrimi PDF s. 13’teki darbe referansı, değerlendirme, güç K, Rₐ–Lₐ motor modeli ve darbe üreteci sırasını korur. Dalga şekilleri işaret türlerini gösterir; motorun sayısal çözümü değildir.
- ADC şemasında örnekleme ile nicemleme / kodlama ayrılır; DAC’ta kod çözücü ve tutucu gösterilir. Mini grafikler için 8 örnek/periyot, ±1 giriş aralığı ve 3 bitlik temsili kodlama kullanılır. Kod q = round(7(x+1)/2), geri dönüştürülen değer 2q/7−1’dir. İşlemci mini örnekte birim geçiş olarak alınır. Bunlar PDF’de belirtilmeyen öğretim seçimleridir.
- Bölümde Boşluk sayfayı kaydırır; **F / Tam ekran** sunum için kullanılabilir. Dar ekranda geniş blok diyagramları kendi çerçeveleri içinde yatay kaydırılır.

Kapsam: 1. hafta PDF’sindeki kontrol tanımı, ilk akış diyagramı, kapalı çevrim kontrol blok diyagramı, sac levha kalınlık kontrolü, sıvı seviye kontrolü, analog sıcaklık kontrolü, temel kavramlar ve RLC örnekleri; ayrıca bozucu etki animasyonu ve s. 11–13 işaretler konusu.

Kaynak bağlantısının çalışması için `index.html` ile `2024 OTOMATİK_KONTROL` klasörünü aynı dizinde tutun.
