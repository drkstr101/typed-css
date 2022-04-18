.PHONY: setup clean lint test build start

SHELL := /bin/bash
PATH := ./node_modules/.bin:$(HOME)/bin:$(PATH)
MAKE := make

ci: setup
# $(MAKE) depgraph
	$(MAKE) lint
	$(MAKE) test
	$(MAKE) build

clean:
	rm -rf yarn.lock \
		coverage/ \
		dist/ \
		public/ \
		tmp/ \
		node_modules/ \
		**/__snapshots__/ \
		**/.cache/ \
		apps/docs/.docusaurus

	yarn cache clean
# bit clear-cache

setup:
	yarn install

lint:
	nx workspace-lint
	nx affected --target lint

test:
	nx affected --target test

build:
	nx affected --target=build

# Run all in parallel
start:
	nx run docs:start

docs:
	nx run docs:build --parallel

spectrum-css:
	nx workspace-generator spectrum-css --name=dev-spectrum-css

depgraph:
	depcruise . \
		--config .dependency-cruiser.js  \
		--output-type dot \
		--output-to apps/docs/static/img/depgraph.dot --prefix "https://github.com/drkstr101/watheia/blob/main/"
	cat apps/docs/static/img/depgraph.dot | dot -T svg > apps/docs/static/img/depgraph.svg.tmp
	mv apps/docs/static/img/depgraph.svg.tmp apps/docs/static/img/depgraph.svg



