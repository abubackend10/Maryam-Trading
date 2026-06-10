#!/usr/bin/env bash
# ─── Build script для Render ───────────────────────────
set -o errexit

echo "📦 Установка зависимостей..."
pip install --upgrade pip
pip install -r requirements.txt

echo "📁 Сбор статических файлов..."
python manage.py collectstatic --no-input

echo "🗄️  Применение миграций..."
python manage.py migrate --no-input

echo "👤 Создание суперпользователя (если нет)..."
python manage.py createsuperuser_if_none

echo "✅ Build завершён успешно!"
