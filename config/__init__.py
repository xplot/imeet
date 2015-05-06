"""
This configuration file loads environment's specific config settings for the application.
It takes precedence over the config located in the boilerplate package.
"""

import os
import logging

if os.environ.get('imeet.testing') and "true" in os.environ['imeet.testing'].lower():
    from testing import config
elif os.path.isfile("config/settings.py"):
    from settings import config
else:
    raise ValueError("Environment undetected")