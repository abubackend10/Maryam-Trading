<div align="center">

# 🚗 Maryam Trading

### Автомобили из Кореи — надёжно, быстро, выгодно

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Django](https://img.shields.io/badge/Django-5.1-092E20?style=for-the-badge&logo=django&logoColor=white)](https://djangoproject.com)
[![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-F7DF1E?style=for-the-badge)](LICENSE)

<br>

Веб-платформа для компании **Maryam Trading** — продажа и подбор автомобилей из Южной Кореи.  
Каталог с фильтрами, детальные карточки авто, галерея, YouTube-видео обзоры и форма обратной связи.

</div>

---

## 📸 Возможности

| Функция | Описание |
|---------|----------|
| 🏠 **Главная страница** | Hero-секция, популярные авто, преимущества компании, CTA-блок |
| 🚘 **Каталог авто** | Все автомобили с ценами, пробегом, типом топлива и КПП |
| 📋 **Карточка авто** | Полная информация: фото-галерея, YouTube-видео, характеристики, кнопка WhatsApp |
| 📝 **Форма контактов** | Обратная связь с защитой от спама (honeypot + rate-limit) |
| ℹ️ **О компании** | История и описание Maryam Trading |
| ⚙️ **Админ-панель** | Управление авто, настройками сайта, статистикой и сообщениями |

---

## 🛠 Технологии

```
Backend          Django 5.1 · Python 3.10+
База данных      SQLite (dev) / PostgreSQL (prod, через dj-database-url)
Медиа-файлы      Cloudinary (продакшен) / локальное хранилище (разработка)
Статика          WhiteNoise с Brotli-сжатием
Деплой           Render (Web Service) · Gunicorn
Фронтенд        HTML5 · CSS3 · Vanilla JS · Font Awesome
Безопасность     HSTS · CSRF · Rate-limiting · Honeypot
```

---

## 📁 Структура проекта

```
MARYAM TRADING/
├── apps/
│   └── main/              # Основное приложение
│       ├── models.py      # Car, CarImage, Settings, Advantage, About, ContactMessage
│       ├── views.py       # home, gallery, car_details, about, contact
│       ├── admin.py       # Настройка админ-панели
│       ├── urls.py        # Маршруты приложения
│       └── context_processors.py
├── core/                  # Конфигурация Django
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── templates/             # HTML-шаблоны
│   ├── base.html
│   ├── index.html
│   ├── gallery.html
│   ├── car-details.html
│   ├── contact.html
│   ├── about.html
│   └── components/
├── static/                # CSS, JS, изображения
├── media/                 # Загруженные файлы (dev)
├── requirements.txt
├── build.sh               # Скрипт деплоя на Render
├── manage.py
└── .env                   # Переменные окружения (не в git)
```

---

## 🚀 Установка и запуск

### 1. Клонировать репозиторий

```bash
git clone https://github.com/abubackend10/Maryam-Trading.git
cd Maryam-Trading
```

### 2. Создать виртуальное окружение

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 3. Установить зависимости

```bash
pip install -r requirements.txt
```

### 4. Настроить переменные окружения

Создайте файл `.env` в корне проекта:

```env
SECRET_KEY=your-secret-key
DEBUG=True

# Cloudinary (опционально, для медиа в облаке)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 5. Применить миграции и запустить

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Откройте **http://127.0.0.1:8000/** в браузере.  
Админ-панель: **http://127.0.0.1:8000/admin/**

---

## 🌐 Деплой на Render

Проект настроен для деплоя на [Render](https://render.com):

1. Создайте **Web Service** и подключите репозиторий
2. **Build Command:** `sh build.sh`
3. **Start Command:** `gunicorn core.wsgi:application`
4. Добавьте переменные окружения (`SECRET_KEY`, `DATABASE_URL`, Cloudinary ключи)

---

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку (`git checkout -b feature/новая-функция`)
3. Сделайте коммит (`git commit -m 'Добавить новую функцию'`)
4. Запушьте (`git push origin feature/новая-функция`)
5. Откройте Pull Request

---

## 📄 Лицензия

Этот проект распространяется под лицензией MIT — подробности в файле [LICENSE](LICENSE).

---

<div align="center">

**Сделано с ❤️ для Maryam Trading**

</div>
