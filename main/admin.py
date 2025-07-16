from django.contrib import admin
from .models import Category, Size, Product, ProductImage, ProductSize

class ProductImageInlane(admin.TabularInline):
  model = ProductImage
  extra = 1
  
class ProductSizeInlane(admin.TabularInline):
  model = ProductSize
  extra = 1


class ProductAdmin(admin.ModelAdmin):
  list_display = ['name', 'category', 'material', 'price']
  list_filter = ['category', 'material']
  search_fields = ['name', 'material', 'description']
  prepopulated_fields = {'slug':('name', )}
  inlines = [ProductImageInlane, ProductSizeInlane]
  
  
class CategoryAdmin(admin.ModelAdmin):
  list_display = ['name', 'slug']
  prepopulated_fields = {'slug':('name', )}
  
class SizeAdmin(admin.ModelAdmin):
  list_display = ['name']
  
admin.site.register(Category, CategoryAdmin)
admin.site.register(Size, SizeAdmin)
admin.site.register(Product, ProductAdmin)