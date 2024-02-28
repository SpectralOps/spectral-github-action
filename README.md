# <img alt="Check Point" src="logo.svg" width="32" /> CloudGuard Code Security
Spectral is the shift-left solution of Check Point’s CloudGuard to provide the industry’s most comprehensive security platform from code to cloud. Spectral was built as a platform from the ground up to have a fantastic developer experience (DX). Spectral Scan is a single self-contained binary, that's easy to get and use.

## Example usage
Include this Action as a step in your workflow:

```
uses: checkpointsw/spectral-github-action@v4
with:
  spectral-dsn: $SPECTRAL_DSN
  spectral-args: scan --ok
```

[Review Action Usage Example](.github/workflows/main.yml)

## Configuration
You'll need to provide Spectral DSN as an input variable. You should always store your DSN in a secure way, like below in [GitHub secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

```yaml
name: Spectral

on: [push]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install and run Spectral CI
        uses: checkpointsw/spectral-github-action@v4
        with:
          spectral-dsn: ${{ secrets.SPECTRAL_DSN }}
          spectral-args: scan --ok
```

Spectral provides another scan option to audit your GitHub/GitLab organization, user or repo.

```yaml
name: Spectral

on: [push]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install and run Spectral Audit
        uses: checkpointsw/spectral-github-action@v4
        with:
          spectral-dsn: ${{ secrets.SPECTRAL_DSN }}
          spectral-args: github -k repo -t ${{ secrets.MY_GITHUB_TOKEN }} https://github.com/checkpointsw/spectral-github-action --include-tags base,audit --ok
```

### How to Contribute
We welcome [issues](https://github.com/checkpointsw/spectral-github-action/issues) to and [pull requests](https://github.com/checkpointsw/spectral-github-action/pulls) against this repository!

## Resources
- [Solution Review](https://www.checkpoint.com/cloudguard/developer-security/)
- [Documentation](https://guides.spectralops.io/docs)

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for further details.