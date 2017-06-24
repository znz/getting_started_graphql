'use strict'

const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql')
const { getVideoById } = require('./data')

const PORT = process.env.PORT || 3000
const server = express()

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'video',
  fields: {
    id: {
      type: GraphQLID,
      description: 'id of video',
    },
    title: {
      type: GraphQLString,
      description: 'title of video'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'has watched'
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'root query',
  fields: {
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'id of video',
        },
      },
      resolve: (_, args) => getVideoById(args.id)
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType,
})

const resolvers = {
  video: () => ({
    id: 1,
    title: 'bar',
    watched: true,
  }),
  videos: () => videos,
}

const query = `
query myQuery {
  videos {
    id,
    title,
    watched,
  }
}
`

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue: resolvers,
}))

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
