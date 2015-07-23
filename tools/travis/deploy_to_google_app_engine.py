__author__ = 'ajadex'

import sys
import os

travis_home = sys.argv[1]
travis_gae_oauth = sys.argv[2]
travis_branch = sys.argv[3]

appCfg = "%s/appEngine/google_appengine/appcfg.py --oauth2_refresh_token=%s --version=%s update ."%(
    travis_home,
    travis_gae_oauth,
    travis_branch
)
os.system(appCfg)

