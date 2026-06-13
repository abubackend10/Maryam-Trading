from .models import Settings, Statistic
def get_site_settings(request):
    try:
        settings_obj = Settings.objects.first()
    except Exception:
        settings_obj = None

    if not settings_obj:
        settings_obj = Settings(
            favicon=None, logo=None,
            title="Maryam Trading",
            subtitle="Автомобили из Кореи",
            description="Надёжно, быстро, выгодно",
            image=None,
            watsapp="", telegram="", instagram="",
            address="", phone="", email="",
            working_hours="Пн-Пт: 9:00 - 18:00\nСб: 10:00 - 15:00"
        )
    
    return {
        'settings': settings_obj,
        'stats': Statistic.objects.all()
    }