from .models import Settings, Statistic

def get_site_settings(request):
    # Возвращаем словарь, который будет подмешиваться в контекст каждого шаблона
    return {
        'settings': Settings.objects.first(),
        'stats': Statistic.objects.all()
    }