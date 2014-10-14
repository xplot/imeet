config = {

     # This config file will be detected in localhost environment and values defined here will overwrite those in config.py
    'environment': "production",
    'enable_federated_login' : True,
    'log_visit' : False,

    # ----> ADD MORE CONFIGURATION OPTIONS HERE <----
    'captcha_public_key': "6Ldi0u4SAAAAAC8pjDop1aDdmeiVrUOU2M4i23tT",
    'captcha_private_key': "6Ldi0u4SAAAAAPzk1gaFDRQgry7XW4VBvNCqCHuJ",
    'webapp2_extras.sessions':{
        'secret_key': 'my-super-secret-key',
    },

    # get your own consumer key and consumer secret by registering at https://dev.twitter.com/apps
    # callback url must be: http://[YOUR DOMAIN]/login/twitter/complete
    'twitter_consumer_key' : 'NEEwbHhd5K77OfAo9gK8bQ',
    'twitter_consumer_secret' : 'YPaivsahmbbjdIwI3Ph0gylBSgVChg5TYEvWDU9UY94',

    #Facebook Login
    # get your own consumer key and consumer secret by registering at https://developers.facebook.com/apps
    #Very Important: set the site_url= your domain in the application settings in the facebook app settings page
    # callback url must be: http://[YOUR DOMAIN]/login/facebook/complete
    'fb_api_key' : '850968848254193',
    'fb_secret' : 'd34746b773ce72d3e7770116261a41e2',

    #Linkedin Login
    #Get you own api key and secret from https://www.linkedin.com/secure/developer
    'linkedin_api' : '75m75jtnf78lh6',
    'linkedin_secret' : 'VV695Pgu8v1eEYFi',

    'email_sender':'javi830810@gmail.com',

    'google-client-id': '921099581765-83enr5i4mr56qhmjbjdaro8o83698h6a.apps.googleusercontent.com',
    'google-client-secret' : 'XasYbdcjb5q207RhvsxlUrHa',
    'google-client-scope' : 'https://www.googleapis.com/auth/calendar',

    'salt': 's3l3ct3d_s41t',
    'aes_key':'s3l3ct3d_43s_k3y',


    'api_url': "http://www.voiceflows.com/api/invite"
}
