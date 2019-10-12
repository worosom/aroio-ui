SHELL := /bin/bash
NODE_PATH = $(shell ./find-node-or-install)
PATH := $(NODE_PATH):$(shell echo $$PATH)

.PHONY: $(YARN_BIN) clean

YARN_BIN = yarn
$(YARN_BIN):
	$(NODE_PATH)npm i -g yarn

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
