# base image
FROM node:latest
LABEL AUTHOR="Arnold Katumba <arnold.katumba@andela.com>"

# set working directory
WORKDIR /barefoot-nomad-backend

# add app
COPY . /barefoot-nomad-backend

# install and cache app dependencies
RUN npm i

EXPOSE 3000
CMD ["npm", "start"]
