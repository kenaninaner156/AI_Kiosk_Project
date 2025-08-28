\# AI Kiosk Project



Kiosk tabanlı danışma asistanı. 3D MetaHuman, STT→LLM→TTS akışı ve içerik entegrasyonu.



\## İçindekiler

\# AI Kiosk Project



Kiosk tabanlı danışma asistanı. 3D MetaHuman, STT→LLM→TTS akışı ve içerik entegrasyonu.



\## İçindekiler



\* \[Mimari Özeti](#mimari-ozeti)

\* \[Sistem Gereksinimleri](#sistem-gereksinimleri)

\* \[Hızlı Başlangıç (Windows 11)](#hizli-baslangic-windows-11)

\* \[Admin Panel (Backend)](#admin-panel-backend)

\* \[Admin Panel (Frontend)](#admin-panel-frontend)

\* \[AI Core](#ai-core)

\* \[UE Entegrasyonu](#ue-entegrasyonu)

\* \[Testler](#testler)

\* \[Komut Kılavuzu](#komut-kilavuzu)

\* \[Yapılandırma / Çevre Değişkenleri](#yapilandirma--cevre-degiskenleri)

\* \[Performans ve Bellek Hedefleri](#performans-ve-bellek-hedefleri)

\* \[Gizlilik ve Dayanıklılık](#gizlilik-ve-dayaniklilik)

\* \[Branch/Versiyonlama](#branchversiyonlama)

\* \[Yol Haritası](#yol-haritasi)



---



\## Mimari Özeti



\* \*\*Vision\*\*: Kamera girişi (yerel, yüz tanıma yok)

\* \*\*Audio I/O\*\*: VAD, STT, TTS

\* \*\*LLM Orchestrator\*\*: niyet, fonksiyon çağrıları

\* \*\*Dialog Policy\*\*: durum makinesi

\* \*\*3D Sync\*\*: viseme/phoneme, animasyon tetikleri

\* \*\*Content APIs\*\*: otel/şehir, offline önbellek



Klasörler:



```

admin\_panel/        # frontend + backend

ai\_core/            # stt, tts, orchestrator, knowledge

ue\_integration/     # UE 5.6.1, Blueprint/C++ köprüleri

tests/              # unit + integration

docs/               # teknik notlar

scripts/            # otomasyon komut dosyaları

```



\## Sistem Gereksinimleri



\* Windows 11

\* Python 3.13.7 (ana) ve 3.11 (yedek venv)

\* Node.js 18+

\* Unreal Engine 5.6.1 (TR arayüz), MetaHuman

\* GPU: RTX 4080, RAM: 64 GB



\## Hızlı Başlangıç (Windows 11)



PowerShell’i \*\*repo kökünde\*\* aç.



```powershell

\# 1) Ortam kontrolü

py --version

node -v

npm -v



\# 2) Admin panel backend

cd .\\admin\_panel\\backend

py -3.13 -m venv .venv

.\\.venv\\Scripts\\Activate.ps1

pip install --upgrade pip

pip install -r requirements.txt

$env:APP\_ENV="dev"

uvicorn app:app --host 127.0.0.1 --port 7070

```



Ayrı bir terminal:



```powershell

\# 3) Admin panel frontend

cd .\\admin\_panel\\frontend

npm install

npm run dev

\# Varsayılan: http://127.0.0.1:5173

```



Ayrı bir terminal:



```powershell

\# 4) AI Core servisleri (örnek)

cd .\\ai\_core

py -3.13 -m venv .venv

.\\.venv\\Scripts\\Activate.ps1

pip install -r requirements.txt

python run\_local.py

```



\## Admin Panel (Backend)



\* API: `uvicorn app:app --host 127.0.0.1 --port 7070`

\* Sağlık kontrolü: `GET /healthz` → `{"status":"ok"}` beklenir

\* Test uçları: `/test/ping`, `/test/stt`, `/test/tts`



\## Admin Panel (Frontend)



\* Geliştirme: `npm run dev`

\* Çevresel değişkenler: `.env` içinde `VITE\_API\_BASE=http://127.0.0.1:7070`



\## AI Core



\* Modüller: `stt/`, `tts/`, `orchestrator/`, `knowledge/`

\* Çalıştırma: `python run\_local.py`

\* Not: STT/TTS sağlayıcı anahtarlarını `.env` dosyasına koyun.



\## UE Entegrasyonu



\* Proje: `ue\_integration/`

\* Menü yolu (TR): \*\*Düzenle → Proje Ayarları → Harici Bağlantılar\*\* bölümünden HTTP/WebSocket ayarlarını yapın.

\* Blueprint köprüleri: `ue\_integration/blueprints/` içinde örnek düğümler.

\* Dudak senk.: phoneme/viseme akışı için `3D Sync` WebSocket ucu.



\## Testler



```powershell

\# Unit

pytest -q

\# Entegrasyon

pytest -q -m integration

```



Beklenenler:



\* `GET /healthz` 200 döner

\* STT < 400 ms, TTS < 700 ms, Toplam < 2.5 s (ölçüm sayacı loglarda)



\## Komut Kılavuzu



```powershell

\# Git

git status

git remote -v

git pull --rebase

git add .; git commit -m "update"; git push



\# Temizlik

pip cache purge

npm cache verify

```



\## Yapılandırma / Çevre Değişkenleri



`.env` örneği:



```

APP\_ENV=dev

API\_BASE=http://127.0.0.1:7070

STT\_PROVIDER=openai

TTS\_PROVIDER=openai

OPENAI\_API\_KEY=xxxxx

CACHE\_DIR=.cache

```



\## Performans ve Bellek Hedefleri



\* Vision/Audio ≤ 4 GB

\* STT/TTS ≤ 2 GB

\* LLM ≤ 8 GB

\* 3D Sync/Content ≤ 2 GB

\* Toplam ≤ 32 GB



Gecikme hedefleri:



\* STT < 400 ms

\* TTS < 700 ms

\* Yanıt < 2.5 s



\## Gizlilik ve Dayanıklılık



\* Kamera verisi yerel. \*\*Yüz tanıma yok\*\*.

\* İnternet yoksa: önbellekten cevap. Watchdog + retry + telemetri aktif.



\## Branch/Versiyonlama



\* Varsayılan dal: `main`

\* Çalışma dalı: `work/\*` (ör. `work/admin-ui`)

\* PR’lar `main`’e squash merge.



\## Yol Haritası



\* \[ ] Admin panel “AI” sekmesi: kurum adı → otomatik bilgi çekme

\* \[ ] 3D Sync WebSocket viseme akışı

\* \[ ] Semantik arama + insan onayı

\* \[ ] Çoklu dil TR/EN otomatik algı

\* \[ ] Çevrimdışı mod güçlendirme



---



> Not: Bu dosya \*\*taslaktır\*\*. Gerçek klasör ve dosya adlarıyla eşleştikçe güncelleyin.



\* \[Mimari Özeti](#mimari-ozeti)

\* \[Sistem Gereksinimleri](#sistem-gereksinimleri)

\* \[Hızlı Başlangıç (Windows 11)](#hizli-baslangic-windows-11)

\* \[Admin Panel (Backend)](#admin-panel-backend)

\* \[Admin Panel (Frontend)](#admin-panel-frontend)

\* \[AI Core](#ai-core)

\* \[UE Entegrasyonu](#ue-entegrasyonu)

\* \[Testler](#testler)

\* \[Komut Kılavuzu](#komut-kilavuzu)

\* \[Yapılandırma / Çevre Değişkenleri](#yapilandirma--cevre-degiskenleri)

\* \[Performans ve Bellek Hedefleri](#performans-ve-bellek-hedefleri)

\* \[Gizlilik ve Dayanıklılık](#gizlilik-ve-dayaniklilik)

\* \[Branch/Versiyonlama](#branchversiyonlama)

\* \[Yol Haritası](#yol-haritasi)



---



\## Mimari Özeti



\* \*\*Vision\*\*: Kamera girişi (yerel, yüz tanıma yok)

\* \*\*Audio I/O\*\*: VAD, STT, TTS

\* \*\*LLM Orchestrator\*\*: niyet, fonksiyon çağrıları

\* \*\*Dialog Policy\*\*: durum makinesi

\* \*\*3D Sync\*\*: viseme/phoneme, animasyon tetikleri

\* \*\*Content APIs\*\*: otel/şehir, offline önbellek



Klasörler:



```

admin\_panel/        # frontend + backend

ai\_core/            # stt, tts, orchestrator, knowledge

ue\_integration/     # UE 5.6.1, Blueprint/C++ köprüleri

tests/              # unit + integration

docs/               # teknik notlar

scripts/            # otomasyon komut dosyaları

```



\## Sistem Gereksinimleri



\* Windows 11

\* Python 3.13.7 (ana) ve 3.11 (yedek venv)

\* Node.js 18+

\* Unreal Engine 5.6.1 (TR arayüz), MetaHuman

\* GPU: RTX 4080, RAM: 64 GB



\## Hızlı Başlangıç (Windows 11)



PowerShell’i \*\*repo kökünde\*\* aç.



```powershell

\# 1) Ortam kontrolü

py --version

node -v

npm -v



\# 2) Admin panel backend

cd .\\admin\_panel\\backend

py -3.13 -m venv .venv

.\\.venv\\Scripts\\Activate.ps1

pip install --upgrade pip

pip install -r requirements.txt

$env:APP\_ENV="dev"

uvicorn app:app --host 127.0.0.1 --port 7070

```



Ayrı bir terminal:



```powershell

\# 3) Admin panel frontend

cd .\\admin\_panel\\frontend

npm install

npm run dev

\# Varsayılan: http://127.0.0.1:5173

```



Ayrı bir terminal:



```powershell

\# 4) AI Core servisleri (örnek)

cd .\\ai\_core

py -3.13 -m venv .venv

.\\.venv\\Scripts\\Activate.ps1

pip install -r requirements.txt

python run\_local.py

```



\## Admin Panel (Backend)



\* API: `uvicorn app:app --host 127.0.0.1 --port 7070`

\* Sağlık kontrolü: `GET /healthz` → `{"status":"ok"}` beklenir

\* Test uçları: `/test/ping`, `/test/stt`, `/test/tts`



\## Admin Panel (Frontend)



\* Geliştirme: `npm run dev`

\* Çevresel değişkenler: `.env` içinde `VITE\_API\_BASE=http://127.0.0.1:7070`



\## AI Core



\* Modüller: `stt/`, `tts/`, `orchestrator/`, `knowledge/`

\* Çalıştırma: `python run\_local.py`

\* Not: STT/TTS sağlayıcı anahtarlarını `.env` dosyasına koyun.



\## UE Entegrasyonu



\* Proje: `ue\_integration/`

\* Menü yolu (TR): \*\*Düzenle → Proje Ayarları → Harici Bağlantılar\*\* bölümünden HTTP/WebSocket ayarlarını yapın.

\* Blueprint köprüleri: `ue\_integration/blueprints/` içinde örnek düğümler.

\* Dudak senk.: phoneme/viseme akışı için `3D Sync` WebSocket ucu.



\## Testler



```powershell

\# Unit

pytest -q

\# Entegrasyon

pytest -q -m integration

```



Beklenenler:



\* `GET /healthz` 200 döner

\* STT < 400 ms, TTS < 700 ms, Toplam < 2.5 s (ölçüm sayacı loglarda)



\## Komut Kılavuzu



```powershell

\# Git

git status

git remote -v

git pull --rebase

git add .; git commit -m "update"; git push



\# Temizlik

pip cache purge

npm cache verify

```



\## Yapılandırma / Çevre Değişkenleri



`.env` örneği:



```

APP\_ENV=dev

API\_BASE=http://127.0.0.1:7070

STT\_PROVIDER=openai

TTS\_PROVIDER=openai

OPENAI\_API\_KEY=xxxxx

CACHE\_DIR=.cache

```



\## Performans ve Bellek Hedefleri



\* Vision/Audio ≤ 4 GB

\* STT/TTS ≤ 2 GB

\* LLM ≤ 8 GB

\* 3D Sync/Content ≤ 2 GB

\* Toplam ≤ 32 GB



Gecikme hedefleri:



\* STT < 400 ms

\* TTS < 700 ms

\* Yanıt < 2.5 s



\## Gizlilik ve Dayanıklılık



\* Kamera verisi yerel. \*\*Yüz tanıma yok\*\*.

\* İnternet yoksa: önbellekten cevap. Watchdog + retry + telemetri aktif.



\## Branch/Versiyonlama



\* Varsayılan dal: `main`

\* Çalışma dalı: `work/\*` (ör. `work/admin-ui`)

\* PR’lar `main`’e squash merge.



\## Yol Haritası



\* \[ ] Admin panel “AI” sekmesi: kurum adı → otomatik bilgi çekme

\* \[ ] 3D Sync WebSocket viseme akışı

\* \[ ] Semantik arama + insan onayı

\* \[ ] Çoklu dil TR/EN otomatik algı

\* \[ ] Çevrimdışı mod güçlendirme



---



> Not: Bu dosya \*\*taslaktır\*\*. Gerçek klasör ve dosya adlarıyla eşleştikçe güncelleyin.



