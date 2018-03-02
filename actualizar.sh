#!/bin/bash
cp -r ../segundo-plugin /var/lib/grafana/plugins
service grafana-server stop
service grafana-server start
