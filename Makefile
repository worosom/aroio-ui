SHELL := /bin/bash
NODE_PATH = $(shell NODE_VERSION=12 ./find-node-or-install/find-node-or-install)
PATH := $(NODE_PATH):$(shell echo $$PATH)
NODE_BIN = $(NODE_PATH)/node
NPM_BIN = $(NODE_BIN) $(NODE_PATH)/npm
YARN_BIN = $(NODE_BIN) $(NODE_PATH)/yarn

.PHONY: $(YARN_BIN) clean

$(YARN_BIN):
	$(NPM_BIN) i -g yarn

all: node_modules
	mkdir dist
	cp -rf ./api/* ./dist
	cd ./src && $(YARN_BIN) generate --spa
	cp -rf ./src/dist ./dist

node_modules: $(YARN_BIN)
	cd ./src && $(YARN_BIN) install

clean:
	$(RM) -rf ./src/node_modules
	$(RM) -rf ./api/dist
	$(RM) -rf ./dist
