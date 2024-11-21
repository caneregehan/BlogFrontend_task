# Backend Blog Yönetim Uygulaması

Bu backend uygulaması, blog ve kullanıcı işlemleri için **RESTful API** hizmeti sunar. **Node.js**, **Express.js** ve **MongoDB** kullanılarak geliştirilmiştir.

---

## ✨ Özellikler

- **Blog İşlemleri**: Blog ekleme, düzenleme, silme ve görüntüleme API'leri.
- **Kullanıcı İşlemleri**: Kullanıcı kayıt, giriş ve kimlik doğrulama.
- **JWT ile Kimlik Doğrulama**: Güvenli kullanıcı erişimi ve oturum yönetimi.
- **Mongoose ORM**: MongoDB ile kolay veri yönetimi.

---

## 🚀 Projenin Kurulumu

MONGO_URI=<MongoDB bağlantı adresiniz>
VITE_BASE_URL=<Uygulama temel URL'i>
JWT_SECRET=<JWT için gizli anahtar>
JWT_EXPIRATION=<JWT'nin süresi, örn: 1d>

### 1. Gerekli Modüllerin Yüklenmesi

Projede kullanılan bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```bash
npm install
```
