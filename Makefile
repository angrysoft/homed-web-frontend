path = static
sasss = sassc -t compressed
INSTALL=install -C
USR=http
GRP=http
USRPAN=http
GRPPAN=http
PREFIX = /usr

all: buildjs

buildjs:
	tsc -b src

stylescss: $(path)/styles.scss
	sassc -t compressed $(path)/styles.scss $(path)/styles.css

install:
	install -v -m 755 -g $(GRP) -o $(USR) -d $(DESTDIR)/var/www/homedaemon
	install -v -m 775 -g $(GRP) -o $(USR) -d $(DESTDIR)/var/run/homedaemon
	cp -rv static $(DESTDIR)/var/www/homedaemon
	cp -rv templates $(DESTDIR)/var/www/homedaemon
	install -v -m 755 -g $(GRP) -o $(USR) homedweb.py /var/www/homedaemon/homedweb.py
	install -v -m 755 -g $(GRP) -o $(USR) auth.py /var/www/homedaemon/auth.py
	install -v -m 755 -g $(GRP) -o $(USR) devices.py /var/www/homedaemon/devices.py
	chown -R $(USR).$(GRP) $(DESTDIR)/var/www/homedaemon
	chmod -R a+r $(DESTDIR)/var/www/homedaemon
	chmod -R g+w $(DESTDIR)/var/www/homedaemon
	install -v -m 655 homedweb.service -D $(DESTDIR)/usr/lib/systemd/system/homedweb.service

	install -v -m 755  homemanager.py /usr/bin/homemanager.py
	install -v -m 655 homemanager.service -D $(DESTDIR)/usr/lib/systemd/system/homemanager.service

uninstall:
	rm -rvf $(DESTDIR)/var/www/homedaemon
	rm -vf $(DESTDIR)/usr/lib/systemd/system/homedweb.service
	rm -vf $(DESTDIR)/usr/bin/homemanager.py
	rm -vf $(DESTDIR)/usr/lib/systemd/system/homemanager.service


