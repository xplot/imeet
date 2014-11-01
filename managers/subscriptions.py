

class SubscriptionManager(object):

    def __init__(self, user=None):
        self.user = user

    def get_all(self):
        """Obtain all subscriptions"""
        return []

    def get_user_subscription(self):
        """Obtain the subscription associated with the user"""
        if not self.user:
            return None
        return None

    def get_features_for_user(self):
        """Obtain a set of features available per the user subscription"""

        if not self.user:
            return []

        #For now lets try to filter only voice and sms for logged In
        return ['sms','voice']