
all: build test site

build:
	./node_modules/jison/lib/cli.js src/jsonlint.y src/jsonlint.l
	mv jsonlint.js lib/jsonlint-loc.js
	node scripts/bundle.js > web/jsonlint-loc.js
	node scripts/bundle.js | ./node_modules/uglify-js/bin/uglifyjs > web/jsonlint-loc.min.js

site:
	cp web/jsonlint-loc.min.js ../jsonlint-pages/jsonlint-loc.js

deploy: site
	cd ../jsonlint-pages && git commit -a -m 'deploy site updates' && git push origin gh-pages

test: lib/jsonlint-loc.js test/all-tests.js
	node test/all-tests.js

