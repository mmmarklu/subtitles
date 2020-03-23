# subtitles
[TOC]
## Quickstart

There are multiple ways to invoke the emulator.


## Quickstart weofijewoifje {#test}
## Features, Known Issues, and Limitations

There are multiple ways to invoke the emulator.


[test](https://gcr.io/cloud-spanner-emulator/emulator)


## Features, Known Issues, and Limitations
▾ marklu
Draft
What's the difference between a known issue and limitation?

If there isn't much different, consider shortening the header. With a shorter heading, the heading ID will be shorter which makes it easier to write fragment links. (README.md#features-and-limitations)
EditDiscard
Unresolved

> :warning: The emulator is currently in a pre-release state.

Notable supported features:

- DDL schema changes

- Full SQL/DML query execution (pre-release exceptions noted below)

- Non-SQL read and write methods

- Instance and Database admin APIs including long running operations

- Reads with stale timestamps

- Secondary indexes

- Commit timestamps

- Information schema

Limitations in pre-release state:

- SQL functions TABLESAMPLE, JSON_VALUE, JSON_QUERY, CEILING, POWER,
  CHARACTER_LENGTH, and FORMAT are not supported.

- Queries using some SQL functionality present in ZetaSQL but not in the
  Cloud Spanner service will succeed instead of being rejected as invalid.

- Transactions are rolled-back on any error (in the Cloud Spanner service,
  certain statements with errors, e.g. queries with invalid table names, do not
  rollback the transaction).

- PartitionedRead, PartitionedQuery, PartitionedDML are not supported. Note that
  Cloud Spanner dataflow templates depend on the PartitionedQuery  API and hence
  are not supported.

- Untyped parameter bindings (used by client libraries written in languages with
  dynamic typing) and commit timestamp values in bound parameters are not
  supported.

- Foreign keys are not supported.

Notable limitations:

- The gRPC and REST endpoints run on separate ports and serve unencrypted
  traffic.

- gRPC request deadlines and cancellations are ignored by the emulator.

- IAM apis (SetIamPolicy, GetIamPolicy, SetIamPermissions) and Backup APIs
  are not supported.

- The emulator only allows one read-write transaction or schema change at a
  time. Any concurrent transaction will be aborted. Transactions should always
  be wrapped in a retry loop. This [recommendation](
  https://cloud.google.com/spanner/docs/transactions) applies to the Cloud
  Spanner service [as well].

- The emulator does not support persistence - all data is kept in memory and
  discarded when the emulator terminates.

- Error messages may not be consistent between the emulator and the Cloud
  Spanner service. Error messages are not part of Cloud Spanner's API contract
  and application code should not depend on the text of the error message being
  consistent.

- If multiple constraint violations are found during a transaction commit, the
  violation reported by the emulator may be different from the one reported by
  the Cloud Spanner service.

- The SQL query modes EXPLAIN and PROFILE are disabled. The emulator does not
  guarantee the same query execution plan as the Cloud Spanner service, and
  hence query plans and statistics reporting are disabled on the emulator.

- Certain quotas and limits (such as admin api rate limits and mutation size
  limits) are not enforced.

- List APIs (ListSessions, ListInstances) do not support filtering by labels.

- Many tables related to runtime introspection in the SPANNER_SYS schema (e.g.,
  query stats tables) are not supported.

- Server-side monitoring and logging functionality such as audit logs,
  stackdriver logging, and stackdriver monitoring are not supported.
