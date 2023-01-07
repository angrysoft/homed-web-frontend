"""
This type stub file was generated by pyright.
"""

from amqpstorm.management.base import ManagementHandler

API_EXCHANGE = ...
API_EXCHANGES = ...
API_EXCHANGES_VIRTUAL_HOST = ...
API_EXCHANGE_BINDINGS = ...
API_EXCHANGE_BIND = ...
API_EXCHANGE_UNBIND = ...

class Exchange(ManagementHandler):
    def get(self, exchange, virtual_host=...):
        """Get Exchange details.

        :param str exchange: Exchange name
        :param str virtual_host: Virtual host name

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: dict
        """
        ...
    def list(self, virtual_host=..., show_all=...):
        """List Exchanges.

        :param str virtual_host: Virtual host name
        :param bool show_all: List all Exchanges

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: list
        """
        ...
    def declare(
        self,
        exchange=...,
        exchange_type=...,
        virtual_host=...,
        passive=...,
        durable=...,
        auto_delete=...,
        internal=...,
        arguments=...,
    ):
        """Declare an Exchange.

        :param str exchange: Exchange name
        :param str exchange_type: Exchange type
        :param str virtual_host: Virtual host name
        :param bool passive: Do not create
        :param bool durable: Durable exchange
        :param bool auto_delete: Automatically delete when not in use
        :param bool internal: Is the exchange for use by the broker only.
        :param dict,None arguments: Exchange key/value arguments

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: None
        """
        ...
    def delete(self, exchange, virtual_host=...):
        """Delete an Exchange.

        :param str exchange: Exchange name
        :param str virtual_host: Virtual host name

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: dict
        """
        ...
    def bindings(self, exchange, virtual_host=...):
        """Get Exchange bindings.

        :param str exchange: Exchange name
        :param str virtual_host: Virtual host name

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: list
        """
        ...
    def bind(
        self,
        destination=...,
        source=...,
        routing_key=...,
        virtual_host=...,
        arguments=...,
    ):
        """Bind an Exchange.

        :param str source: Source Exchange name
        :param str destination: Destination Exchange name
        :param str routing_key: The routing key to use
        :param str virtual_host: Virtual host name
        :param dict,None arguments: Bind key/value arguments

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: None
        """
        ...
    def unbind(
        self,
        destination=...,
        source=...,
        routing_key=...,
        virtual_host=...,
        properties_key=...,
    ):
        """Unbind an Exchange.

        :param str source: Source Exchange name
        :param str destination: Destination Exchange name
        :param str routing_key: The routing key to use
        :param str virtual_host: Virtual host name
        :param str properties_key:

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: None
        """
        ...