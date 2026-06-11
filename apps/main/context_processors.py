# pyrefly: ignore [missing-import]
from .models import Settings, Statistic

def get_site_settings(request):
    return {
        'settings': Settings.objects.first() or {},
        'stats': Statistic.objects.all() or []
    }