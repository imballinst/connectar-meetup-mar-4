e2e:
	@rm -rf frontend/build backend/build
	@cd frontend && yarn build
	@cp -R frontend/build backend/build
	@cd e2e && node test.js

.PHONY: e2e
