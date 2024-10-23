FROM grafana/grafana:10.0.0

COPY provisioning /etc/grafana/provisioning
COPY dashboards /etc/grafana/dashboards
COPY scripts/init_grafana.sh /usr/local/bin/init_grafana.sh

RUN chmod +x /usr/local/bin/init_grafana.sh

CMD ["/usr/local/bin/init_grafana.sh"]
