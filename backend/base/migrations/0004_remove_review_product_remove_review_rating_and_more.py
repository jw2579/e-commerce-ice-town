# Generated by Django 4.1.5 on 2023-01-30 00:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0003_order_product"),
    ]

    operations = [
        migrations.RemoveField(model_name="review", name="product",),
        migrations.RemoveField(model_name="review", name="rating",),
        migrations.RemoveField(model_name="review", name="user",),
        migrations.AddField(
            model_name="review",
            name="image",
            field=models.ImageField(
                blank=True, default="/placeholder.png", null=True, upload_to=""
            ),
        ),
    ]
