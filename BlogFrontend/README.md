# Frontend Blog Yönetim Uygulaması

Bu uygulama, blog ve kullanıcı işlemlerini kolayca yönetmek için tasarlanmış kullanıcı dostu bir arayüze sahiptir. **React.js** ve **Tailwind CSS** kullanılarak modern bir tasarım anlayışıyla geliştirilmiştir.

---

## ✨ Özellikler

### Blog İşlemleri:

- Blog ekleme, düzenleme, silme ve görüntüleme.

### Kullanıcı İşlemleri:

- Kullanıcı kayıt ve giriş işlemleri.
- Giriş yaptıktan sonra **korunan sayfalara** erişim.

### 🔐 JWT ile Kimlik Doğrulama:

- Kullanıcı girişine dayalı güvenli erişim sağlar.

---

## 🚀 Projenin Kurulumu ve .env dosyası

```bash
MONGO_URI=<MongoDB bağlantı adresiniz>
```

```bash
VITE_BASE_URL=<Uygulama temel URL'i>
```

```bash
VITE_BASE_URL_USER=<user için base url>
```

```bash
VITE_AWS_URL=<AWS s3 için bucket URL>
```

### Gerekli Modüllerin Yüklenmesi:

```bash
npm install
```

### Proje Çalıştırma Komutu:

```bash
npm run dev
```
