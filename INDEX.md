# AI Kiosk Project — Index

## Amaç
Otel/hastane/kurumsal danışma işini hafifletmek; kiosk + 3D model + AI ile hızlı bilgi.

## Çekirdek Akış
- STT (konuşmayı metne çevirme)
- AI işlem katmanı
- TTS (cevabı yazı + ses)

## Admin Panel
- Test: ping, STT, TTS
- AI: şirket adı, “Kaydet/Öğren”, otomatik şirket bilgileri, Detaylar (Q&A, düzenlenebilir)
- Ekler: versiyonlama, test/canlı ayrımı, loglama, analitik, CSV/JSON içe–dışa aktarma, değişiklik günlüğü, planlı güncelleme

## Olası Ekler
- Kullanıcı takibi (kamera/göz)
- Otomatik veri güncelleme (web site değişiklik algılama)
- Çoklu dil (TR+EN)
- Çevrimdışı mod (cache)
- Log arşivi

## Ses + Görsel
- Wake word veya tuş
- Gürültü bastırma
- Kurum TTS ses profili
- Metahuman dudak senkronizasyonu
- Animasyon tetikleri (dinleme, düşünme, yanıtlama)

## Bilgi Tabanı
- Şema: Şirket → Şube → Hizmet → SSS → Cevap
- Sürümleme, semantik arama, insan onayı

## Performans/Test Hedefleri
- STT < 400 ms
- TTS < 700 ms
- Toplam yanıt < 2.5 s
- Ek testler: mikrofon seviyesi, STT doğruluk, TTS dinleme, AI gecikme, ağ hızı/ping

## Klasör Yapısı
admin_panel/ (frontend, backend)
ai_core/ (stt, tts, orchestrator, knowledge)
ue_integration/ (blueprints, c++, assets)
tests/ (unit, integration)
docs/
scripts/

## Notlar
- UE 5.6.1 (Türkçe UI), Metahuman mevcut
- Windows 11, Python 3.13.7/3.11
- Donanım: Asus ROG Strix G18 (RTX 4080, 64 GB RAM)

