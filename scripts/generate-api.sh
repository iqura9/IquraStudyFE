rm -rf /src/generated-api

SWAGGER_FILE=http://localhost:7080/swagger/v1/swagger.json
npx @openapitools/openapi-generator-cli generate -i $SWAGGER_FILE -g typescript-axios -o ./src/generated-api