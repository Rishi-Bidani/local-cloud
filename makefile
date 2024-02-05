clean:
	rm -rf dist

clean-server:
	rm -rf dist/server

# build: clean
# 	# Build server
# 	yarn --cwd ./server build
# 	cp ./server/package.json ./dist/server/package.json
# 	cp ./server/yarn.lock ./dist/server/yarn.lock
# 	cp ./server/settings.yaml ./dist/server/settings.yaml
# 	yarn --cwd ./dist/server install --production

# 	# Build client
# 	yarn --cwd ./client build


build: clean-server
	# Build server
	go build -o dist/server ./go-server
	
