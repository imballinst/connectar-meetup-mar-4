e2e:
	@cd frontend && yarn build
	@cp frontend/build backend
	@cd e2e && node test.js

.PHONY: e2e
