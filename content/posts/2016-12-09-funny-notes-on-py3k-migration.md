---
layout: post
title: Funny notes on migration to python3
tags: [dev, python, py3k]
slug: funny-notes-on-py3k-migration
date: 2016-12-09T17:00:00+03:00
---

Python3 is a great pain in python community. It was released on Dec 3, 2008 and brings major breaking changes and also new interpreter was slower, than python2 realization. After long way and five releases, in 2016, it's obvious to start on python 3.5: type hinting, asyncio, same perfomance and gets better in coming [python 3.6](https://docs.python.org/3.6/whatsnew/3.6.html).
<!--more-->
**Warning**: this is not an article about how to migrate to python3, but more about how to catch errors before deploy to prod.
For python3 migrations, see something like [this](https://www.toptal.com/python/python-3-is-it-worth-the-switch) or [this](http://python3porting.com/strategies.html).
Always remember simple thing: more unit & integrations tests you have => earlier you detect bugs.


Contents:

1. [integer division](#py3k-division)
2. [unorderable types](#py3k-comparations)
3. [except Exception](#py3k-except)
4. [bytes comparison](#py3k-byteswarning)
5. [special thanks to ujson](#py3k-ujson)
6. [lxml trap](#py3k-lxml)
7. [changes in work with redis-py](#py3k-redispy)
8. [Note: how to make smaller diff between py2 and py3 version on django](#py3k-django)



# <a name="py3k-division"></a>Division
Can you guess what kind of exception will be there,
if hotel.rating is integer.

```
stars = range(hotel.rating / 10)
```

Correct answer:

```
> TypeError: 'float' object cannot be interpreted as an integer
```

Solution:

```
# do it before migrations, it works on py2
from __future__ import division
stars = range(hotel.rating // 10)
```


# <a name="py3k-comparations"></a>Unorderable types
So, in python 3 you can't do such things:

```
None > None
1 > None
'1' > 1

> TypeError: unorderable types: int() > NoneType()
```

Because it's more strict for types. How it was found:

```
chosen_indexes = Obj.objects.values_list('chosen_index', flat=True)
...
...
...
max_index = max(chosen_indexes)
```

That's ok code, but if field chosen_index can be null, you will catch TypeError.

Solution: just filter None values in list, or null in queryset.

## <a name="py3k-except"></a>except Exception
Pretty much uses external APIs: may be you send letters through MailGun or Mandrill, you can call some other services in your company.
But you know - sometimes they just fail: connection timeouts, 5xx errors.
For handling such cases you can make tuple of Exception:

```python
from requests.exceptions import (
    RequestException,
    HTTPError
)

NETWORK_EXCEPTIONS = (
    RequestException,
    HTTPException,
)

try:
    # some bad code example, but for teach purpose
    response = requests.get(some_url)
    result = ujson.loads(response.content)
except (NETWORK_EXCEPTIONS, ValueError):
    log.error('some bad thing happend')
```

This code won't work on python3, because interpreter check exception is subclass of BaseException.

Solution:

```python
from requests.exceptions import (
    RequestException,
    HTTPError
)

NETWORK_EXCEPTIONS = (
    RequestException,
    HTTPException
)

try:
    response = requests.get(some_url)
    result = ujson.loads(response.content)
except NETWORK_EXCEPTIONS + (ValueError,):
    log.error('some bad thing happend')
```

Second interesting example is that, except create variable in local scope and its make hard to print/ipdb. (This is some questing during interview, that I love to ask).
Example:

```
import json

exc = 'test'
try:
    result = json.loads('{test}')
except ValueError as exc:
    pass
# there will be no exc variable on py3k
print(exc)
> NameError: name 'exc' is not defined
```

# <a name="py3k-byteswarning"></a>bytes comparison
It's greatest pain in migration. So much pain, I can feel it in my head.
Next 3 bullets is about it.
First: no implicit conversion between str and bytes.
Solution:

```
python3 -bb your_script.py
```

It throw ByteWarning exception insted of falsing b'' == ''.

Second: some libs expected bytes on input, some text.

Solution: call .decode on bytes & encode on str.

# <a name="py3k-ujson"></a>just ujson
Json from standart libs expects str on input, ujson can deal with str and bytes.
Also ujson much faster, see comparasion on [github](https://github.com/esnme/ultrajson#benchmarks).

# <a name="py3k-lxml"></a>lxml trap
Ooops, this was tough one. Some service provides XML API.
It answers question of life, universe and everything.

```
<root>
  <answer>42</answer>
</root>
```

You want to parse it using lxml:

```python
from lxml import objectify

xml_answer = """
<root>
  <answer>42</answer>
</root>
"""
xml = objectify.parse(buf).getroot()
```

This example works both on py2 and py3, but some little difference:

```python
from lxml import objectify

xml_answer = """<?xml version="1.0" encoding="utf-8"?>
<root>
  <answer>42</answer>
</root>
"""
xml = objectify.parse(buf).getroot()
```
Aaaand lxml wants bytes on input instead of string ¯\\_(ツ)_/¯.


# <a name="py3k-redispy"></a>redis-py bytes
All redis action from redispy returns bytes now. So if you use pure redis (not a django.core.cache), you need to explicit call decode. Also pickling objects between python3 and python2 doesn't work, so make sure you make different keys in cache.

## <a name="py3k-django"></a>Note: how to make smaller diff between py2 and py3 version on django
So sums it up with django experience:

1. use smart_text instead of smart_unicode
2. use @python_2_unicode_compatible decorator
3. use key_prefix in django.caches, when moving

Thanks for reading.

![keep calm and move to python3](/images/move-to-py3k.png)
