# Contributing

Thank you for contributing to Course Goals.

## Development Setup

1. Fork and clone the repository.
2. Install dependencies with `npm install`.
3. Create a focused branch from `main`.
4. Make the change and add relevant tests.
5. Run the required checks before opening a pull request.

```bash
npm run lint
npx tsc --noEmit
npm run test:coverage
npm run test:e2e
npm run build
```

## Pull Requests

- Keep changes focused and explain the motivation.
- Follow the existing TypeScript and CSS conventions.
- Add tests for new or changed behavior.
- Update README or changelog content when relevant.
- Use clear, imperative commit messages.
- Make sure CI is green before requesting review.

## Issues

Use the provided issue templates. Search existing issues before opening a new one. Security vulnerabilities must be reported privately according to [SECURITY.md](SECURITY.md).

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Releases

1. Update the package version, README, and changelog in a release pull request.
2. Merge the release pull request after all required checks pass.
3. Create and push the matching annotated `v*` tag from the merged `main` commit.
4. The npm publishing workflow uses OpenID Connect trusted publishing; no npm token is stored in GitHub.
5. Verify the GitHub Release, npm package, provenance statement, and GitHub Package after publishing.
