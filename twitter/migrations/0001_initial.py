# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-07-19 07:10
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WorkerAccount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=50, unique=True)),
                ('consumer_key', models.CharField(max_length=100)),
                ('consumer_secret', models.CharField(max_length=100)),
                ('access_token', models.CharField(max_length=100)),
                ('access_token_secret', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='WorkerJobs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.CharField(max_length=50)),
                ('language', models.CharField(blank=True, max_length=100)),
                ('follow', models.CharField(blank=True, max_length=100)),
                ('track', models.CharField(blank=True, max_length=100)),
                ('collection_name', models.CharField(blank=True, max_length=100)),
                ('gen_command', models.CharField(blank=True, max_length=400)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='twitter.WorkerAccount')),
            ],
        ),
    ]