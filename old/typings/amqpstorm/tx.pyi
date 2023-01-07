"""
This type stub file was generated by pyright.
"""

from amqpstorm.base import Handler

"""AMQPStorm Channel.Tx."""
LOGGER = ...

class Tx(Handler):
    """RabbitMQ Transactions.

    Server local transactions, in which the server will buffer published
    messages until the client commits (or rollback) the messages.

    """

    __slots__ = ...
    def __init__(self, channel) -> None: ...
    def __enter__(self): ...
    def __exit__(self, exception_type, exception_value, _): ...
    def select(self):
        """Enable standard transaction mode.

            This will enable transaction mode on the channel. Meaning that
            messages will be kept in the remote server buffer until such a
            time that either commit or rollback is called.

        :return:
        """
        ...
    def commit(self):
        """Commit the current transaction.

            Commit all messages published during the current transaction
            session to the remote server.

            A new transaction session starts as soon as the command has
            been executed.

        :return:
        """
        ...
    def rollback(self):
        """Abandon the current transaction.

            Rollback all messages published during the current transaction
            session to the remote server.

            Note that all messages published during this transaction session
            will be lost, and will have to be published again.

            A new transaction session starts as soon as the command has
            been executed.

        :return:
        """
        ...