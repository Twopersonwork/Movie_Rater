from django.contrib import admin

# Register your models here.
from import_export.admin import ImportExportModelAdmin

# Register your models here.
from .models import Movie,Rating
from django.contrib import admin

class moviesadmin(ImportExportModelAdmin):
    pass


admin.site.register(Movie, moviesadmin)
admin.site.register(Rating)






