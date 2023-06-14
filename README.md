<p>
    <br/>
    <br/>
    <p align="center">
    <a href="http://spectralops.io"> 
        <img alt="SpectralOps logo" src="./logo.svg" width="300"/>
    </a>
    </p>
    <p align="center">
        <img src="https://github.com/spectralops/spectral-github-action/actions/workflows/main.yml/badge.svg"/>
        <img src="https://img.shields.io/badge/license-MIT-brightgreen"/>
    </p>
    <h1>Spectral Scan</h1> 
</p>

# Install Spectral Scan action

Spectral Scan is a single self-contained binary, that's easy to get and use. This action installs the latest Spectral version into your PATH.

## Example usage

Include this Action as a step in your workflow:

```
uses: spectralops/spectral-github-action@v4
with:
  spectral-dsn: $SPECTRAL_DSN
  spectral-args: scan --ok
```

You can see an example of this Action [here](https://github.com/SpectralOps/spectral-github-action/tree/main/.github/workflows/main.yml)

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
        uses: spectralops/spectral-github-action@v4
        with:
          spectral-dsn: ${{ secrets.SPECTRAL_DSN }}
          spectral-args: scan --ok
```

Spectral provides another scan option to audit your Github/Gitlab organization, user or repo.

```yaml
name: Spectral

on: [push]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install and run Spectral Audit
        uses: spectralops/spectral-github-action@v4
        with:
          spectral-dsn: ${{ secrets.SPECTRAL_DSN }}
          spectral-args: github -k repo -t ${{ secrets.MY_GITHUB_TOKEN }} https://github.com/SpectralOps/spectral-github-action --include-tags base,audit --ok
```

### How to Contribute

We welcome [issues](https://github.com/SpectralOps/spectral-github-action/issues) to and [pull requests](https://github.com/SpectralOps/spectral-github-action/pulls) against this repository!

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for further details.
