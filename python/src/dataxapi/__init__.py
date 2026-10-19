"""DataXAPI for Python: market data over one interface, paid per call.

    from dataxapi import DataXAPI

    client = DataXAPI()  # reads DATAXAPI_API_KEY
    page = client.douyin.videos.comments.list(id="7694940173372575014")

The client with a method per capability is generated from the public catalog
(_generated.py); what a call does is in the runtime it stands on (_runtime.py
for what is asked, _transport.py for how one request is sent).
"""

from ._generated import *  # noqa: F401,F403
from ._generated import DataXAPI, ERRORS, REVISION, ROLES
from ._runtime import CallOptions, Client, Envelope, KeyTooLongError, Meta, Page, PlatformOutcome, RunRef, UnknownRoleError
from ._transport import APIConnectionError, DataXAPIError, FailedCall

__version__ = "1.0.0"
