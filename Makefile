#
# Makefile
# uralbash, 2017-03-17 17:26
#

build:
	npm run build

dev:
	npm run dev

frontend-ncu:
	npm i -g npm-check-updates
	ncu -u
	npm install
	ncu -a


# vim:ft=make
#
