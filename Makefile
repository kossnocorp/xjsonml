.DEFAULT_GOAL := build
.PHONY: build

SHELL := /bin/bash
PATH := $(shell yarn bin):$(PATH)

test:
	jest

test-watch:
	jest --watch

build:
	@rm -rf lib
	@tsc
	@prettier "**/*.[jt]s" --write --loglevel silent
	@node -e "require('fs').writeFileSync('./lib/package.json', JSON.stringify(Object.assign(require('./package.json'), { main: 'index.js' }), null, 2))"

bench-pack:
	@ls test/pack/spec.html > /dev/null || curl https://www.ecma-international.org/ecma-262/9.0/index.html > test/pack/spec.html
	@node test/pack/build.js

	@echo "Original HTML size:"
	@gzip-size test/pack/spec.html

	@echo "Parsed JSONML size:"
	@gzip-size test/pack/spec.json

	@echo "Packed JSONML size:"
	@gzip-size test/pack/spec.packed.json

	@echo "unpack function size:"
	@size-limit lib/pack/unpack/index.js

