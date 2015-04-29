config = {

    # This config file is used only in appengine.beecoss.com (Sample website)
    # Don't use values defined here
    'environment': "boilerplate",

    # contact page email settings
    'contact_sender': "appengine@beecoss.com",
    'contact_recipient': "appengine@beecoss.com",

    'send_mail_developer': False,

    # fellas' list
    'developers': (
        ('GAE Developer', 'gae-developer2014@beecoss.com'),
    ),

    # It is just an example to fill out this value
    'google_analytics_code': """
            <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-47489500-1', 'auto', {'allowLinker': true});
            ga('require', 'linker');
            ga('linker:autoLink', ['beecoss.com', 'blog.beecoss.com', 'appengine.beecoss.com']);
            ga('send', 'pageview');
            </script>
        """,

    # Password AES Encryption Parameters
    # aes_key must be only 16 (*AES-128*), 24 (*AES-192*), or 32 (*AES-256*) bytes (characters) long.
    'aes_key': "xxx",
    'salt': "xxx",

    # get your own consumer key and consumer secret by registering at https://dev.twitter.com/apps
    # callback url must be: http://[YOUR DOMAIN]/login/twitter/complete
    'twitter_consumer_key': 'xxx',
    'twitter_consumer_secret': 'xxx',

    #Facebook Login
    # get your own consumer key and consumer secret by registering at https://developers.facebook.com/apps
    #Very Important: set the site_url= your domain in the application settings in the facebook app settings page
    # callback url must be: http://[YOUR DOMAIN]/login/facebook/complete
    'fb_api_key': 'xxx',
    'fb_secret': 'xxx',

    #Linkedin Login
    #Get you own api key and secret from https://www.linkedin.com/secure/developer
    'linkedin_api': 'xxx',
    'linkedin_secret': 'xxxx',

    # Github login
    # Register apps here: https://github.com/settings/applications/new
    'github_server': 'github.com',
    'github_redirect_uri': 'http://appengine.beecoss.com/social_login/github/complete',
    'github_client_id': 'xxx',
    'github_client_secret': 'xxx',

    # get your own recaptcha keys by registering at http://www.google.com/recaptcha/
    'captcha_public_key': "",
    'captcha_private_key': "",

    # webapp2 sessions
    'webapp2_extras.sessions': { 'secret_key': 'xxx' },

    # webapp2 authentication
    'webapp2_extras.auth': { 'cookie_name': 'gae_session' },

    # ----> ADD MORE CONFIGURATION OPTIONS HERE <----

}
