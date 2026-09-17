# Otomatik Kontrol Ders Notları

Otomatik kontrol dersini tahtada anlatmak için hazırlanan Türkçe, etkileşimli HTML sunumu ve kaynak PDF’ler.

## Açılış

Depoyu bilgisayarınıza indirin ve `index.html` dosyasını güncel bir tarayıcıda açın. Ana sayfadaki **1. haftayı aç** bağlantısı, hazırlanan sunumu `hafta-1.html#temel-akis` adresinde başlatır. Sunumun sol üstündeki **← OTOMATİK KONTROL** bağlantısı ana sayfaya döner.

Kurulum, derleme, Python veya veritabanı gerekmez. Dosyaları ve klasörleri birlikte tutun.

## Domain üzerinde kullanım

`index.html`, `hafta-1.html`, bütün CSS/JavaScript dosyaları, `assets` ve `2024 OTOMATİK_KONTROL` klasörünü aynı dizine yükleyin. PHP destekli bir sunucuda da doğrudan çalışır; PHP kodu gerekmez. Animasyonlar ve öğretim modellerinin hesapları tarayıcıda JavaScript ile çalışır.

`.git` ve `tmp` klasörlerini sunucuya yüklemek gerekmez.

- Ana sayfa `index.html`, 1. hafta sunumu `hafta-1.html` dosyasıdır.
- Göreli bağlantılar sayesinde dosyalar domain kökünde veya bir alt klasörde çalışabilir.
- Klasör adlarının Türkçe karakterlerini ve dosya adlarının büyük/küçük harflerini koruyun.
- Eski `index.html#sac-levha`, `index.html#isaretler` ve diğer ders bölümü bağlantıları, `hafta-1.html` içindeki aynı bölüme yönlendirilir.
- Ana sayfadaki **Kaynaklar**, 1. hafta PDF’sini, içindekileri ve kaynakçayı açar. Diğer haftalar için henüz sunum bağlantısı eklenmemiştir.

## Sunumdaki konular

| Bölüm | İçerik |
| --- | --- |
| Temel akış | Ölçme, karşılaştırma, değerlendirme ve kontrol işareti |
| Kapalı çevrim | Negatif geri besleme ve blok diyagramı |
| Sac levha | Hidrolik merdanelerle kalınlık kontrolü; referans, ADC ve DAC |
| Sıvı seviye | Tank, giriş/çıkış valfleri ve seviye kontrolü |
| Analog fırın | Op-amp’lı kontrolcü, güç katı ve sinyal düzenleyici |
| Bozucu | Yürüyen merdivene binen ve inen yolcunun hız üzerindeki etkisi |
| Kavramlar | Geri besleme, açık/kapalı çevrim, kararlılık, lineerlik ve RLC örnekleri |
| İşaretler | Süreklilik, örnekleme, ADC–işlemci–DAC zinciri ve hibrit sistemler |

İçerik, 1. hafta PDF’sinin işlenen konularını kapsar; diğer haftaların kaynak PDF’leri de depoda bulunur. İşaretler bölümü, 1. hafta notunun 11–13. sayfalarını izler.

## Kullanım

- Üst menüden konuyu seçin. Bölümler tek sayfa içinde açılır.
- **Tam ekran** düğmesi veya **F** tuşu sunumu büyütür.
- Animasyonlarda **Boşluk** veya **Duraklat / Sürdür** düğmesini kullanın.
- Referans, yük, giriş/çıkış ve örnekleme sürgülerini değiştirerek sistem davranışını inceleyin.
- Sac levha, sıvı seviye ve analog fırın bölümlerinde özgün şekil animasyonun üstünde küçük ve ortalanmış olarak gösterilir. **Görseli büyüt** bağlantısı özgün resmi açar.

Ayrıntılı kullanım, model denklemleri ve öğretim için seçilen parametreler: [SUNUM.md](SUNUM.md).

## Dosya düzeni

- `index.html`, `home.css`: haftalık ders ana sayfası.
- `hafta-1.html`: 1. hafta sunumu ve konu seçimi.
- `rolling-mill.*`, `liquid-tank.*`, `analog-oven.*`, `escalator.*`: SVG/JavaScript animasyonları ve CSS stilleri.
- `signals.*`: işaretler konusu ve etkileşimli grafikler.
- `lesson-notes.css`: kavram sayfalarının düzeni.
- `assets/`: ders notlarından alınan şekiller.
- `2024 OTOMATİK_KONTROL/`: kaynak ders PDF’leri.

## Kaynak

Prof. Dr. Ayhan Özdemir, **Otomatik Kontrol** ders notları. Kaynak şekiller ve PDF’ler kendi yazarına aittir. Yeniden çizilen şemalar ve etkileşimli örnekler ders anlatımını destekler. Simülasyon parametreleri, belirtilen yerlerde öğretim için seçilmiş temsili değerlerdir.
