[[ $# == 1 ]] && \
[[ $1 == "trybe-security-parameter" ]] && \
git filter-repo \
    --path .trybe \
    --path .github \
    --path .vscode \
    --path trybe.yml \
    --path trybe-filter-repo.sh \
    --path README.md \
    --path __tests__ \
    --path jest.config.js \
    --path data-testid.md \
    --path assets \
    --invert-paths --force