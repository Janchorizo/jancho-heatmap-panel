mv ./dist ./_dist
mv ./node_modules ./_node_modules
echo '
{
    "plugins": [],
    "recurseDepth": 10,
    "source": {
        "includePattern": ".+\\.(t|j)s(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "sourceType": "module",
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
}

' > conf.json
jsdoc -c conf.json  --destination ./docs  -r .
rm conf.json
mv ./_dist ./dist
mv ./_node_modules ./node_modules
