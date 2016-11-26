---
layout: post
title: Cook django with aiohttp workers
---

There is some standart stack to run django in production.
For python 2, it is nginx + gunicorn or uwsgi + monkey patching libs, such as gevent or eventlet.
Generally, I prefer gunicorn + eventlet, but when you switch (or start) django project on latest python 3.5, eventlet can do [some bad magic](https://github.com/eventlet/eventlet/issues/313). And you can switch to a new built-in mechanism, called _aiohttp_.
Based on [gunicorn docs](http://docs.gunicorn.org/en/stable/design.html?highlight=gaiohttp#asyncio-workers), you need simply switch worker to _gaiohttp_ and that's all.

Then, something bad happens.
![gaiohttp-memory]({{ site.baseurl }}/images/gaiohttp-memory.png)

Answer is very simple: <strike>you write some memoryleaking code</strike> _gaiohttp_ ignores max_requests option.
In other words, workers won't be killed after max_requests count. After some search on internet, there is an [article](http://asvetlov.blogspot.ru/2014/06/asyncio-aiohttp-gunicorn.html) from asyncio contributor about copy-n-pasting worker from aiohttp repo to gunicorn.
[Aiohttp docs](http://aiohttp.readthedocs.io/en/stable/deployment.html#start-gunicorn) says that you should use `aiohttp.worker.GunicornWebWorker`, but when you switch setting there will be error.

```
[5898] [ERROR] Exception in worker process
Traceback (most recent call last):
  File "./gunicorn/arbiter.py", line 557, in spawn_worker
    worker.init_process()
  File "./aiohttp/worker.py", line 37, in init_process
    super().init_process()
  File "./gunicorn/workers/base.py", line 132, in init_process
    self.run()
  File "./aiohttp/worker.py", line 40, in run
    self.loop.run_until_complete(self.wsgi.startup())
AttributeError:
    'WSGIHandler' object has no attribute 'startup'
```

So _aiohttp.worker.GunicornWebWorker_ differs from standart wsgi app for django. Luckily, python community has two packages to overcome these difficulties: _aiohttp-wsgi_ and _aiodjango_, add them to your _requirements.txt_.
After this modify your _wsgi.py_ according to [docs](http://aiodjango.readthedocs.io/en/latest/usage.html#defining-the-application):

```
import os

from django.core.wsgi import get_wsgi_application

from aiodjango import get_aio_application


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')

# Build WSGI application
# Any WSGI middleware would be added here
application = get_wsgi_application()

# Build aiohttp application
app = get_aio_application(application)
```

That's all folks.
