DOCKER_HOST=ssh://isiksan@isiksan.cbu.edu.tr
CONTAINER_NAME=sta-backend-service
SOURCE_PORT=5000
TARGET_PORT=5000
IMAGE_NAME=$CONTAINER_NAME

docker -H $DOCKER_HOST stop $CONTAINER_NAME
docker -H $DOCKER_HOST rm $CONTAINER_NAME
docker -H $DOCKER_HOST build -t $IMAGE_NAME -f Dockerfile .
docker -H $DOCKER_HOST run --env-file=.env.prod -d --name=$CONTAINER_NAME --restart=always -p $SOURCE_PORT:$TARGET_PORT -t $IMAGE_NAME