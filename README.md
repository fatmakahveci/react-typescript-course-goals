# Course Goals

Next.js, React ve TypeScript ile geliştirilmiş sade bir kurs hedefi takip uygulaması.

Güncel sürüm: **v1.0.0**

## Özellikler

- Yeni kurs hedefi ekleme
- Hedefleri tamamlandı olarak işaretleme
- Tüm, aktif ve tamamlanan hedefleri filtreleme
- Hedefler içinde arama yapma
- Tamamlanma sayısı ve ilerleme çubuğu
- Tamamlanan hedefleri topluca temizleme
- Hedefleri tek tek silme
- Boş ve yinelenen giriş kontrolü
- Karakter sınırı ve canlı karakter sayacı
- Hedeflerin oluşturulma tarihini gösterme
- Hedefleri tarayıcıda kalıcı olarak saklama
- Klavye ve ekran okuyucu kullanımına uygun arayüz
- Mobil ekranlarla uyumlu tasarım
- Özel renk sistemi ve favicon

> Hedefler tarayıcının yerel depolama alanında saklanır ve sayfa yenilendiğinde korunur.

## Kullanılan Teknolojiler

- Next.js 16
- React 19
- TypeScript 5
- CSS Modules
- ESLint 9

## Gereksinimler

- Node.js 20.9 veya üzeri
- npm

## Kurulum

Projeyi klonladıktan sonra proje dizininde bağımlılıkları yükleyin:

```bash
npm install
```

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde açılır.

## Komutlar

```bash
npm run dev      # Geliştirme sunucusunu başlatır
npm run build    # Production çıktısı oluşturur
npm run start    # Production sunucusunu başlatır
npm run lint     # ESLint kontrollerini çalıştırır
```

Production sürümünü yerelde çalıştırmak için:

```bash
npm run build
npm run start
```

## Proje Yapısı

```text
src/
├── app/
│   ├── components/
│   │   ├── CourseGoals/
│   │   │   ├── CourseGoalItem/
│   │   │   ├── CourseGoalList/
│   │   │   └── CourseInput/
│   │   └── UI/
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   └── page.tsx
└── shared/
    └── types/
```

## Kalite Kontrolleri

Değişiklik göndermeden önce aşağıdaki komutların başarıyla tamamlandığından emin olun:

```bash
npm run lint
npm run build
```

## Lisans

Bu proje [MIT lisansı](LICENSE.md) ile sunulmaktadır.
