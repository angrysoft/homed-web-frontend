path = www/static
dart = dart2js -m -o
sasss = sassc -t compressed
INSTALL=install -C
USR=http
GRP=http
USRPAN=http
GRPPAN=http
PREFIX = /usr

all: alldart allcss

stylescss: $(path)/styles.scss
	sassc -t compressed $(path)/styles.scss $(path)/styles.css

devicesscss: $(path)/devices/devices.scss
	sassc -t compressed $(path)/devices/devices.scss $(path)/devices/devices.min.css


install:
	install -v -m 755  -g $(GRP) -o $(USR) -d $(DESTDIR)/var/www/homedaemon
	install -v -m 775  -g $(GRP) -o $(USR) -d $(DESTDIR)/var/run/homedaemon
	install -v -m 655 homedaemon.service -D $(DESTDIR)/usr/lib/systemd/system/homedaemon.service
	cp -rv www/* $(DESTDIR)/var/www/homedaemon
	chown -R $(USR).$(GRP) $(DESTDIR)/var/www/homedaemon
	chmod -R a+r $(DESTDIR)/var/www/homedaemon
	chmod -R g+w $(DESTDIR)/var/www/homedaemon

uninstall:
	# rm -rvf $(DESTDIR)/etc/angryhome
	rm -vf $(DESTDIR)/usr/lib/systemd/system/homed.service
	./uninstall.py

uninstall_www:
	rm -rvf $(DESTDIR)/var/www/homedaemon
	rm -vf $(DESTDIR)/usr/lib/systemd/system/homedaemon.service

uninstall_panel:
	rm -rvf $(DESTDIR)/var/www/homepanel
