import multiprocessing
import os

bind = "0.0.0.0:" + os.getenv("PORT", "8000")

workers = int(os.getenv("WEB_CONCURRENCY", multiprocessing.cpu_count() * 2 + 1))
worker_class = "gthread"
threads = 2
worker_tmp_dir = "/dev/shm"

timeout = 120
graceful_timeout = 30
keepalive = 5

max_requests = 1000
max_requests_jitter = 50

accesslog = "-"
errorlog = "-"
loglevel = os.getenv("LOG_LEVEL", "info")
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(D)sμs'

forwarded_allow_ips = "*"
proxy_protocol = False

def on_starting(server):
    server.log.info("🚀 Gunicorn запускается — Maryam Trading")

def post_fork(server, worker):
    server.log.info(f"⚙️  Воркер #{worker.pid} запущен")
def worker_exit(server, worker):
    server.log.info(f"🛑 Воркер #{worker.pid} остановлен")
