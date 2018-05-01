#!/bin/bash
service grafana-server stop
rm -r /var/lib/grafana/plugins/jancho-heatmap-panel
cp -r ../jancho-heatmap-panel /var/lib/grafana/plugins/jancho-heatmap-panel
service grafana-server start
service grafana-server restart
