---
layout: post
title: Stupid mistakes with database
tags: [database, monitoring]
---

You know you're wrong at database administrating, when...


## 1. Don't monitor free space on disk

**DO:** Just do it, and not some simple trigger on 10% free left space, but either how many days till day X.

## 2. Don't ~~make~~ check backups

So you use some tools for backing up your database, but when day X comes, you can not restore from it.

**DO:** every backup needs to be restored.

## 3. Don't monitor slowest/frequent queries

**DO:** there is different approaches for that, but the simplest one is [pgBadger](https://github.com/dalibo/pgbadger) with syslog.

## 4. Don't use int4 as pk for append-only tables

**DO:** just use bigint. Rails make bigint as default for pk in [5.1](http://www.mccartie.com/2016/12/05/rails-5.1.html). Hopefully, Django will make it in 2.x.

## 5. Don't restart database on every error you see.

**DO:** hire DBA (just joking). Try to find a root cause with your monitoring. May be it's just bad statics on table and you need to run `ANALYSE table`.
