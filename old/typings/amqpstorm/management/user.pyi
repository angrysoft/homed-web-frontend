"""
This type stub file was generated by pyright.
"""

from amqpstorm.management.base import ManagementHandler

API_USER = ...
API_USERS = ...
API_USER_VIRTUAL_HOST_PERMISSIONS = ...
API_USER_PERMISSIONS = ...

class User(ManagementHandler):
    def get(self, username):
        """Get User details.

        :param str username: Username

        :rtype: dict
        """
        ...
    def list(self):
        """List all Users.

        :rtype: list
        """
        ...
    def create(self, username, password, tags=...):
        """Create User.

        :param str username: Username
        :param str password: Password
        :param str tags: Comma-separate list of tags (e.g. monitoring)

        :rtype: None
        """
        ...
    def delete(self, username):
        """Delete User.

        :param str username: Username

        :rtype: dict
        """
        ...
    def get_permission(self, username, virtual_host):
        """Get User permissions for the configured virtual host.

        :param str username: Username
        :param str virtual_host: Virtual host name

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: dict
        """
        ...
    def get_permissions(self, username):
        """Get all Users permissions.

        :param str username: Username

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: dict
        """
        ...
    def set_permission(
        self,
        username,
        virtual_host,
        configure_regex=...,
        write_regex=...,
        read_regex=...,
    ):
        """Set User permissions for the configured virtual host.

        :param str username: Username
        :param str virtual_host: Virtual host name
        :param str configure_regex: Permission pattern for configuration
                                    operations for this user.
        :param str write_regex: Permission pattern for write operations
                                for this user.
        :param str read_regex: Permission pattern for read operations
                               for this user.

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: dict
        """
        ...
    def delete_permission(self, username, virtual_host):
        """Delete User permissions for the configured virtual host.

        :param str username: Username
        :param str virtual_host: Virtual host name

        :raises ApiError: Raises if the remote server encountered an error.
        :raises ApiConnectionError: Raises if there was a connectivity issue.

        :rtype: dict
        """
        ...