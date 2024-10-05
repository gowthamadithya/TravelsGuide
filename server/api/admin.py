from django.contrib import admin

# Register your models here.


from django.contrib.auth.admin import UserAdmin
from .models import User

# class CustomUserAdmin(UserAdmin):
#     model = User
#     list_display = ('username', 'email', 'age', 'is_staff', 'is_active')
#     list_filter = ('is_staff', 'is_active')
#     fieldsets = UserAdmin.fieldsets + (
#         (None, {'fields': ('age', 'liked_places', 'visited_places')}),
#     )
#     add_fieldsets = UserAdmin.add_fieldsets + (
#         (None, {'fields': ('age', 'liked_places', 'visited_places')}),
#     )

# admin.site.register(User, CustomUserAdmin)

admin.site.register(User, UserAdmin)

