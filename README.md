# AC Knowledge Base

## Running the Dev Environment

```sh
$ git clone ...
$ cd ackb
$ npm install
$ bower install
$ ./script/dev
# open http://localhost:3000
# or
$ PORT=8000 ./script/dev
```

## The Idea

ACKB Borned from the need of two things inside AvenueCode new community program: 

1. A need to supply information for the development community, inside and outside the company, about new technologies stacks and common issues learned in a day-to-day work.
2. Allow everyone to work in projects hosted by the company.

ACKB solves all this needs based on the following:

1. This project was designed on top of Google Drive. Given a MD (markdown formatted file) a specific header (described bellow), any dev can open it and keep track of its changes inside the platform. Still, anyone can share the file and its contents over any Google user.
2. The project does not keep sensitive information about the company itself. This allows us to open it as the first open source project in the company, allowing anyone to contribute to its development.

## The Archicture

ACKB, as said before, was make on top of Google Drive and is UI only, meaning that no backend code is needed. It uses new stack of frameworks used nowadays by  AvenueCode, like ReactJS, Webpack (browserify), ES6 code style and some others. 

All of this aspects would allow the project team to learn new technologies and new ways to developing, giving them the skills for new projects adpted by AvenueCode clients and the hability to choose between those frameworks when needed.

## ACKB Header

To be able to share any file inside ACKB platform, the writer of the documentation need to share some header information in the file as follows:

```
<!--
ACKB: 1.0
COMMON NAME: User or company name
SUBJECT: Small description of the file
MOTIVATION: Small/Big description for the doc creation
TAGS: Space separated tags
-->
<empty line>
```

This header would be used for meta-data information about the document and to allow files to be filtered and searchable in the platform.

## Philosophy for Dev Community

The main idea about sharing information is not the whole thing about ACKB. The main criteria for this is to allow developers to know each other during the process of finding information they need.

To share information between users, a developer need to specify a group or user, given by its Google email. This way, we can enforce people knowldge to carry people meeting, increasing the presence of AvenueCode in the development community from our developers. 

## Next Steps

1. Filter contents agains local storage contents.
1. Create a MD editor inside the platform to allow users to share information inside it, instead of using Google Drive to do this.
2. Question and Answer platform to increase the ability to reach more people in the cloud.
3. Ranking system to allow us to see who has more contributions to the knowledge base.
4. More comming... 