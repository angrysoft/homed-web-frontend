"""
This type stub file was generated by pyright.
"""

from amqpstorm.management.base import ManagementHandler

API_VIRTUAL_HOST = ...
API_VIRTUAL_HOSTS = ...
API_VIRTUAL_HOSTS_PERMISSION = ...

class VirtualHost(ManagementHandler):
    def get(self, virtual_host):
        """Get Virtual Host details.

        :param str virtual_host: Virtual host name

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: dict
        """
        ...
    def list(self):
        """List all Virtual Hosts.

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: list
        """
        ...
    def create(self, virtual_host):
        """Create a Virtual Host.

        :param str virtual_host: Virtual host name

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: dict
        """
        ...
    def delete(self, virtual_host):
        """Delete a Virtual Host.

        :param str virtual_host: Virtual host name

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: dict
        """
        ...
    def get_permissions(self, virtual_host):
        """Get all Virtual hosts permissions.

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: dict
        """
        ...