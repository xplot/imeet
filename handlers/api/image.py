from managers.invite import InviteModel
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers
from managers.utils import guid
from managers.auth import user_context
from models import Image, Invite
from base import JsonHandler
from google.appengine.ext import ndb

class ImageServeHandler(blobstore_handlers.BlobstoreDownloadHandler):

    def get(self, image_id):
        key = ndb.Key(urlsafe=image_id)
        image = key.get()
        if not image:
            self.abort(404)

        blob_info = blobstore.BlobInfo.get(image.image_key)
        self.send_blob(blob_info)


class ImageUploadUrlHandler(JsonHandler):

    def get(self, invite_id):
        return blobstore.create_upload_url('/image/%s/upload' % invite_id)


class ImageUploadHandler(blobstore_handlers.BlobstoreUploadHandler):

    def post(self, invite_id):
        #TODO Catch exceptions and remove orphaned upload sessions

        upload_files = self.get_uploads('upload_image_file')  # 'file' is file upload field in the form
        blob_info = upload_files[0]

        invite = Invite.query(Invite.unique_id == invite_id).get()
        invite_model = InviteModel(invite)
        image_key = blob_info.key()
        invite_model.change_poster_picture(image_key)
        self.response.write(invite_model.poster_picture.urlsafe())
