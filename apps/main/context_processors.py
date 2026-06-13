from .models import Settings, Statistic
def get_site_settings(request):
    settings_obj = Settings.objects.first()

    if not settings_obj:
        settings_obj = Settings(
            favicon=None, logo=None,
            title="Maryam Trading",
            subtitle="Автомобили из Кореи",
            description="Надёжно, быстро, выгодно",
            image=None,
            watsapp="", telegram="", instagram="",
            address="", phone="", email=""
        )
    
    return {
        'settings': settings_obj,
        'stats': Statistic.objects.all()
    }