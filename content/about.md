---
layout: page
permalink: /about/
---

```python
import this  # Never forget about Zen of Python
import antigravity  # With <3 to xkcd
import requests


class Vanadium23:
    def __init__(self):
        # Techonologies
        self.languages = ['Python', 'JavaScript']
        self.frameworks = [
            'Django', 'flask', 'aiohttp', 'react']
        self.technologies = [
            'Redis', 'PostgresSQL', 'git', 'Docker']
        self.editor = 'VS Code'

        # Personal info
        self.first_name = 'Ivan'
        self.last_name = 'Chernov'
        self.email = 'chernoffivan+blog@gmail.com'

    def download_cv(self):
        response = requests.get(
            'https://vanadium23.me/cv.pdf'
        )
        response.raise_for_status()
```
