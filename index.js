'use strict'

const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
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
      resolve: () => new Promise(resolve => {
        resolve({
          id: 1,
          title: 'title1',
          watched: true,
        })
      })
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
