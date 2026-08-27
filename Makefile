NPM ?= npm
BIND ?= 127.0.0.1
PORT ?= 1313
HUGO_BIND ?= $(BIND)
HUGO_PORT ?= $(PORT)
HUGO_BASE_URL ?= http://$(HUGO_BIND):$(HUGO_PORT)/

.PHONY: install runserver build clean

install:
	$(NPM) install

node_modules/.install-stamp: package.json package-lock.json
	$(NPM) install
	touch node_modules/.install-stamp

runserver: node_modules/.install-stamp
	hugo server -D --bind $(HUGO_BIND) --port $(HUGO_PORT) --baseURL $(HUGO_BASE_URL)

build: node_modules/.install-stamp
	$(NPM) run build

clean:
	rm -rf public resources .hugo_build.lock
