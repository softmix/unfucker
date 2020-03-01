#!make
include .env

EXTENSION := $(shell grep "name" manifest.json | sed -n 's/.*"name":.*"\(.*\)",.*/\1/p')
VERSION := $(shell grep "version" manifest.json | grep -Po '([0-9]+\.){2}[0-9]+')
ID := $(shell grep "id" manifest.json | sed -n 's/.*"id":.*"\(.*\)",.*/\1/p')

.PHONY: clean

build: clean
	web-ext sign --channel="unlisted" --id="$(ID)"

release: build
	hub release create -a web-ext-artifacts/*.xpi $(VERSION) -m "$(VERSION)"

clean:
	rm -rf web-ext-artifacts
