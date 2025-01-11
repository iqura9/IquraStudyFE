rm -rf /src/generated-api

SWAGGER_FILE=http://localhost:5000/swagger/v1/swagger.json
npx @openapitools/openapi-generator-cli generate -i $SWAGGER_FILE -g typescript-axios -o ./src/generated-api