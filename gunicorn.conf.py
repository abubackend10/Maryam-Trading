"""
Gunicorn конфигурация для продакшена — Maryam Trading
https://docs.gunicorn.org/en/stable/settings.html
"""

import multiprocessing
import os

# ─── Сервер ────────────────────────────────────────────
bind = "0.0.0.0:" + os.getenv("PORT", "8000")

# ─── Воркеры ───────────────────────────────────────────
# Формула: (2 × CPU) + 1  — оптимально для I/O-нагрузки
workers = int(os.getenv("WEB_CONCURRENCY", multiprocessing.cpu_count() * 2 + 1))
worker_class = "gthread"       # потоки внутри каждого воркера
threads = 2                    # 2 потока на воркер
worker_tmp_dir = "/dev/shm"    # RAM-диск для heartbeat (быстрее)

# ─── Таймауты ─────────────────────────────────────────
timeout = 120                  # макс. время обработки запроса (сек)
graceful_timeout = 30          # время на graceful shutdown
keepalive = 5                  # keep-alive соединения (сек)

# ─── Перезапуск ────────────────────────────────────────
max_requests = 1000            # перезапуск воркера после N запросов (защита от утечек памяти)
max_requests_jitter = 50       # случайный разброс, чтобы не перезапускались все разом

# ─── Логирование ───────────────────────────────────────
accesslog = "-"                # stdout
errorlog = "-"                 # stderr
loglevel = os.getenv("LOG_LEVEL", "info")
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(D)sμs'

# ─── Безопасность ──────────────────────────────────────
forwarded_allow_ips = "*"      # доверяем прокси Render
proxy_protocol = False

# ─── Хуки ─────────────────────────────────────────────
def on_starting(server):
    """Вызывается при старте мастер-процесса."""
    server.log.info("🚀 Gunicorn запускается — Maryam Trading")


def post_fork(server, worker):
    """Вызывается после создания воркера."""
    server.log.info(f"⚙️  Воркер #{worker.pid} запущен")


def worker_exit(server, worker):
    """Вызывается при завершении воркера."""
    server.log.info(f"🛑 Воркер #{worker.pid} остановлен")
