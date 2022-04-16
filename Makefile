.PHONY: setup clean lint test build start

SHELL := /bin/bash
PATH := ./node_modules/.bin:$(HOME)/bin:$(PATH)
MAKE := make

ci: setup
	$(MAKE) depgraph
	$(MAKE) lint
	$(MAKE) test
	$(MAKE) build

clean:
	rimraf coverage/ dist/ public/ node_modules/ **/__snapshots__/ apps/docs/.docusaurus
	pnpm store prune

setup:
	npm install --global pnpm rimraf
	pnpm install

lint:
	nx workspace-lint
	nx run-many --all --target lint

test:
	nx run-many --all --target test

build:
	nx run-many --all --target build

# Run all in parallel
start:
	nx run docs:start

docs:
	nx run docs:build --parallel

depgraph:
	depcruise . --config .dependency-cruiser.js --output-type dot | dot -T svg > apps/docs/static/img/depgraph.svg



