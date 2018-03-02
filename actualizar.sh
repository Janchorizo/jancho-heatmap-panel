#!/bin/bash
cp -r ../prueba /var/lib/grafana/plugins
service grafana-server stop
service grafana-server start
