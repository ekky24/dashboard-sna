# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-07-31 04:02
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('twitter', '0002_workerjobs_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='workerjobs',
            name='category',
            field=models.CharField(default='blank', max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='workerjobs',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
