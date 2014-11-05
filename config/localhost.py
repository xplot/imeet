config = {

    # This config file will be detected in localhost environment and values defined here will overwrite those in config.py
    'environment': "localhost",
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
    'fb_api_key' : '849110431773368',
    'fb_secret' : '4861d1d47f04f50008531b18bda622a8',

    #Linkedin Login
    #Get you own api key and secret from https://www.linkedin.com/secure/developer
    'linkedin_api' : '75m75jtnf78lh6',
    'linkedin_secret' : 'VV695Pgu8v1eEYFi',


    'google-client-id': '921099581765-61jepjttsm2440fv5tkkeigftcjnpoee.apps.googleusercontent.com',
    'google-client-secret' : 'zWpySCh5FQfGTb06D_9YJI-a',
    'google-client-scope' : 'https://www.googleapis.com/auth/calendar',

    'email_sender':'javi830810@gmail.com',

    'salt': 's3l3ct3d_s41t',
    'aes_key':'s3l3ct3d_43s_k3y',

    'api_url': "http://localhost/damascus/api/invite"
}
