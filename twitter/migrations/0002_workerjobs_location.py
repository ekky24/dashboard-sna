# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-07-20 10:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('twitter', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='workerjobs',
            name='location',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
