#!/bin/bash
/usr/sbin/sshd
service munge start
service slurmctld start
exec "$@"
