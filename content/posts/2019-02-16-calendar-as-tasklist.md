---
layout: post
title: Календарь в качестве списка задач
tags: [blog, productivity]
permalink: calendar-as-tasklist
date: 2019-02-16T17:00:00+03:00
---

В прошлом году у меня были странные эксперименты по тому как вести списки дел. В качестве основной платформы последние пару лет остаётся Todoist, но покопавшись в FAQ, обнаружил, что есть двухстороняя синхронизация с [гугл календарём](https://doist.com/blog/google-calendar-todoist-integration/) и тут понеслось.
<!--more-->
**TL;DR:** используйте календарь, как календарь, а список дел, как список дел. Нет ничего плохого в том, что они лежат в двух разных системах.

Итак, в какой-то момент времени у вас становится много встреч на неделе, точнее больше чем хотелось бы. Мне их хотелось не больше 2 в день, и не больше 5 в неделю. К сожалению, не всё совпадает с нашими желаниями:
![Зачееееееем](/images/calendar-overflow.png)

Ситуация усугубляется тем, что к каким-то из встреч надо подготовиться. Мне показалось, что хорошим решением будет делать следующее:
1. Вести встречи в списке дел
2. Пытаться впихнуть остальные дела между этими встречами

Ручки зачесались и настроили синхронизацию с гугл календарём, и всё заработало из коробки. Надо отметить, что у Todoist хорошо проработана синхронизация: при добавлении задачи со временем, она ставится и в календарь, а если в названии напишешь [25m], то ещё и продолжительность будет корректная. Правда пары вещей мне не хватило:
1. Он не умеет работать с двумя календарями.
2. Нельзя прописать у уже созданной задачи продолжительность. Оно не синхронизирует по обновлению названия.

На помощь нам приходит ifttt, знакомый по статье с [getpocket](/keep-pocket-clean). В нём мы можем настроить синхронизацию вновь созданных событий между двумя календарями. [тыц](https://ifttt.com/applets/126824p-copy-events-between-calendars)
Двумя вечерами позднее я был во все оружие и решил, что буду:
1. Смотреть список задач и теперь встреч каждое утро в тудуисте
2. Расставлять время, когда буду делать задачу между ними
3. Для пущей убедительности буду красить в разные цвета, чтобы не путать встречи и дела.

Выглядело это как-то так:

![Тут надо было уже понять, что есть проблема](/images/calendar-overflow-more.png)

В таком режиме успел пожить недельку, но пришло осознание, что не хватает контроля всё делать. А если не хватает контроля - надо добавить больше контроля! Проблема заключалась в том, что если откладывать задачу в тудуисте, она откладывалась и в календаре и никак нельзя было сравнить план с фактом. Значит, надо добавить бэкап изначального календарь. Берём и делаем ещё один календарь, который называем Plan и каждое утро в 10 бекапим в него какие у нас были события. Можно было напилить скрипт в крон, но лень взяла вверх и была найдена приложенька [Copy Calendar Events](https://play.google.com/store/apps/details?id=com.applisto.copyevents).
![Всё идёт по плааану](/images/calendar-plan-fact.png)

Синим отмечен план и как сразу можно заметить, в час всё стало идти не по плану. На какие только ухищрения не приходилось идти, чтобы всё сходилось, но жизнь оказалась проще: не надо планировать дела с точностью до минуты, достаточно планировать день с учётом сил и оставлять чуть-чуть для себя любимого. Тогда вы не будет в состояние "ох ты, не успел", потом сами себе скажите спасибо.

P.s. Копирование встреч в личный календарь + Todoist так и осталось, и это тоже плохая практика. Напишу об этом как-нибудь.
