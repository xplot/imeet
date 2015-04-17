import logging
import re
import urllib

from boilerplate.models import User
from managers.subscriptions import SubscriptionManager


def user_context(handler):
    """
    Decorator setting the user context into a handler method
    Please only use when request inherits from JsonHandler
    """
    def check_context(self, *args, **kwargs):
        user_id = self.request.get('user_id', None) or self._data().get('user_id', None)

        if user_id:
            user = User.get_by_id(long(user_id))
            self.user = user
        else:
            self.user = None
        return handler(self, *args, **kwargs)
    return check_context


def request_with_subscription(handler):
    """
        Decorator that checks the input request
        according to the user subscription
    """
    def check_phone_on_free_subscription(self, *args, **kwargs):

        subscription_manager = SubscriptionManager(self.user)
        features = subscription_manager.get_features_for_user()
        logging.info(features)
        if not 'voice' in features and not 'sms' in features:
            body = self._data()
            contacts = body.get('contacts', None)
            if contacts is not None:
                for x in contacts:
                    if x.get('phone', None):
                        self.response.write(
                            'This is a not valid '
                            'request for your subscription'
                        )
                        self.abort(401)
        return handler(self, *args, **kwargs)

    return check_phone_on_free_subscription